import { validateFields } from "../valichecks/validate-fields.js";
import { check } from "express-validator";
import { Router } from "express";

const router = Router();

import {
  postClassroom,
  getClassroom,
  getClassroomName,
  putClassroom,
  patchClassroom,
  deleteClassroom,
} from "../controllers/classroom.js";

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
  postClassroom
);

router.get("/", getClassroom);

router.get("/:nombre", getClassroomName);

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
  putClassroom
);

router.patch("/:id", patchClassroom);

router.delete("/:id", deleteClassroom);

export default router;
