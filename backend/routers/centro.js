import { validateFields } from "../valichecks/validate-fields.js";
import {check} from "express-validator";
import { Router } from "express";
import { isAdmin } from "../helpers/validate-user.js";

const router= Router()

import {
postCentro,
getCentro,
getCentroCodigo,
getCentroId,
putCentro,
patchCentro,
deleteCentro
} from '../controllers/centro.js';

router.post("/",[
    check("codigo","Complete el campo Codigo").trim().not().isEmpty().toLowerCase(),
    check("codigo","El codigo excede los caracteres permitidos").trim().isLength({min:2,max:5}).toLowerCase(),
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("direccion","Complete el campo dirección").trim().not().isEmpty().toLowerCase(),
    check("ciudad","Ciudad Invalida").trim().isMongoId(),
    validateFields
],postCentro)

router.get('/', getCentro);

router.get('/:codigo',getCentroCodigo);

router.get('/id/:id',getCentroId);

router.put('/:id',[
    check("codigo","Complete el campo Codigo").trim().not().isEmpty().toLowerCase(),
    check("codigo","El codigo excede los caracteres permitidos").trim().isLength({min:2,max:5}).toLowerCase(),
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("direccion","Complete el campo Dirección").trim().not().isEmpty().toLowerCase(),
    check("ciudad","Ciudad Invalida").trim().isMongoId(),
     validateFields
], putCentro);

router.patch('/:id',patchCentro)

router.delete('/:id', deleteCentro);

export default router;