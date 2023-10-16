const mongoose = require("mongoose");

const usersquema = mongoose.Schema(
  {
    correo: { type: String },
    usuario: { type: String },
    contrasena: { type: String },
    empresa: { type: String },
    celular: { type: String },
    deleted: { type: Boolean, default: false },
    verificado: { type: Boolean, default: false },
    rol: { type: String, default: "user" }, // user, admin,
  },
  {
    timestamps: true,
  }
);
//MODELO
const users = mongoose.model("user", usersquema, "users");
module.exports = users;
