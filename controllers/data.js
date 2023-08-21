const settingmodel = require('../models/options')
const productsmodel = require('../models/data')


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

const productid = async (req,res) =>{
    console.log("ejecutando backend ruta dinamica");
    const { id } = req.query
    const data = await productsmodel.find({ _id:id })
    res.status(200).json(data[0])
}




const singleregister = async (req,res) =>{
    console.log(req.body);
    const data = new productsmodel(req.body)
    await data.save()
    res.status(200).json({message: "producto registrado"})
}

const getalldata = async(req,res) =>{
    console.log("ejecutando request getalldata");
    const data = await productsmodel.find({})
    res.status(200).json({ data })
}

module.exports = { loadoptions, productid, singleregister, getalldata}