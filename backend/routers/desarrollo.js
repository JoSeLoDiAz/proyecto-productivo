import { validateFields } from "../valichecks/validate-fields.js";
import {check} from "express-validator"
import { Router } from "express"

const router= Router()


import {
postDesarrollo,
postDesarrolloMatriz,
postDesarrolloProyecto,
postDesarrolloPlaneacion,
postDesarrolloGuia,
mostrarArchivoMatriz,
mostrarArchivoProyecto,
mostrarArchivoPlaneacion,
getDesarrollo,
getDesarrolloCodigo,
getDesarrolloId,
putDesarrollo,
patchDesarrollo,
deleteDesarrollo
} from '../controllers/desarrollo.js';

router.post("/",[
    validateFields
],postDesarrollo)

router.post("/matriz/:id",postDesarrolloMatriz)

router.post("/proyecto/:id",postDesarrolloProyecto)

router.post("/planeacion/:id",postDesarrolloPlaneacion);

router.post("/agregar/guia/:id",[
    check("nombre","Ingrese el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("fase","Ingrese el campo Fase").trim().not().isEmpty().toLowerCase(),
    validateFields
],postDesarrolloGuia);

router.get("/archivo/matriz/:id",[
    check('id', 'No es un ID válido').isMongoId(), 
    validateFields   
],mostrarArchivoMatriz);

router.get("/archivo/proyecto/:id",[
    check('id', 'No es un ID válido').isMongoId(), 
    validateFields   
],mostrarArchivoProyecto);

router.get("/archivo/planeacion/:id",[
    check('id', 'No es un ID válido').isMongoId(), 
    validateFields   
],mostrarArchivoPlaneacion);

router.get('/', getDesarrollo);

router.get('/:codigo',getDesarrolloCodigo);

router.get('/id/:id',getDesarrolloId);

router.put('/:id',[
    check("nombre","Ingrese el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("fase","Ingrese el campo Fase").trim().not().isEmpty().toLowerCase(),
     validateFields
], putDesarrollo);

router.patch('/:id',patchDesarrollo)

router.delete('/:id', deleteDesarrollo);

export default router;