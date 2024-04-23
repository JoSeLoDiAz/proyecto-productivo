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
    check("name", "complete el campo Nombre")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("last_name", "Complete el campo Apellidos")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("identification_type", "Complete el campo Tipo de Identificación")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("identification_number", "Complete el campo Identificación")
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
    check("date_of_birth", "Complete la Fecha de Nacimiento")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("gender", "Complete el Genero").trim().not().isEmpty().toLowerCase(),
    check("address", "Complete la Dirección")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("phone", "Complete el campo celular")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("phone", "El celular debe tener minimo 8 digitos maximo 12")
      .trim()
      .isLength({ min: 8, max: 12 })
      .toLowerCase(),
    check("email", "Complete el Campo Email").trim().not().isEmpty().isEmail(),
    check("password", "Complete el campo Contraseña").trim().not().isEmpty(),
    check("occupation", "Complete el campo Ocupación")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("marital_status", "Complete el campo Estado Civil")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("nationality", "Complete el campo Nacionalidad")
      .trim()
      .not()
      .isEmpty(),
    check("emergency_contact", "Complete el campo Contacto de Emergencia")
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
    check("name", "complete el campo Nombre")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("last_name", "Complete el campo Apellidos")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("identification_type", "Complete el campo Tipo de Identificación")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("identification_number", "Complete el campo Identificación")
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
    check("date_of_birth", "Complete la Fecha de Nacimiento")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("gender", "Complete el Genero").trim().not().isEmpty().toLowerCase(),
    check("address", "Complete la Dirección")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("phone", "Complete el campo celular")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("phone", "El celular debe tener minimo 8 digitos maximo 12")
      .trim()
      .isLength({ min: 8, max: 12 })
      .toLowerCase(),
    check("email", "Complete el Campo Email").trim().not().isEmpty().isEmail(),
    check("password", "Complete el campo Contraseña").trim().not().isEmpty(),
    check("occupation", "Complete el campo Ocupación")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("marital_status", "Complete el campo Estado Civil")
      .trim()
      .not()
      .isEmpty()
      .toLowerCase(),
    check("nationality", "Complete el campo Nacionalidad")
      .trim()
      .not()
      .isEmpty(),
    check("emergency_contact", "Complete el campo Contacto de Emergencia")
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

router.patch("/:id" , patchUser);

router.delete("/:id", deleteUser);

export default router;
