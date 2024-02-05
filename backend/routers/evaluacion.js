import {validarCampos} from "../valichecks/validar-campos.js"
import {check} from "express-validator"
import { Router } from "express"

const router= Router()


import {
Archivo,
postEvaluacion,
mostrarArchivo,
getEvaluacion,
getEvaluacionCodigo,
getEvaluacionId,
putEvaluacion,
patchEvaluacion,
deleteEvaluacion
} from '../controllers/evaluacion.js';

router.post('/archivo/:id',[
    check("id", "ID invalido").isMongoId(),
    check("archivo","Archivo vacio").trim().not().isEmpty(),
    validarCampos
],Archivo)

router.post("/",[
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    validarCampos
],postEvaluacion)

router.get("/mostrar/:id",[
    check('id', 'No es un ID válido').isMongoId(), 
    validarCampos   
],mostrarArchivo)

router.get('/', getEvaluacion);

router.get('/:codigo',getEvaluacionCodigo);

router.get('/id/:id',getEvaluacionId);

router.put('/:id',[
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    validarCampos
], putEvaluacion);

router.patch('/:id',patchEvaluacion)

router.delete('/:id', deleteEvaluacion);

export default router;