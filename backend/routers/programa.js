import {validarCampos} from "../valichecks/validar-campos.js"
import {check} from "express-validator"
import { Router } from "express"

const router= Router()


import {
postPrograma,
postProgramaDesarrollo,
postProgramaUsuario,
postProgramaMaterialFormacion,
postProgramaAmbiente,
postRegistroCalificado,
getPrograma,
getProgramas,
getProgramaCodigo,
getProgramaId,
putPrograma,
putProgramaDiseno,
patchPrograma,
deletePrograma
} from '../controllers/programa.js';

router.post("/",[
    check("codigo","Codigo requerido").trim().not().isEmpty(),
    check("codigo","El codigo excede los caracteres permitidos").trim().isLength({min:2,max:5}),
    check("nombre","Complete el campo Nombre").trim().not().isEmpty(),
    check("modalidad","Complete el campo Modalidad").trim().not().isEmpty(),
    check("requisitos","Complete el campo Requisitos").trim().not().isEmpty(),
    check("version","Complete el campo Versión").trim().not().isEmpty().isLength({min:1,max:4}),
    check("nivel","Nivel invalido").trim().isMongoId(),
    check("red","Red invalida").trim().isMongoId(),
    validarCampos
],postPrograma)

router.post("/agregar/desarrollo/:id",postProgramaDesarrollo)

router.post("/agregar/usuario/:id",postProgramaUsuario);

router.post("/agregar/material/formacion/:id",postProgramaMaterialFormacion);

router.post("/agregar/ambiente/:id",postProgramaAmbiente);

router.post("/registro/calificado/:id",[
    check("titulo","Complete el campo Titulo que Otorga").trim().not().isEmpty(),
    check("lugar","Complete el campo Lugar De Desarrollo De La Oferta").trim().not().isEmpty(),
    check("metodologia","Complete el campo Metodologia").trim().not().isEmpty(),
    check("creditos","Complete el campo Número de Creditos").trim().not().isEmpty(),
    check("snies", "Complete el campo Codigo SNIES").trim().not().isEmpty(),
    check("snies","El codigo SNIES debe estar entre 6 y 8 caracteres").trim().isLength({min:6,max:8}),
    validarCampos
],postRegistroCalificado)

router.get('/', getPrograma);

router.get('/varios', getProgramas);

router.get('/:codigo',getProgramaCodigo);

router.get('/id/:id',getProgramaId);

router.put('/:id',[
    check("codigo","Codigo requerido").trim().not().isEmpty(),
    check("codigo","El codigo excede los caracteres permitidos").trim().isLength({min:2,max:5}),
    check("nombre","Complete el campo Nombre").trim().not().isEmpty(),
    check("modalidad","Complete el campo Modalidad").trim().not().isEmpty(),
    check("requisitos","Complete el campo Requisitos").trim().not().isEmpty(),
    check("version","Complete el campo Versión").trim().not().isEmpty(),
    check("nivel","Nivel invalido").trim().isMongoId(),
    validarCampos
], putPrograma);

router.put('/diseno/:id',putProgramaDiseno)

router.patch('/:id',patchPrograma)

router.delete('/:id', deletePrograma);

export default router;