import { validateFields } from "../valichecks/validate-fields.js";
import {check} from "express-validator"
import { Router } from "express"

const router= Router()


import {
Archivo,
postProyecto,
mostrarArchivo,
getProyecto,
getProyectoCodigo,
putProyecto,
patchProyecto,
deleteProyecto
} from '../controllers/proyecto.js';

router.post('/archivo/:id',[
    check("id", "ID invalido").isMongoId(),
    check("archivo","Archivo vacio").trim().not().isEmpty(),
    validateFields
],Archivo)

router.post("/",[
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("descripcion","Complete el campo Descripcion").trim().not().isEmpty().toLowerCase(),
    check("fecha","Complete el campo Fecha").trim().not().isEmpty().toLowerCase(),
    check("version","Complete el campo Versión").trim().not().isEmpty().toLowerCase(),
    check("version","La versión excede los caracteres permitidos").trim().isLength({min:1,max:4}).toLowerCase(),
    check("programa","Programa Inavlido").trim().isMongoId(),validateFields
],postProyecto)

router.get("/mostrar/:id",[
    check('id', 'No es un ID válido').isMongoId(), 
    validateFields   
],mostrarArchivo)

router.get('/', getProyecto);

router.get('/:codigo/:programa',getProyectoCodigo);

router.put('/:id',[
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("descripcion","Complete el campo Descripcion").trim().not().isEmpty().toLowerCase(),
    check("fecha","Complete el campo Fecha").trim().not().isEmpty().toLowerCase(),
    check("version","Complete el campo Versión").trim().not().isEmpty().toLowerCase(),
    check("version","La versión excede los caracteres permitidos").trim().isLength({min:1,max:4}).toLowerCase(),
    check("programa","Programa Inavlido").trim().isMongoId(),
    validateFields
], putProyecto);

router.patch('/:id',patchProyecto)

router.delete('/:id', deleteProyecto);

export default router;