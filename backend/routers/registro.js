import {validarCampos} from "../valichecks/validar-campos.js"
import {check} from "express-validator"
import { Router } from "express"

const router= Router()


import {
postRegistro,
getRegistro,
getRegistroCodigo,
putRegistro,
patchRegistro,
deleteRegistro
} from '../controllers/registro.js';

router.post("/",[
    check("titulo_otorgado","Complete el campo Titulo otorgado").trim().not().isEmpty().toLowerCase(),
    check("lugar","Complete el campo Lugar").trim().not().isEmpty().toLowerCase(),
    check("metodologia","Complete el campo Metodologia").trim().not().isEmpty().toLowerCase(),
    check("snies","Complete el campo SNIES").trim().not().isEmpty().toLowerCase(),
    check("snies","El codigo SNIES excede los caracteres permitidos").trim().isLength({min:10,max:15}).toLowerCase(),
    check("creditos","Complete el campo creditos").trim().not().isEmpty().toLowerCase(),
    check("creditos","Los credistos exceden los caracteres permitidos").trim().isLength({min:2,max:3}).toLowerCase(),
    check("fecha","Complete el campo fecha").trim().not().isEmpty().toLowerCase(),
    validarCampos
],postRegistro)

router.get('/', getRegistro);

router.get('/:codigo',getRegistroCodigo);

router.put('/:id',[
    check("titulo_otorgado","Complete el campo Titulo otorgado").trim().not().isEmpty().toLowerCase(),
    check("lugar","Complete el campo Lugar").trim().not().isEmpty().toLowerCase(),
    check("metodologia","Complete el campo Metodologia").trim().not().isEmpty().toLowerCase(),
    check("snies","Complete el campo SNIES").trim().not().isEmpty().toLowerCase(),
    check("snies","El codigo SNIES excede los caracteres permitidos").trim().isLength({min:10,max:15}).toLowerCase(),
    check("creditos","Complete el campo creditos").trim().not().isEmpty().toLowerCase(),
    check("creditos","Los credistos exceden los caracteres permitidos").trim().isLength({min:2,max:3}).toLowerCase(),
    check("fecha","Complete el campo fecha").trim().not().isEmpty().toLowerCase(),
    validarCampos
], putRegistro);

router.patch('/:id',patchRegistro)

router.delete('/:id', deleteRegistro);

export default router;