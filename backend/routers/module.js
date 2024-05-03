import { validateFields } from "../valichecks/validate-fields.js";
import { check } from "express-validator";
import { Router } from "express";
import { isAdmin } from "../helpers/validate-user.js";

const router = Router();

import {
  postModules,
  getModules,
  getModulesCode,
  putModules,
  patchModules,
  deleteModules,
} from "../controllers/module.js";

router.post(
  "/",
  [
    check("name", "Ingrese el campo Nombre")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("location", "Ingrese el campo Ubicacion")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("classrooms", "Ingrese el campo Numero de Aulas de Clase")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("campus", "Sede No valida, reintente por favor").trim().isMongoId(),
    validateFields,
  ],
  postModules
);

router.get("/", getModules);

router.get("/:codigo", getModulesCode);

router.put(
  "/:id",
  [
    check("name", "Ingrese el campo Nombre")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("location", "Ingrese el campo Dirección")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("classrooms", "Ingrese el campo Contacto")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("classrooms", "El contacto excede los caracteres permitidos")
      .trim()
      .isLength({ min: 10, max: 12 })
      .toLowerCase(),
    check("campus", "Sede No valida, reintente por favor").trim().isMongoId(),
    validateFields,
  ],
  putModules
);

router.patch("/:id", patchModules);

router.delete("/:id", deleteModules);

export default router;
