import {validarCampos} from "../valichecks/validar-campos.js"
import {check} from "express-validator"
import { Router } from "express"
import {isAdmin} from "../helpers/validar-usuario.js"

const router= Router()


import {
postCiudad,
getCiudad,
getCiudadCodigo,
putCiudad,
patchCiudad,
deleteCiudad
} from '../controllers/ciudades.js';

router.post("/",[
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("daneciudad","Complete el campo Codino DANE Ciudad con minimo 5 digitos").trim().not().isEmpty().isLength({min:5,max:8}),
    check("region","Complete el campo Region").trim().not().isEmpty().toLowerCase(),
    check("departamento","Complete el campo Departamento").trim().not().isEmpty().toLowerCase(),
    check("danedepartamento","Complete el campo Codigo DANE Departamento con minimo 5 digitos").trim().not().isEmpty().isLength({min:5,max:8}),
    validarCampos
],postCiudad)

router.get('/', getCiudad);

router.get('/:codigo',getCiudadCodigo);

router.put('/:id',[
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("daneciudad","Complete el campo Codino DANE Ciudad con minimo 5 digitos").trim().not().isEmpty().isLength({min:5,max:8}),
    check("region","Complete el campo Region").trim().not().isEmpty().toLowerCase(),
    check("departamento","Complete el campo Departamento").trim().not().isEmpty().toLowerCase(),
    check("danedepartamento","Complete el campo Codigo DANE Departamento con minimo 5 digitos").trim().not().isEmpty().isLength({min:5,max:8}),
    validarCampos
], putCiudad);

router.patch('/:id',patchCiudad)

router.delete('/:id', deleteCiudad);

export default router;