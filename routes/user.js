const { Router } = require("express");
const { check } = require("express-validator");
const {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch,
} = require("../controllers/user");
const { esRolValido, existeEmail, existeUserById } = require("../helpers/db-validator");
const { validarCampos, validarJWT, esAdminRol, tieneRol } = require('../middlewares');
const router = Router();

router.get('/', userGet);

router.put(
  '/:id', 
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUserById ),
    check('rol').custom( esRolValido ),
    validarCampos
  ], 
  userPut
);

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({
      min: 6,
    }),
    check('email').custom( existeEmail ),
    check('rol').custom( esRolValido ),
    validarCampos
  ],
  userPost
);

router.delete(
  '/:id',
  [
    validarJWT,
    // esAdminRol,
    tieneRol('ADMIN_ROL', 'USER_ROL', 'VENTAS_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUserById ),
    validarCampos
  ], 
  userDelete
);

router.patch('/', userPatch);

module.exports = router;
