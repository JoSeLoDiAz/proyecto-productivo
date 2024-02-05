import {validarCampos} from "../valichecks/validar-campos.js"
import {check} from "express-validator"
import { Router } from "express"
import {isAdmin} from "../helpers/validar-usuario.js"

const router= Router()


import {
postSedes,
getSedes,
getSedesCodigo,
putSedes,
patchSedes,
deleteSedes
} from '../controllers/sedes.js';

router.post("/",[
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("direccion","Complete el campo Dirección").trim().not().isEmpty().toLowerCase(),
    check("contacto","Complete el campo Contacto").trim().not().isEmpty().toLowerCase(),
    check("contacto","El contacto excede los caracteres permitidos").trim().isLength({min:10,max:12}).toLowerCase(),
    check("centro","Centro Invalido").trim().isMongoId(),
    validarCampos
],postSedes)

router.get('/', getSedes);

router.get('/:codigo', getSedesCodigo);

router.put('/:id',[
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("direccion","Complete el campo Dirección").trim().not().isEmpty().toLowerCase(),
    check("contacto","Complete el campo Contacto").trim().not().isEmpty().toLowerCase(),
    check("contacto","El contacto excede los caracteres permitidos").trim().isLength({min:10,max:12}).toLowerCase(),
    check("centro","Centro Invalido").trim().isMongoId(),
    validarCampos
], putSedes);

router.patch('/:id',patchSedes)

router.delete('/:id', deleteSedes);

export default router;