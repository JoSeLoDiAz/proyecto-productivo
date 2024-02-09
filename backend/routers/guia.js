import { validateFields } from "../valichecks/validate-fields.js";
import {check} from "express-validator"
import { Router } from "express"

const router= Router()


import {
Archivo,
// isAdmin,
postGuiaEvaluacion,
postGuiaMaterial,
mostrarArchivo,
getGuia,
getGuiaCodigo,
getGuiaId,
putGuia,
patchGuia,
deleteGuia
} from '../controllers/guia.js';

router.post('/archivo/:id',[
    check("id", "ID invalido").isMongoId(),
    check("archivo","Archivo vacio").trim().not().isEmpty(),
    validateFields
],Archivo)

// ,isAdmin
router.post('/agregar/evaluacion/:id',[
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    validateFields
],postGuiaEvaluacion)

router.post('/agregar/material/:id',[
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    validateFields
],postGuiaMaterial)

router.get("/mostrar/:id",[
    check('id', 'No es un ID válido').isMongoId(), 
    validateFields   
],mostrarArchivo)

router.get('/', getGuia);

router.get('/:codigo',getGuiaCodigo);

router.get('/id/:id',getGuiaId);

router.put('/:id',[
    check("codigo","Complete el campo Codigo").trim().not().isEmpty(),
    check("codigo","El codigo excede los caracteres permitidos").trim().isLength({min:2,max:5}),
    check("nombre","Complete el campo Nombre").trim().not().isEmpty(),
    validateFields
], putGuia);

router.patch('/:id',patchGuia)

router.delete('/:id', deleteGuia);

export default router;