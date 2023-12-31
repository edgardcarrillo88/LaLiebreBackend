const usersmodel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  console.log("ejecutando registro de usuarios");

  try {
    const passwordhash = await bcrypt.hash(req.body.contrasena, 10);
    req.body.contrasena = passwordhash;
    const userregister = new usersmodel(req.body);
    const UserSaved = await userregister.save();

    jwt.sign(
      { id: UserSaved._id },
      process.env.SECRET_TOKEN,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) console.log(err);
        res.cookie("token", token);
        res.json({ message: "usuario creado" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // res.status(200).json(UserSaved)
};

const verify = async (req, res) => {
  console.log("Ejecutando verificación de usuario");
  console.log(req.body);
  const datausers = await usersmodel.findOne({ correo: req.body.params.email });

  try {
    if (!datausers) {
      console.log("El usuario no existe");
      return res.json({ message: "Usuario no encontrado" });
    }

    if (datausers.verificado === false)
      return res.status(400).json({ message: "Usuario no validado" });

    const isMatch = await bcrypt.compare(
      req.body.params.password,
      datausers.contrasena
    );

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credential" });

    jwt.sign(
      { id: datausers._id },
      process.env.SECRET_TOKEN,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) console.log(err);
        res.cookie("token", token);
        console.log("Usuario verificado");
        res.status(200).json({
          message: "usuario verificado",
          data: "sigue mierda",
          token: token,
          user: datausers,
        });
      }
    );
  } catch (error) {
    console.error("no se que mierda paso", error);
  }
};

const profile = async (req, res) => {
  console.log("ejecutando request profile");
  //console.log(req.user);
  const userFound = await usersmodel.findById(req.user.id);
  console.log(userFound);
  if (!userFound) res.status(400).json({ message: "user not found" });

  const { contrasena, ...user } = userFound._doc;
  return res.json(user);
};

module.exports = { create, verify, profile };
