import { validateFields } from "../valichecks/validate-fields.js";
import { check } from "express-validator";
import { Router } from "express";

const router = Router();

import {
  postAmbiente,
  getAmbiente,
  getAmbienteNombre,
  putAmbiente,
  patchAmbiente,
  deleteAmbiente,
} from "../controllers/ambiente.js";

router.post(
  "/",
  [
    check("nombre", "Complete el campo Nombre")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("capacidad", "complete el campo Capacidad")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("tipo_ambiente", "Complete el campo Tipo de ambiente")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("equipamiento", "Complete el campo Equipamiento")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("sede", "Sede Invalida").trim().isMongoId(),
    validateFields,
  ],
  postAmbiente
);

router.get("/", getAmbiente);

router.get("/:nombre", getAmbienteNombre);

router.put(
  "/:id",
  [
    check("nombre", "Complete el campo Nombre")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("capacidad", "complete el campo Capacidad")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("tipo_ambiente", "Complete el campo Tipo de ambiente")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("equipamiento", "Complete el campo Equipamiento")
      .trim()
      .not()
      .isEmpty(),
    check("sede", "Sede Invalida").trim().isMongoId(),
    validateFields,
  ],
  putAmbiente
);

router.patch("/:id", patchAmbiente);

router.delete("/:id", deleteAmbiente);

export default router;
