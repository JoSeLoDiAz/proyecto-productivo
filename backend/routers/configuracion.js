import { validateFields } from "../valichecks/validate-fields.js";
import {check} from "express-validator"
import { Router } from "express"
import { isAdmin } from "../helpers/validate-user.js";

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