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
    check("name", "Ingrese el Nombre del Aula")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("capacity", "Ingrese la Capacidad del Aula")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("room_type", "Ingrese el Tipo de Aula (Informatica, Sociales, Ingles, Etc...)")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("equipment", "Ingrese que equipamento tiene el Aula (2 computadores, impresora, etc...)")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("module", "La sede dada no es Valida, reintente").trim().isMongoId(),
    validateFields,
  ],
  postClassroom
);

router.get("/", getClassroom);

router.get("/:nombre", getClassroomName);

router.put(
  "/:id",
  [
    check("name", "Ingrese el Nombre del Aula")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("capacity", "Ingrese la Capacidad del Aula")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("room_type", "Ingrese el Tipo de Aula (Informatica, Sociales, Ingles, Etc...)")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("equipment", "Ingrese que equipamento tiene el Aula (2 computadores, impresora, etc...)")
      .trim()
      .not()
      .isEmpty(),
    check("module", "La sede dada no es Valida, reintente").trim().isMongoId(),
    validateFields,
  ],
  putClassroom
);

router.patch("/:id", patchClassroom);

router.delete("/:id", deleteClassroom);

export default router;
