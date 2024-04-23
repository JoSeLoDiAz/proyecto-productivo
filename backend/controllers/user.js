import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Role from "../models/role.js";
import dotenv from "dotenv";
import path from "path";
import uploadFile from "../helpers/subir-archivo.js";
import url from "url";
import * as fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import Program from "../models/programa.js";
import sendEmail from "../helpers/sendEmail.js";
import { fileURLToPath } from "url";

dotenv.config();

export const uploadUserFile = async (req, res) => {
  const { id } = req.params;
  try {
    let file;
    await uploadFile(req.files, undefined)
      .then((value) => (file = value))
      .catch((err) => console.log("Error : ", err));
    let user = await User.findById(id);
    if (user.file) {
      const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
      const filePath = path.join(__dirname, "../uploads/", user.file);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    user = await User.findByIdAndUpdate(id, { file: file });
    res.json({ file });
  } catch (error) {
    res.status(400).json({ error, general: "Controller" });
  }
};

export const showUserFile = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findById(id);
    if (user.file) {
      const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
      const filePath = path.join(__dirname, "../uploads/", user.file);
      if (fs.existsSync(filePath)) {
        const extension = path.extname(user.file).toLowerCase();
        let contentType = "application/octet-stream";
        const contentTypeMapping = {
          ".jpg": "image/jpeg",
          ".jpeg": "image/jpeg",
          ".png": "image/png",
          ".pdf": "application/pdf",
        };
        if (contentTypeMapping[extension]) {
          contentType = contentTypeMapping[extension];
        }
        res.set("Content-Type", contentType);
        console.log(filePath);
        return res.sendFile(filePath);
      }
    }

    res.status(400).json({ msg: "Falta Archivo" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const cloudFile = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });

  try {
    const { id } = req.params;
    const { file } = req.files;
    if (!file || !file.tempFilePath) {
      return res.status(400).json({ error: "Archivo no proporcionado" });
    }

    const extension = file.name.split(".").pop();

    const { tempFilePath } = file;

    const result = await cloudinary.uploader.upload(tempFilePath, {
      width: 250,
      crop: "limit",
      resource_type: "raw",
      allowedFormats: ["jpg", "png", "jpeg"],
      format: extension,
    });

    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Evaluación no encontrada" });
    }

    if (user.file) {
      const tempName = user.file.split("/");
      const fileName = tempName[tempName.length - 1];
      const [public_id] = fileName.split(".");
      await cloudinary.uploader.destroy(public_id);
    }
    user = await User.findByIdAndUpdate(id, { file: result.url });
    res.json({ url: result.url });
  } catch (error) {
    console.error("Error en el controlador:", error);
    res.status(500).json({ error: error.message });
  }
};

export const showCloudFile = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findById(id);
    if (user.file) {
      return res.json({ url: user.file });
    }
    res.status(400).json({ msg: "Falta Imagen" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const curriculum_vitae = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findById(id);
    if (user.curriculum_vitae) {
      return res.json({ url: user.curriculum_vitae });
    }
    res.status(400).json({ msg: "Falta Imagen" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const postUser = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });
  try {
    const {
      name,
      last_name,
      identification_type,
      identification_number,
      date_of_birth,
      gender,
      address,
      phone,
      email,
      password,
      occupation,
      marital_status,
      nationality,
      emergency_contact,
      file,
      status,
      role,
    } = req.body;

    let searchRole = await Role.findById(role);

    let knowledge_network;

    const existingEmail = await User.findOne({ email: email });

    if (existingEmail) {
      return res.status(404).json({
        msg: `Se encontro un Usuario registrado con el correo ${email}`,
      });
    }

    if (searchRole.name !== "Administrador".toLowerCase()) {
      knowledge_network = req.body.knowledge_network;
    }

    const { curriculum_vitae } = req.files;
    if (curriculum_vitae) {
      const extension = curriculum_vitae.name.split(".").pop();
      const { tempFilePath } = curriculum_vitae;
      const result = await cloudinary.uploader.upload(tempFilePath, {
        width: 250,
        crop: "limit",
        resource_type: "raw",
        allowedFormats: ["jpg", "png", "docx", "xlsx", "pptx", "pdf"],
        format: extension,
      });
      const existingUser = await User.findOne({
        identification_number: identification_number,
      });
      if (existingUser) {
        return res.status(400).json({
          msg: `Se encontro un Usuario registrado con ese número de identificacion`,
        });
      } else {
        const newUser = new User({
          name: name,
          last_name: last_name,
          identification_type: identification_type,
          identification_number: identification_number,
          date_of_birth: date_of_birth,
          gender: gender,
          address: address,
          phone: phone,
          email: email,
          password: password,
          occupation: occupation,
          marital_status: marital_status,
          nationality: nationality,
          emergency_contact: emergency_contact,
          curriculum_vitae: result.url,
          file: file,
          status: status,
          knowledge_network: knowledge_network,
          role: role,
        });
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(req.body.password, salt);
        const createdUser = await newUser.save();
        res.status(201).json(createdUser);
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const postUserNetwork = async (req, res) => {
  const { id } = req.params;
  const { knowledge_network } = req.body;
  try {
    const networkAdded = await User.updateOne(
      { _id: id },
      { $addToSet: { knowledge_network: knowledge_network } }
    );

    if (networkAdded.modifiedCount !== 0) {
      return res.json({ networkAdded, msj: "Red agregada correctamente ✅" });
    } else {
      return res.status(400).json({
        msg: `El usuario ya está ligado a esta red ${knowledge_network}`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Hubo un error en el servidor", error });
  }
};

export const postUserToken = async (req, res) => {
  const { identification_number, password } = req.body;
  try {
    const user = await User.findOne({ identification_number }).populate("role");
    console.log(user);
    if (!user) {
      return res.status(400).json({
        msg: "Usuario o password incorrectos",
      });
    }
    if (user.status === false) {
      return res.status(400).json({
        msg: "Usuario Inactivo",
      });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(404).json({
        msg: "Usuario o password incorrectos",
      });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role.name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.header("Authorization", token);
    res.json({
      user,
      token,
      msg: "Inicio de Sesion Exitoso ✅",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Ocurrio un error",
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("knowledge_network")
      .populate("role");
    res.json({ users });
  } catch (error) {
    return res.status(500).json({ msg: "No se puede buscar los Usuarios" });
  }
};

export const getUserByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const users = await User.find();
    const results = users.filter((object) =>
      object.code.toString().startsWith(code)
    );
    if (results.length > 0) {
      res.json(results);
    } else {
      return res.status(404).json({ msg: `Sin coincidencias para ${code}` });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = await User.findById(id)
      .populate("knowledge_network")
      .populate("role");
    if (userId) {
      res.json(userId);
    } else {
      return res.status(404).json({ msg: `Sin coincidencias para ${id}` });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const putUser = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });

  try {
    const { id } = req.params;
    const {
      name,
      last_name,
      identification_type,
      identification_number,
      date_of_birth,
      gender,
      address,
      phone,
      email,
      password,
      occupation,
      marital_status,
      nationality,
      emergency_contact,
      file,
      role,
    } = req.body;

    let searchRole = await Role.findById(role);

    let knowledge_network;

    const existingIdentificationNumber = await User.findOne({
      identification_number: identification_number,
    });
    if (
      existingIdentificationNumber &&
      existingIdentificationNumber._id.toString() !== id
    ) {
      return res.status(404).json({
        msg: "Ya se encuentra un Usuario registrado con ese número de Identificación",
      });
    }

    if (searchRole.name !== "Administrador".toLowerCase()) {
      knowledge_network = req.body.knowledge_network;
    }

    let updatedData = {
      name: name,
      last_name: last_name,
      identification_type: identification_type,
      identification_number: identification_number,
      date_of_birth: date_of_birth,
      gender: gender,
      address: address,
      phone,
      email: email,
      password: password,
      occupation: occupation,
      marital_status: marital_status,
      nationality: nationality,
      emergency_contact: emergency_contact,
      file: file,
      role: role,
      knowledge_network: knowledge_network,
    };

    if (req.files && req.files.curriculum_vitae) {
      const curriculum_vitae = req.files.curriculum_vitae;
      const extension = curriculum_vitae.name.split(".").pop();
      const { tempFilePath } = curriculum_vitae;
      const result = await cloudinary.uploader.upload(tempFilePath, {
        width: 250,
        crop: "limit",
        resource_type: "raw",
        allowedFormats: ["jpg", "png", "docx", "xlsx", "pptx", "pdf"],
        format: extension,
      });

      const existingUser = await User.findById(id);

      if (existingUser && existingUser.curriculum_vitae) {
        const tempName = existingUser.curriculum_vitae.split("/");
        const nameCurriculum_vitae = tempName[tempName.length - 1];
        const [public_id] = nameCurriculum_vitae.split(".");
        await cloudinary.uploader.destroy(public_id);
      }

      updatedData.curriculum_vitae = result.url;
    }

    if (req.body && req.body.knowledge_network) {
      updatedData.knowledge_network = knowledge_network;
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { $set: updatedData },
      { new: true }
    );
    res.status(201).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const patchUser = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    const user = await User.findById(id);
    if (user) {
      user.status = status;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ msg: `usuario con id: ${id} no encontrado` });
    }
  } catch (error) {
    console.log(`Error al actualizar el usuario: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const recoverPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email }).populate("role");

    if (!user) {
      return res
        .status(400)
        .json({ msg: `El usuario con el email ${email} no existe.` });
    }
    let message =
      "Consulte su correo electrónico se ha enviado un enlace para restablecer su contraseña.";
    let link;
    let emailstatus = "OK";
    const token = jwt.sign(
      { id: user.id, role: user.role.name },
      process.env.RESET_PASSWORD_KEY,
      { expiresIn: "20m" }
    );
    link = `${process.env.CLIENT_URL}/#/forgot/password?reset=${token}`;
    user.resetToken = token;
    await user.save();
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const imagenPath1 = path.join(
        __dirname,
        "..",
        "/imagenes/logo-sena-verde-complementario-png-2022.png"
      );
      const imagenPath2 = path.join(__dirname, "..", "/imagenes/image-1.png");

      await sendEmail.sendMail({
        from: '"Recuperacion de Contraseña" <repositorioquasar@gmail.com>',
        to: user.email,
        subject: "Recuperacion de Contraseña - Repositorio",
        html: `<head>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
      <title></title>
      
        <style type="text/css">
          @media only screen and (min-width: 620px) {
      .u-row {
        width: 600px !important;
      }
      .u-row .u-col {
        vertical-align: top;
      }
    
      .u-row .u-col-50 {
        width: 300px !important;
      }
    
      .u-row .u-col-100 {
        width: 600px !important;
      }
    
    }
    
    @media (max-width: 620px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: 100% !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col > div {
        margin: 0 auto;
      }
    }
    body {
      margin: 0;
      padding: 0;
    }
    
    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }
    
    p {
      margin: 0;
    }
    
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    
    * {
      line-height: inherit;
    }
    
    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }
    
    table, td { color: #000000; } #u_body a { color: #161a39; text-decoration: underline; }
        </style>
      
      
    
    <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
    
    </head>
    
    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
        
      
      
    <div class="u-row-container" style="padding: 0px;background-color: #f9f9f9">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f9f9f9;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f9f9f9;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f9f9f9;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:'Lato',sans-serif;" align="left">
            
      <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #f9f9f9;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
              <span>&#160;</span>
            </td>
          </tr>
        </tbody>
      </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
      </div>
      
    
    
      
      
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:'Lato',sans-serif; background-color: #88888870;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px;font-family:'Lato',sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
      <td>
      <!--primmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm-->
      <div style="display: flex">
    <h1 style="margin:auto;">COLMABE</h1>
    <img src="cid:logo" style="width: 80px !important" alt="logo-sena">
        </div>
<!--primmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm-->
  </td>
      </tr>
    </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
      </div>
      
    
    
      
      
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #161a39;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #161a39;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:35px 10px 10px;font-family:'Lato',sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="center">
        <!--caaaaaaaaaaaaaaaaaaaaaaaaaaaaaaannndado-->
          <img align="center" border="0" src="cid:candado" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 10%;max-width: 58px;" width="58"/>
          <!--caaaaaaaaaaaaaaaaaaaaaaaaaaaaaaannndado-->
        </td>
      </tr>
    </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Lato',sans-serif;" align="left">
            
      <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%; text-align: center;"><span style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;">Restablecimiento de Contraseña</span></p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
      </div>
      
    
    
      
      
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:'Lato',sans-serif; text-align: justify; align-items: center;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;" align="left">
            
      <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px; color: #666666;">Hola,</span></p>
    <p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px; color: #666666;">Le enviamos este correo electrónico en respuesta a su solicitud de restablecer su contraseña en el aplicativo del Colegio Manela Beltran - COLMABE.</span></p>
    <p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px; color: #666666;">Para restablecer su contraseña, siga el siguiente enlace: </span></p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 40px;font-family:'Lato',sans-serif;" align="left">
            
      <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
    <div align="left">
      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:51px; v-text-anchor:middle; width:205px;" arcsize="2%"  stroke="f" fillcolor="#18163a"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
        <a href="${link}" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #18163a; border-radius: 1px;-webkit-border-radius: 1px; -moz-border-radius: 1px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
          <span style="display:block;padding:15px 40px;line-height:120%;"><span style="font-size: 18px; line-height: 21.6px;">Restablecer Contraseña</span></span>
        </a>
        <!--[if mso]></center></v:roundrect><![endif]-->
    </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;" align="left">
            
      <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%;"><span style="color: #888888; font-size: 14px; line-height: 19.6px;"><em><span style="font-size: 16px; line-height: 22.4px;">Ignore este correo electrónico si no solicitó un cambio de contraseña.</span></em></span><br /><span style="color: #888888; font-size: 14px; line-height: 19.6px;"><em><span style="font-size: 16px; line-height: 22.4px;">&nbsp;</span></em></span></p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
      </div>
      
    
    
      
      
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #18163a;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #18163a;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 20px 20px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 20px 20px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Lato',sans-serif;" align="left">
            
      <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px; color: #ecf0f1;">Atentamente</span></p>
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px; color: #ecf0f1;">Equipo &nbsp;del Colegio Manela Beltran - COLMABE</span></p>
    <p style="font-size: 14px; line-height: 140%;"><a href="repositoriointeligente1@gmail.com" style="font-size: 14px; line-height: 19.6px; color: #ecf0f1;">repositoriointeligente1@gmail.com</a></p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px 0px 0px 20px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px 0px 0px 20px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px 10px;font-family:'Lato',sans-serif;" align="left">
            
    <div align="left">
      <div style="display: table; max-width:187px;">
      <!--[if (mso)|(IE)]><table width="187" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="left"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:187px;"><tr><![endif]-->
      
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href=" " title="SENA" target="_blank">
            <!--Logoooooooooooooooooooo foooondooooo-->
              <img src="cid:logo" alt="LogoSena" alt="SENA" title="SENA" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important"/>
              <!--Logoooooooooooooooooooo foooondooooo-->
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
    
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:5px 10px 10px;font-family:'Lato',sans-serif;" align="left">
            
      <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="line-height: 140%; font-size: 14px;"><span style="font-size: 14px; line-height: 19.6px;"><span style="color: #ecf0f1; font-size: 14px; line-height: 19.6px;"><span style="line-height: 19.6px; font-size: 14px;">Servicio Nacional de Aprendizaje &copy;&nbsp; <br> Todos los Derechos Reservados</span></span></span></p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
      </div>
      
    
    
      
      
    <div class="u-row-container" style="padding: 0px;background-color: #f9f9f9">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #1c103b;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f9f9f9;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #1c103b;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:'Lato',sans-serif;" align="left">
            
      <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #1c103b;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
              <span>&#160;</span>
            </td>
          </tr>
        </tbody>
      </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
      </div>
      
    
    
      
      
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f9f9f9;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f9f9f9;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 40px 30px 20px;font-family:'Lato',sans-serif;" align="left">
            
      <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
        
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
      </div>
      
    
    
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
      </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>
    `,

        attachments: [
          {
            filename: "/imagenes/logo-sena-verde-complementario-png-2022.png",
            path: imagenPath1,
            cid: "logo",
          },
          {
            filename: "/imagenes/image-1.png",
            path: imagenPath2,
            cid: "candado",
          },
        ],
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Algo salio mal" });
    }
    return res.status(201).json({ msg: message, emailstatus, link });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: "Algo salio mal" });
  }
};

export const newPassword = async (req, res) => {
  const { newPassword } = req.body;
  const resetToken = req.headers.reset;
  if (!resetToken || !newPassword) {
    return res.status(400).json({ msg: "Campos requeridos o invalidos" });
  }

  try {
    const user = await User.findOne({ resetToken });

    if (!user) {
      return res.status(400).json({ msg: "Token inválido" });
    }

    const jwtPayload = jwt.verify(resetToken, process.env.RESET_PASSWORD_KEY);

    if (!jwtPayload) {
      return res.status(400).json({ msg: "Token inválido para este usuario" });
    }

    if (typeof newPassword !== "string") {
      return res.status(400).json({ msg: "La nueva contraseña no es válida" });
    }

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    user.password = hashedPassword;

    user.resetToken = "";
    await user.save();

    return res.json({ msg: "Contraseña actualizada con éxito", newPassword });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Algo salió mal" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findOneAndDelete({ _id: id });

  if (deletedUser) {
    return res.json({
      msg: `Se eliminó el Usuario: ${id} de la base de datos`,
    });
  } else {
    res
      .status(400)
      .json({ msg: `El Usuario: ${id} no se encuentra en la base de datos` });
  }
};
