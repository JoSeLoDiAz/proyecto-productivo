import { validateFields } from "../valichecks/validate-fields.js";
import {check} from "express-validator"
import { Router } from "express"

const router= Router()


import {
Archivo,
postRetroalimentacion,
mostrarArchivo,
getRetroalimentacion,
getRetroalimentacionCodigo,
putRetroalimentacion,
patchRetroalimentacion,
deleteRetroalimentacion
} from '../controllers/retroalimentacion.js';

router.post('/archivo/:id',[
    check("id", "ID invalido").isMongoId(),
    validateFields
],Archivo)

router.post('/archivo/:id',[
    check("id", "ID invalido").isMongoId(),
    Archivo,
    validateFields
])

router.post("/",[
    check("nombre","Ingrese el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("codigo_ficha","Ingrese el campo Codigo ficha").trim().not().isEmpty().toLowerCase(),
    check("codigo_ficha","El codigo de la ficha debe tener entre 4 y 12 caracteres").trim().isLength({min:4,max:12}).toLowerCase(),
    check("descripcion","Ingrese el campo Descripción").trim().not().isEmpty().toLowerCase(),
    check("fecha","Ingrese el campo Fecha").trim().not().isEmpty().toLowerCase(),
    check("programa","Programa Invalido").trim().isMongoId(),
    validateFields
],postRetroalimentacion)

router.get("/mostrar/:id",[
    check('id', 'No es un ID válido').isMongoId(), 
    validateFields   
],mostrarArchivo)

router.get('/', getRetroalimentacion);

router.get('/:codigo',getRetroalimentacionCodigo);

router.put('/:id',[
    check("nombre","Ingrese el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("codigo_ficha","Ingrese el campo Codigo ficha").trim().not().isEmpty().toLowerCase(),
    check("codigo_ficha","El codigo de la ficha debe tener entre 4 y 12 caracteres").trim().isLength({min:4,max:12}).toLowerCase(),
    check("descripcion","Ingrese el campo Descripción").trim().not().isEmpty().toLowerCase(),
    check("fecha","Ingrese el campo Fecha").trim().not().isEmpty().toLowerCase(),
    check("programa","Programa Invalido").trim().isMongoId(),
    validateFields
], putRetroalimentacion);

router.patch('/:id',patchRetroalimentacion)

router.delete('/:id', deleteRetroalimentacion);

export default router;