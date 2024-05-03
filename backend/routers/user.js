import { validateFields } from "../valichecks/validate-fields.js";
import { check } from "express-validator";
import { Router } from "express";
import { isAdmin } from "../helpers/validate-user.js";

const router = Router();

import {
  uploadUserFile,
  showUserFile,
  cloudFile,
  showCloudFile,
  curriculum_vitae,
  postUser,
  postUserNetwork,
  postUserToken,
  getUsers,
  getUserByCode,
  getUserById,
  putUser,
  patchUser,
  recoverPassword,
  newPassword,
  deleteUser,
} from "../controllers/user.js";

router.post(
  "/archivo/:id",
  [
    check("id", "ID invalido").isMongoId(),
    check("file", "Archivo vacio").trim().not().isEmpty(),
    validateFields,
  ],
  uploadUserFile
);

router.post(
  "/archivoNube/:id",
  [check("id", "ID invalido").isMongoId(), validateFields],
  cloudFile
);

router.get(
  "/foto/:id",
  [check("id", "No es un ID válido").isMongoId(), validateFields],
  showCloudFile
);

router.post(
  "/",
  [
    check("name", "Ingrese el campo Nombre")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("last_name", "Ingrese el campo Apellidos")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("identification_type", "Ingrese el campo Tipo de Identificación")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("identification_number", "Ingrese el campo Numero de Identificación")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check(
      "identification_number",
      "El numero de identificación debe tener minimo 8 digitos maximos 15"
    )
      .trim()
      .isLength({ min: 8, max: 15 })
      .toLowerCase(),
    check("date_of_birth", "Ingrese la Fecha de Nacimiento")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("gender", "Ingrese el Genero").trim().not().isEmpty().toLowerCase(),
    check("address", "Ingrese la Dirección")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("phone", "Ingrese el campo celular")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("phone", "El celular debe tener minimo 8 digitos maximo 12")
      .trim()
      .isLength({ min: 8, max: 12 })
      .toLowerCase(),
    check("email", "Ingrese el Campo Email").trim().not().isEmpty().isEmail(),
    check("password", "Ingrese el campo Contraseña").trim().not().isEmpty(),
    check(
      "password",
      "La contraseña debe tener una longitud minima de 8 caracteres"
    ).isLength({ min: 8 }),
    check("occupation", "Ingrese el campo Ocupación")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("marital_status", "Ingrese el campo Estado Civil")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("nationality", "Ingrese el campo Nacionalidad")
      .trim()
      .not()
      .isEmpty(),
    check("emergency_contact", "Ingrese el campo Contacto de Emergencia")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("role", "Rol invalido").trim().isMongoId(),
    validateFields,
  ],
  postUser
);

router.post(
  "/agregarRed/:id",
  [
    check("id", "ID invalido").isMongoId(),
    check("knowledge_network", "Red invalida").trim().isMongoId(),
    validateFields,
  ],
  postUserNetwork
);

router.post(
  "/token",
  [
    check("identification_number", "Falta el Usuario").trim().not().isEmpty(),
    check("password", "Falta la contraseña").trim().not().isEmpty(),
    validateFields,
  ],
  postUserToken
);

router.get(
  "/mostrar/:id",
  [check("id", "No es un ID válido").isMongoId(), validateFields],
  showUserFile
);

router.get(
  "/hojaVida/:id",
  [check("id", "No es un ID válido").isMongoId(), validateFields],
  curriculum_vitae
);

router.get("/", getUsers);

router.get("/:codigo", getUserByCode);

router.get("/id/:id", getUserById);

router.put(
  "/:id",
  [
    check("name", "Ingrese el campo Nombre")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("last_name", "Ingrese el campo Apellidos")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("identification_type", "Ingrese el campo Tipo de Identificación")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("identification_number", "Ingrese el campo Numero de Identificación")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check(
      "identification_number",
      "El numero de identificación debe tener minimo 8 digitos maximos 15"
    )
      .trim()
      .isLength({ min: 8, max: 15 })
      .toLowerCase(),
    check("date_of_birth", "Ingrese la Fecha de Nacimiento")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("gender", "Ingrese el Genero").trim().not().isEmpty().toLowerCase(),
    check("address", "Ingrese la Dirección")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("phone", "Ingrese el campo celular")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("phone", "El celular debe tener minimo 8 digitos maximo 12")
      .trim()
      .isLength({ min: 8, max: 12 })
      .toLowerCase(),
    check("email", "Ingrese el Campo Email").trim().not().isEmpty().isEmail(),
    check("password", "Ingrese el campo Contraseña").trim().not().isEmpty(),
    check("occupation", "Ingrese el campo Ocupación")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("marital_status", "Ingrese el campo Estado Civil")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("nationality", "Ingrese el campo Nacionalidad")
      .trim()
      .not()
      .isEmpty(),
    check("emergency_contact", "Ingrese el campo Contacto de Emergencia")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("role", "Rol invalido").trim().isMongoId(),
    validateFields,
  ],
  putUser
);

router.put(
  "/forgot/password",
  [
    check("email", "Debe ingresar el email").trim().not().isEmpty(),
    validateFields,
  ],
  recoverPassword
);

router.put("/new/password", newPassword);

router.patch("/:id", patchUser);

router.delete("/:id", deleteUser);

export default router;
