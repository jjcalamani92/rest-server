const Rol = require("../models/rol");
const User = require("../models/user");

const esRolValido = async ( rol = "" ) => {
  const existeRol = await Rol.findOne({ rol });
  if ( !existeRol ) {
    throw new Error(`El rol ${rol} no ésta registrado en la BD`);
  }
};
const existeEmail = async ( email = "" ) => {
  const existeEmail = await User.findOne({ email });
  if ( existeEmail ) {
    throw new Error(`El correo: ${ email }, ya está registrado`);
  }
};
const existeUserById = async ( id ) => {
  const existeUser = await User.findById( id );
  if ( !existeUser ) {
    throw new Error(`El id: ${ id } no existe`);
  }
};

module.exports = {
  esRolValido,
  existeEmail,
  existeUserById,
};
