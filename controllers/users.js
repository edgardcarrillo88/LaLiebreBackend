const usersmodel = require('../models/users')

const create = async (req,res) =>{

    console.log("ejecutando registro de usuarios");
    const userregister = new usersmodel(req.body);
    await userregister.save();
    res.status(200).json(userregister)
}



const verify = async (req,res) =>{
    console.log("Ejecutando verificación de usuario");
    console.log(req.query);
    const datausers = await usersmodel.findOne({correo: req.query.email})
    console.log(datausers);

    try {
        if(!datausers){
            console.log("El usuario no existe");
            return res.json({ message: "Usuario no encontrado" })
        }
        if(datausers.correo===req.query.email && datausers.contrasena===req.query.password){
            console.log("Usuario verificado");
            res.status(200).json({message:"usuario verificado",data:"sigue mierda"})
        }
    } catch (error) {
        console.error("no se que mierda paso",error);
    }
}

module.exports = { create, verify }