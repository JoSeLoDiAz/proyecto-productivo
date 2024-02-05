import {validarCampos} from "../valichecks/validar-campos.js"
import {check} from "express-validator"
import { Router } from "express"

const router= Router()


import {
postRed,
postRedPrograma,
getRed,
getRedCodigo,
getRedId,
putRed,
patchRed,
deleteRed
} from '../controllers/red.js';

router.post("/",[
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    validarCampos
],postRed)

router.post("/agregar/programa/:id",[
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("modalidad","Complete el campo Modalidad").trim().not().isEmpty().toLowerCase(),
    check("requisitos","Complete el campo Requisitos").trim().not().isEmpty().toLowerCase(),
    check("version","Complete el campo Versión").trim().not().isEmpty().toLowerCase(),
    check("version","La versión excede los caracteres permitidos").trim().isLength({min:1,max:4}).toLowerCase(),
    check("nivel","Nivel invalido").trim().isMongoId(),
    validarCampos
],postRedPrograma)

router.get('/', getRed);

router.get('/:codigo',getRedCodigo);

router.get('/id/:id',getRedId);

router.put('/:id',[
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    validarCampos
], putRed);

router.patch('/:id',patchRed)

router.delete('/:id', deleteRed);

export default router;