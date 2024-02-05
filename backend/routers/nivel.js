import {validarCampos} from "../valichecks/validar-campos.js"
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
    check("denominacion","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("descripcion","Complete el campo Descripción").trim().not().isEmpty().toLowerCase(),
    validarCampos
],postNivel)

router.get('/', getNivel);

router.get('/:codigo', getNivelCodigo);

router.put('/:id',[
    check("denominacion","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("descripcion","Complete el campo Descripción").trim().not().isEmpty().toLowerCase(),
    validarCampos
], putNivel);

router.patch('/:id',patchNivel)

router.delete('/:id', deleteNivel);

export default router;