import { validateFields } from "../valichecks/validate-fields.js";
import {check} from "express-validator"
import { Router } from "express"
import { isAdmin } from "../helpers/validate-user.js";

const router= Router()


import {
postRole,
getRole,
getRoleCodigo,
getRoleId,
putRole,
patchRole,
deleteRole
} from '../controllers/role.js';

router.post("/",[
    check("denomination","Complete el campo Denominación").trim().not().isEmpty().toLowerCase(),
    validateFields
],postRole)

router.get('/', getRole);

router.get('/:codigo',getRoleCodigo);

router.get('/id/:id',getRoleId);

router.put('/:id',[
    check("denomination","Complete el campo Denominación").trim().not().isEmpty().toLowerCase(),
    validateFields
], putRole);

router.patch('/:id',patchRole)

router.delete('/:id', deleteRole);

export default router;