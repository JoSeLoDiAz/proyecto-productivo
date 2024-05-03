import { validateFields } from "../valichecks/validate-fields.js";
import {check} from "express-validator"
import { Router } from "express"

const router= Router()


import {
Archivo,
postMaterial,
mostrarArchivo,
getMaterial,
getMaterialCodigo,
getMaterialId,
putMaterial,
patchMaterial,
deleteMaterial
} from '../controllers/material.js';

router.post('/archivo/:id',[
    check("id", "ID invalido").isMongoId(),
    check("archivo","Archivo vacio").trim().not().isEmpty(),
    validateFields
],Archivo)

router.post("/",[
    check("nombre","Ingrese el campo Nombre").trim().not().isEmpty().toLowerCase(),
    validateFields
],postMaterial)

router.get("/mostrar/:id",[
    check('id', 'No es un ID válido').isMongoId(), 
    validateFields   
],mostrarArchivo)

router.get('/', getMaterial);

router.get('/:codigo',getMaterialCodigo);

router.get('/id/:id',getMaterialId);

router.put('/:id',[
    check("nombre","Ingrese el campo Nombre").trim().not().isEmpty().toLowerCase(),
    validateFields
], putMaterial);

router.patch('/:id',patchMaterial)

router.delete('/:id', deleteMaterial);

export default router;