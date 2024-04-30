import { validateFields } from "../valichecks/validate-fields.js";
import {check} from "express-validator";
import { Router } from "express";
import { isAdmin } from "../helpers/validate-user.js";

const router= Router()

import {
postCampus,
getCampus,
getCampusCode,
getCampusId,
putCampus,
patchCampus,
deleteCampus
} from '../controllers/campus.js';

router.post("/",[
    check("codigo","Complete el campo Codigo").trim().not().isEmpty().toLowerCase(),
    check("codigo","El codigo excede los caracteres permitidos").trim().isLength({min:2,max:5}).toLowerCase(),
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("direccion","Complete el campo dirección").trim().not().isEmpty().toLowerCase(),
    check("ciudad","Ciudad Invalida").trim().isMongoId(),
    validateFields
],postCampus)

router.get('/', getCampus);

router.get('/:codigo',getCampusCode);

router.get('/id/:id',getCampusId);

router.put('/:id',[
    check("codigo","Complete el campo Codigo").trim().not().isEmpty().toLowerCase(),
    check("codigo","El codigo excede los caracteres permitidos").trim().isLength({min:2,max:5}).toLowerCase(),
    check("nombre","Complete el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("direccion","Complete el campo Dirección").trim().not().isEmpty().toLowerCase(),
    check("ciudad","Ciudad Invalida").trim().isMongoId(),
     validateFields
], putCampus);

router.patch('/:id',patchCampus)

router.delete('/:id', deleteCampus);

export default router;