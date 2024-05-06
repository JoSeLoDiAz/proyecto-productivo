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
    check("code","Ingrese el Codigo asignado a la Sede").trim().not().isEmpty().toLowerCase(),
    check("code","El codigo excede los caracteres permitidos").trim().isLength({min:2,max:20}).toLowerCase(),
    check("name","Ingrese el Nombre de la Sede").trim().not().isEmpty().toLowerCase(),
    check("address","Ingrese la dirección de la Sede").trim().not().isEmpty().toLowerCase(),
    check("city","La Ciudad Ingresada no es valida, Reintente").trim().not().isEmpty(),
    validateFields
],postCampus)

router.get('/', getCampus);

router.get('/:codigo',getCampusCode);

router.get('/id/:id',getCampusId);

router.put('/:id',[
    check("code","Ingrese el Codigo asignado a la Sede").trim().not().isEmpty().toLowerCase(),
    check("code","El codigo excede los caracteres permitidos").trim().isLength({min:2,max:20}).toLowerCase(),
    check("name"," de la Sede").trim().not().isEmpty().toLowerCase(),
    check("address","Ingrese la dirección de la Sede").trim().not().isEmpty().toLowerCase(),
    check("city","La Ciudad Ingresada no es valida, Reintente").trim().not().isEmpty(),
     validateFields
], putCampus);

router.patch('/:id',patchCampus)

router.delete('/:id', deleteCampus);

export default router;