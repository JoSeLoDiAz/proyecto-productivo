import {validarCampos} from "../valichecks/validar-campos.js"
import {check} from "express-validator"
import { Router } from "express"
import {isAdmin} from "../helpers/validar-usuario.js"

const router= Router()

import {
Archivo,
mostrarArchivo,
archivoNube,
mostrarArchivoNube,
hoja_vidaPerfil,
postUsuario,
postUsuarioRed,
postUsuarioToken,
getUsuario,
getUsuarioCodigo,
getUsuarioId,
putUsuario,
patchUsuario,
recuperaPassword,
newPassword,
deleteUsuario
} from '../controllers/usuario.js';
// 

router.post('/archivo/:id',[
    check("id", "ID invalido").isMongoId(),
    check("archivo","Archivo vacio").trim().not().isEmpty(),
    validarCampos
],Archivo)

router.post('/archivoNube/:id',[
    check("id", "ID invalido").isMongoId(),
    validarCampos
],archivoNube);

router.get("/foto/:id",[
    check('id', 'No es un ID válido').isMongoId(), 
    validarCampos   
],mostrarArchivoNube)

router.post("/",[
    check("nombre","complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("apellidos","Complete el campo Apellidos").trim().not().isEmpty().toLowerCase(),
    check("identificacion","Complete el campo Identificación").trim().not().isEmpty().toLowerCase(),
    check("identificacion","El numero de identificación debe tener minimo 8 digitos maximos 15").trim().isLength({min:8,max:15}).toLowerCase(),
    check("fecha_nacimiento","Complete la Fecha de Nacimiento").trim().not().isEmpty().toLowerCase(),
    check("genero","Complete el Genero").trim().not().isEmpty().toLowerCase(),
    check("direccion","Complete la Dirección").trim().not().isEmpty().toLowerCase(),
    check("telefono","Complete el campo Telefono").trim().not().isEmpty().toLowerCase(),
    check("telefono","El telefono debe tener minimo 8 digitos maximo 12").trim().isLength({min:8,max:12}).toLowerCase(),
    check("email","Complete el Campo Email").trim().not().isEmpty().isEmail(),
    check("password", "Complete el campo Contraseña").trim().not().isEmpty(),
    check("ocupacion","Complete el campo Ocupación").trim().not().isEmpty().toLowerCase(),
    check("estado_civil","Complete el campo Estado Civil").trim().not().isEmpty().toLowerCase(),
    check("nacionalidad","Complete el campo Nacinalidad").trim().not().isEmpty(),
    check("contacto_emergencia","Complete el campo Contacto de Emergencia").trim().not().isEmpty().toLowerCase(),
    check("rol","Rol invalido").trim().isMongoId(),
    validarCampos
],postUsuario)

router.post("/agregarRed/:id",[
    check("id", "ID invalido").isMongoId(),
    check("red","Red invalida").trim().isMongoId(),
    validarCampos
],postUsuarioRed)

router.post("/token",[
    check("identificacion","Falta el Usuario").trim().not().isEmpty(),
    check("password", "Falta la contraseña").trim().not().isEmpty(),
    validarCampos
],postUsuarioToken)

router.get("/mostrar/:id",[
    check('id', 'No es un ID válido').isMongoId(), 
    validarCampos   
],mostrarArchivo)

router.get("/hojaVida/:id",[
    check('id', 'No es un ID válido').isMongoId(), 
    validarCampos   
],hoja_vidaPerfil)

router.get('/', getUsuario);

router.get('/:codigo',getUsuarioCodigo);

router.get('/id/:id',getUsuarioId);

router.put('/:id',[
    check("nombre","complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("apellidos","Complete el campo Apellidos").trim().not().isEmpty().toLowerCase(),
    check("identificacion","Complete el campo Identificación").trim().not().isEmpty().toLowerCase(),
    check("identificacion","El numero de identificación debe tener minimo 8 digitos maximos 15").trim().isLength({min:8,max:15}).toLowerCase(),
    check("fecha_nacimiento","Complete la Fecha de Nacimiento").trim().not().isEmpty().toLowerCase(),
    check("genero","Complete el Genero").trim().not().isEmpty().toLowerCase(),
    check("direccion","Complete la Dirección").trim().not().isEmpty().toLowerCase(),
    check("telefono","Complete el campo Telefono").trim().not().isEmpty().toLowerCase(),
    check("telefono","El telefono debe tener minimo 8 digitos maximo 12").trim().isLength({min:8,max:12}).toLowerCase(),
    check("email","Complete el Campo Email").trim().not().isEmpty().isEmail(),
    check("password", "Complete el campo Contraseña").trim().not().isEmpty(),
    check("ocupacion","Complete el campo Ocupación").trim().not().isEmpty().toLowerCase(),
    check("estado_civil","Complete el campo Estado Civil").trim().not().isEmpty().toLowerCase(),
    check("nacionalidad","Complete el campo Nacinalidad").trim().not().isEmpty(),
    check("contacto_emergencia","Complete el campo Contacto de Emergencia").trim().not().isEmpty().toLowerCase(),
    check("rol","Rol invalido").trim().isMongoId(),
    validarCampos
], putUsuario);

router.put('/forgot/password',[
    check("email","Debe ingresar el email").trim().not().isEmpty(),
    validarCampos
], recuperaPassword);

router.put('/new/password', newPassword);

router.patch('/:id',patchUsuario)

router.delete('/:id', deleteUsuario);

export default router;