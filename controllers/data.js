const settingmodel = require('../models/options')
const productsmodel = require('../models/data')
const deliverymodel = require('../models/delivery')
const xlsx = require('xlsx');


const loadoptions = async (req, res) => {
    console.log("cargando las opciones");
    const uniquecategorias = await settingmodel.distinct('categoria')
    const uniqueunidadmedida = await settingmodel.distinct('unidadmedida')
    const uniquetalla = await settingmodel.distinct('talla')
    const data = [];

    for (let i = 0; i < uniquecategorias.length; i++) {
        const uniqueValueObject = {
            categoria: uniquecategorias[i],
            unidadmedida: uniqueunidadmedida[i],
            talla: uniquetalla[i],
        };
        data.push(uniqueValueObject);
    }

    console.log(data);
    res.status(200).json({ data })
}

const productid = async (req, res) => {
    console.log("ejecutando backend ruta dinamica");
    const { id } = req.query
    const data = await productsmodel.find({ _id: id })
    res.status(200).json(data[0])
}




const singleregister = async (req, res) => {
    console.log("Ejecutando Singe register");
    console.log(req.body);
    const data = new productsmodel(req.body.data)
    data.validacion = "pendiente"
    data.correo = req.body.user.correo
    data.empresa = req.body.user.empresa
    console.log(data);
    await data.save()
    res.status(200).json({ message: "producto registrado" })
}

const getalldata = async (req, res) => {
    console.log(req.query.userData.empresa);
    console.log("ejecutando request getalldata");
    const data = await productsmodel.find({ validacion: 'Si', empresa: req.query.userData.empresa })
    res.status(200).json({ data })
}

const pending = async (req, res) => {
    console.log("datos pendientes");
    const data = await productsmodel.find({ validacion: 'pendiente' })
    res.status(200).json({ data })
}

const validation = async (req, res) => {
    console.log("validando registros de pedidos");
    const array = req.body

    for (let i = 0; i < array.length; i++) {
        const data = await productsmodel.findByIdAndUpdate(array[i]._id, {
            $set: {
                cantidad: array[i].cantidad,
                validacion: "Si"
            }
        })
    }
}

const registerdelivery = async (req, res) => {
    console.log("registrando solicitud de delivery");
    const data = [];

    for (let i = 0; i < req.body.addedItems.length; i++) {
        const ItemDelivery = {
            id: 1,
            DireccionOrigen: req.body.origen.Direccion,
            NoCasaOrigen: req.body.origen.NoCasa,
            NombreOrigen: req.body.origen.Nombre,
            CelularOrigen: req.body.origen.Celular,
            DistritoOrigen: req.body.origen.Distrito,
            ReferenciaOrigen: req.body.origen.Referencia,
            FechaOrigen: req.body.origen.Fecha,
            HoraOrigen: req.body.origen.Hora,

            descripcion: req.body.addedItems[i].Item,
            talla: req.body.addedItems[i].Size,
            cantidad: req.body.addedItems[i].Cantidad,
            precio: 1,
            programado: "No",

            correo: req.body.user.correo,
            empresa: req.body.user.empresa,

            DireccionDestino: req.body.destino.Direccion,
            NoCasaDestino: req.body.destino.NoCasa,
            NombreDestino: req.body.destino.Nombre,
            CelularDestino: req.body.destino.Celular,
            DistritoDestino: req.body.destino.Distrito,
            ReferenciaDestino: req.body.destino.Referencia,
            FechaDestino: req.body.destino.Fecha,
            HoraDestino: req.body.destino.Hora,

            Motorizado: "TBD"
        };
        data.push(ItemDelivery);
        const datadelivery = new deliverymodel(data[i])
        await datadelivery.save()

        const products = await productsmodel.findOneAndUpdate(
            { descripcion: data[i].descripcion, talla: data[i].talla, validacion: 'Si' },
            { $inc: { cantidad: -data[i].cantidad }, status: 'Asignación de motorizado' },
            { new: true }
        );

    }
}

const getdeliverydata = async (req, res) => {
    console.log("obteniendo lista de envios");
    console.log(req.query.userData.empresa);
    const data = await deliverymodel.find({ programado: 'No' })
    res.status(200).json({ data })
}

const setdelivery = async (req, res) => {
    console.log("ejecutando setdelivery");
    const array = req.body

    for (let i = 0; i < array.length; i++) {
        const data = await deliverymodel.findByIdAndUpdate(array[i]._id, {
            $set: {
                FechaDestino: array[i].FechaDestino,
                programado: "Si",
                Motorizado: array[i].Motorizado,
                statusEntrega: "Pendiente"
            }
        })


        const products = await productsmodel.findOneAndUpdate(
            { descripcion: array[i].descripcion, talla: array[i].talla, validacion: 'Si' },
            { status: 'Asignación de motorizado' },
            { new: true }
        );

    }
}

const uploadexcel = async (req, res) => {
    console.log("cargadon archvio");
    console.log(req.query.user);
    const filepath = req.file.path
    const workbook = xlsx.readFile(filepath)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const excelData = xlsx.utils.sheet_to_json(worksheet);

    const dataPromises = excelData.map(async (rowData) => {
        try {
            rowData.validacion = "pendiente";
            rowData.correo = req.query.user.correo
            rowData.empresa = req.query.user.empresa
            const data = new productsmodel(rowData);
            await data.save();

        } catch (error) {
            console.error('Error al guardar el dato:', error);
        }
    });
    Promise.all(dataPromises)
        .then(() => {
            console.log('Todos los datos guardados en la base de datos');
            res.status(200).json({ message: 'Datos guardados en la base de datos' });
        })
        .catch((error) => {
            console.error('Error al guardar los datos:', error);
            res.status(500).json({ error: 'Error al guardar los datos' });
        })


}

module.exports = { loadoptions, productid, singleregister, getalldata, pending, validation, registerdelivery, getdeliverydata, setdelivery, uploadexcel }