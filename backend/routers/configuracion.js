import {validarCampos} from "../valichecks/validar-campos.js"
import {check} from "express-validator"
import { Router } from "express"
import {isAdmin} from "../helpers/validar-usuario.js"

const router= Router()


import {
postConfiguracion,
getConfiguracion,
putConfiguracion
} from '../controllers/configuracion.js';

router.post("/",postConfiguracion)

router.get('/', getConfiguracion);

router.put('/:id', putConfiguracion);


export default router;