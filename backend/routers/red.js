import { validateFields } from "../valichecks/validate-fields.js";
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
    check("nombre","Ingrese el campo Nombre").trim().not().isEmpty().toLowerCase(),
    validateFields
],postRed)

router.post("/agregar/programa/:id",[
    check("nombre","Ingrese el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("modalidad","Ingrese el campo Modalidad").trim().not().isEmpty().toLowerCase(),
    check("requisitos","Ingrese el campo Requisitos").trim().not().isEmpty().toLowerCase(),
    check("version","Ingrese el campo Versión").trim().not().isEmpty().toLowerCase(),
    check("version","La versión excede los caracteres permitidos").trim().isLength({min:1,max:4}).toLowerCase(),
    check("nivel","Nivel invalido").trim().isMongoId(),
    validateFields
],postRedPrograma)

router.get('/', getRed);

router.get('/:codigo',getRedCodigo);

router.get('/id/:id',getRedId);

router.put('/:id',[
    check("nombre","Ingrese el campo Nombre").trim().not().isEmpty().toLowerCase(),
    validateFields
], putRed);

router.patch('/:id',patchRed)

router.delete('/:id', deleteRed);

export default router;