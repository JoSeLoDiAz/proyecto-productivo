import {validarCampos} from "../valichecks/validar-campos.js"
import {check} from "express-validator"
import { Router } from "express"
import {isAdmin} from "../helpers/validar-usuario.js"

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
    validarCampos
],postRol)

router.get('/', getRol);

router.get('/:codigo',getRolCodigo);

router.get('/id/:id',getRolId);

router.put('/:id',[
    check("denominacion","Complete el campo Denominación").trim().not().isEmpty().toLowerCase(),
    validarCampos
], putRol);

router.patch('/:id',patchRol)

router.delete('/:id', deleteRol);

export default router;