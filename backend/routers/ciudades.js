// import { validateFields } from "../valichecks/validate-fields.js";
// import {check} from "express-validator"
// import { Router } from "express"
// import { isAdmin } from "../helpers/validate-user.js";

// const router= Router()


// import {
// postCiudad,
// getCiudad,
// getCiudadCodigo,
// putCiudad,
// patchCiudad,
// deleteCiudad
// } from '../controllers/ciudades.js';

// router.post("/",[
//     check("nombre","Ingrese el campo Nombre").trim().not().isEmpty().toLowerCase(),
//     check("daneciudad","Ingrese el campo Codino DANE Ciudad con minimo 5 digitos").trim().not().isEmpty().isLength({min:5,max:8}),
//     check("region","Ingrese el campo Region").trim().not().isEmpty().toLowerCase(),
//     check("departamento","Ingrese el campo Departamento").trim().not().isEmpty().toLowerCase(),
//     check("danedepartamento","Ingrese el campo Codigo DANE Departamento con minimo 5 digitos").trim().not().isEmpty().isLength({min:5,max:8}),
//     validateFields
// ],postCiudad)

// router.get('/', getCiudad);

// router.get('/:codigo',getCiudadCodigo);

// router.put('/:id',[
//     check("nombre","Ingrese el campo Nombre").trim().not().isEmpty().toLowerCase(),
//     check("daneciudad","Ingrese el campo Codino DANE Ciudad con minimo 5 digitos").trim().not().isEmpty().isLength({min:5,max:8}),
//     check("region","Ingrese el campo Region").trim().not().isEmpty().toLowerCase(),
//     check("departamento","Ingrese el campo Departamento").trim().not().isEmpty().toLowerCase(),
//     check("danedepartamento","Ingrese el campo Codigo DANE Departamento con minimo 5 digitos").trim().not().isEmpty().isLength({min:5,max:8}),
//     validateFields
// ], putCiudad);

// router.patch('/:id',patchCiudad)

// router.delete('/:id', deleteCiudad);

// export default router;