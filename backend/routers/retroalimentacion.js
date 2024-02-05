import {validarCampos} from "../valichecks/validar-campos.js"
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
    validarCampos
],Archivo)

router.post('/archivo/:id',[
    check("id", "ID invalido").isMongoId(),
    Archivo,
    validarCampos
])

router.post("/",[
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("codigo_ficha","Complete el campo Codigo ficha").trim().not().isEmpty().toLowerCase(),
    check("codigo_ficha","El codigo de la ficha debe tener entre 4 y 12 caracteres").trim().isLength({min:4,max:12}).toLowerCase(),
    check("descripcion","Complete el campo Descripción").trim().not().isEmpty().toLowerCase(),
    check("fecha","Complete el campo Fecha").trim().not().isEmpty().toLowerCase(),
    check("programa","Programa Invalido").trim().isMongoId(),
    validarCampos
],postRetroalimentacion)

router.get("/mostrar/:id",[
    check('id', 'No es un ID válido').isMongoId(), 
    validarCampos   
],mostrarArchivo)

router.get('/', getRetroalimentacion);

router.get('/:codigo',getRetroalimentacionCodigo);

router.put('/:id',[
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("codigo_ficha","Complete el campo Codigo ficha").trim().not().isEmpty().toLowerCase(),
    check("codigo_ficha","El codigo de la ficha debe tener entre 4 y 12 caracteres").trim().isLength({min:4,max:12}).toLowerCase(),
    check("descripcion","Complete el campo Descripción").trim().not().isEmpty().toLowerCase(),
    check("fecha","Complete el campo Fecha").trim().not().isEmpty().toLowerCase(),
    check("programa","Programa Invalido").trim().isMongoId(),
    validarCampos
], putRetroalimentacion);

router.patch('/:id',patchRetroalimentacion)

router.delete('/:id', deleteRetroalimentacion);

export default router;