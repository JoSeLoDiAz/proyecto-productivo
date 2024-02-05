import {validarCampos} from "../valichecks/validar-campos.js"
import {check} from "express-validator"
import { Router } from "express"

const router= Router()


import {
postInvestigacion,
getInvestigaciones,
getInvestigacionId,
putInvestigacion,
cambiarEstado,
deleteInvestigacion
} from '../controllers/investigacion.js';

router.post("/",[
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("descripcion","complete el campo Descripción").trim().not().isEmpty().toLowerCase(),
    check("fecha","Complete el campo Fecha").trim().not().isEmpty().toLowerCase(),
    check("programa","Programa Invalido").trim().isMongoId(),
    validarCampos
],postInvestigacion)

router.get('/', getInvestigaciones);

router.get('/:id',getInvestigacionId);

router.put('/:id',[
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("descripcion","complete el campo Descripción").trim().not().isEmpty().toLowerCase(),
    check("fecha","Complete el campo Fecha").trim().not().isEmpty().toLowerCase(),
    check("programa","Programa Invalido").trim().isMongoId(),
    validarCampos
], putInvestigacion);

router.put('/estado/:id',cambiarEstado)

router.delete('/:id', deleteInvestigacion);

export default router;