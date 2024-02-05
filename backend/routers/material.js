import {validarCampos} from "../valichecks/validar-campos.js"
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
    validarCampos
],Archivo)

router.post("/",[
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    validarCampos
],postMaterial)

router.get("/mostrar/:id",[
    check('id', 'No es un ID válido').isMongoId(), 
    validarCampos   
],mostrarArchivo)

router.get('/', getMaterial);

router.get('/:codigo',getMaterialCodigo);

router.get('/id/:id',getMaterialId);

router.put('/:id',[
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    validarCampos
], putMaterial);

router.patch('/:id',patchMaterial)

router.delete('/:id', deleteMaterial);

export default router;