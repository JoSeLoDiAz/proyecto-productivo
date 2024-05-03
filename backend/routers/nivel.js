import { validateFields } from "../valichecks/validate-fields.js";
import {check} from "express-validator"
import { Router } from "express"

const router= Router()


import {
postNivel,
getNivel,
getNivelCodigo,
putNivel,
patchNivel,
deleteNivel
} from '../controllers/nivel.js';

router.post("/",[
    check("denominacion","Ingrese el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("descripcion","Ingrese el campo Descripción").trim().not().isEmpty().toLowerCase(),
    validateFields
],postNivel)

router.get('/', getNivel);

router.get('/:codigo', getNivelCodigo);

router.put('/:id',[
    check("denominacion","Ingrese el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("descripcion","Ingrese el campo Descripción").trim().not().isEmpty().toLowerCase(),
    validateFields
], putNivel);

router.patch('/:id',patchNivel)

router.delete('/:id', deleteNivel);

export default router;