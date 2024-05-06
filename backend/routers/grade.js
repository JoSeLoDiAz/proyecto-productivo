import { validateFields } from "../valichecks/validate-fields.js";
import {check} from "express-validator"
import { Router } from "express"

const router= Router()


import {
postGrade,
getGrade,
getGradeCode,
putGrade,
patchGrade,
deleteGrade
} from '../controllers/grade.js';

router.post("/",[
    check("name","Ingrese el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("description","Ingrese el campo Descripción").trim().not().isEmpty().toLowerCase(),
    validateFields
],postGrade)

router.get('/', getGrade);

router.get('/:codigo', getGradeCode);

router.put('/:id',[
    check("name","Ingrese el campo Nombre").trim().not().isEmpty().toLowerCase(),
    check("description","Ingrese el campo Descripción").trim().not().isEmpty().toLowerCase(),
    validateFields
], putGrade);

router.patch('/:id',patchGrade)

router.delete('/:id', deleteGrade);

export default router;