import { validateFields } from "../valichecks/validate-fields.js";
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
    check("nombre","Ingrese el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("tipo","Ingrese el campo Tipo de Material").trim().not().isEmpty().toLowerCase(),
    check("descripcion","Ingrese el campo Descripcion").trim().not().isEmpty().toLowerCase(),
    validateFields
],postMaterialFormacion)

router.get('/', getMaterialFormacion);

router.get('/:codigo',getMaterialFormacionCodigo);

router.put('/:id',[
    check("nombre","Ingrese el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("tipo","Ingrese el campo Tipo de Material").trim().not().isEmpty().toLowerCase(),
    check("descripcion","Ingrese el campo Descripcion").trim().not().isEmpty().toLowerCase(),
    validateFields
], putMaterialFormacion);

router.patch('/:id',patchMaterialFormacion)

router.delete('/:id', deleteMaterialFormacion);

export default router;