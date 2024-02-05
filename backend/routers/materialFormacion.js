import {validarCampos} from "../valichecks/validar-campos.js"
import {check} from "express-validator"
import { Router } from "express"

const router= Router()


import {
postMaterialFormacion,
getMaterialFormacion,
getMaterialFormacionCodigo,
putMaterialFormacion,
patchMaterialFormacion,
deleteMaterialFormacion
} from '../controllers/materialFormacion.js';

router.post("/",[
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("tipo","Complete el campo Tipo de Material").trim().not().isEmpty().toLowerCase(),
    check("descripcion","Complete el campo Descripcion").trim().not().isEmpty().toLowerCase(),
    validarCampos
],postMaterialFormacion)

router.get('/', getMaterialFormacion);

router.get('/:codigo',getMaterialFormacionCodigo);

router.put('/:id',[
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("tipo","Complete el campo Tipo de Material").trim().not().isEmpty().toLowerCase(),
    check("descripcion","Complete el campo Descripcion").trim().not().isEmpty().toLowerCase(),
    validarCampos
], putMaterialFormacion);

router.patch('/:id',patchMaterialFormacion)

router.delete('/:id', deleteMaterialFormacion);

export default router;