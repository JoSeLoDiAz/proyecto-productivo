import { validateFields } from "../valichecks/validate-fields.js";
import {check} from "express-validator"
import { Router } from "express"
import { isAdmin } from "../helpers/validate-user.js";

const router= Router()


import {
postRol,
getRol,
getRolCodigo,
getRolId,
putRol,
patchRol,
deleteRol
} from '../controllers/rol.js';

router.post("/",[
    check("denominacion","Complete el campo Denominación").trim().not().isEmpty().toLowerCase(),
    validateFields
],postRol)

router.get('/', getRol);

router.get('/:codigo',getRolCodigo);

router.get('/id/:id',getRolId);

router.put('/:id',[
    check("denominacion","Complete el campo Denominación").trim().not().isEmpty().toLowerCase(),
    validateFields
], putRol);

router.patch('/:id',patchRol)

router.delete('/:id', deleteRol);

export default router;