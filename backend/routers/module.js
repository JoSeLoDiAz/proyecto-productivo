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
    check("nombre", "Complete el campo Nombre")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("direccion", "Complete el campo Dirección")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("contacto", "Complete el campo Contacto")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("contacto", "El contacto excede los caracteres permitidos")
      .trim()
      .isLength({ min: 10, max: 12 })
      .toLowerCase(),
    check("centro", "Centro Invalido").trim().isMongoId(),
    validateFields,
  ],
  postModules
);

router.get("/", getModules);

router.get("/:codigo", getModulesCode);

router.put(
  "/:id",
  [
    check("nombre", "Complete el campo Nombre")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("direccion", "Complete el campo Dirección")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("contacto", "Complete el campo Contacto")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("contacto", "El contacto excede los caracteres permitidos")
      .trim()
      .isLength({ min: 10, max: 12 })
      .toLowerCase(),
    check("centro", "Centro Invalido").trim().isMongoId(),
    validateFields,
  ],
  putModules
);

router.patch("/:id", patchModules);

router.delete("/:id", deleteModules);

export default router;
