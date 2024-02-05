import Material from "../models/material.js";
import dotenv from "dotenv";
import path from "path";
import subirArchivo from "../helpers/subir-archivo.js";
import url from "url";
import * as fs from "fs";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();

export const Archivo = async (req, res) => {
  const { id } = req.params;
  try {
    let archivo;
    await subirArchivo(req.files, undefined)
      .then((value) => (archivo = value))
      .catch((err) => console.log("Error : ", err));
    let material = await Material.findById(id);
    console.log(material);
    if (material.archivo) {
      const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
      const pathArchivo = path.join(__dirname, "../uploads/", material.archivo);
      if (fs.existsSync(pathArchivo)) {
        fs.unlinkSync(pathArchivo);
      }
    }
    material = await Material.findByIdAndUpdate(id, { archivo: archivo });
    res.json({ archivo });
  } catch (error) {
    res.status(400).json({ error, general: "Controlador" });
  }
};

export const mostrarArchivo = async (req, res) => {
  const { id } = req.params;
  try {
    let material = await Material.findById(id);
    if (material.archivo) {
      const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
      const pathArchivo = path.join(__dirname, "../uploads/", material.archivo);
      if (fs.existsSync(pathArchivo)) {
        const extension = path.extname(material.archivo).toLowerCase();
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
        console.log(pathArchivo);
        return res.sendFile(pathArchivo);
      }
    }

    res.status(400).json({ msg: "Falta Archivo" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const postMaterial = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });
  try {
    const { nombre, estado } = req.body;
    const { archivo } = req.files;
    if (archivo) {
      const extension = archivo.name.split(".").pop();
      const { tempFilePath } = archivo;
      const result = await cloudinary.uploader.upload(tempFilePath, {
        width: 250,
        crop: "limit",
        resource_type: "raw",
        allowedFormats: ["jpg", "png", "docx", "xlsx", "pptx", "pdf"],
        format: extension,
      });
      const buscar = await Material.findOne({ nombre: nombre });
      if (buscar) {
        return res
          .status(400)
          .json({ msg: `Se encontro un Material registrado con ese Nombre` });
      } else {
        const nuevoMaterial = new Material({
          nombre: nombre,
          archivo: result.url,
          estado: estado,
        });
        const MaterialCreado = await nuevoMaterial.save();
        res.status(201).json(MaterialCreado);
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMaterial = async (req, res) => {
  try {
    const buscar = await Material.find();
    res.json({ buscar });
  } catch (error) {
    res.status(500).json({ msg: "No se puede buscar los Materiales" });
  }
};

export const getMaterialCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const material = await Material.find();
    const resultados = material.filter((objeto) =>
      objeto.codigo.toString().startsWith(codigo)
    );
    if (resultados) {
      res.json(resultados);
    } else {
      return res.status(404).json({ msg: `Sin coincidencias para ${codigo}` });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getMaterialId = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await Material.findById({ _id: id });
    if (material) {
      res.json(material);
    } else {
      return res.status(404).json({ msg: `Sin coincidencias para ${id}` });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const putMaterial = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });

  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const buscarNomnre = await Material.findOne({ nombre: nombre });
    if (buscarNomnre && buscarNomnre._id.toString() !== id) {
      return res
        .status(404)
        .json({
          msg: "Ya se encuentra un Material de apoyo registrado con ese Nombre",
        });
    }

    let updatedData = {
      nombre: nombre,
    };

    if (req.files && req.files.archivo) {
      const archivo = req.files.archivo;
      const extension = archivo.name.split(".").pop();
      const { tempFilePath } = archivo;
      const result = await cloudinary.uploader.upload(tempFilePath, {
        width: 250,
        crop: "limit",
        resource_type: "raw",
        allowedFormats: ["jpg", "png", "docx", "xlsx", "pptx", "pdf"],
        format: extension,
      });

      const buscar = await Material.findById(id);
      if (buscar.archivo) {
        const nombreTemp = buscar.archivo.split("/");
        const nombrearchivo = nombreTemp[nombreTemp.length - 1];
        const [public_id] = nombrearchivo.split(".");
        await cloudinary.uploader.destroy(public_id);
      }

      updatedData.archivo = result.url;
    }

    const buscarMaterial = await Material.findByIdAndUpdate(
      { _id: id },
      { $set: updatedData },
      { ne: true }
    );
    res.status(201).json(buscarMaterial);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const patchMaterial = async (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;
  try {
    const material = await Material.findById(id);
    if (material) {
      material.estado = estado;
      await material.save();
      res.json(material);
    } else {
      console.log(`id: ${id} no encontrado`);
      res.status(404).json({ msg: `material con id: ${id} no encontrado` });
    }
  } catch (error) {
    console.log(`Error al actualizar el material: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteMaterial = async (req, res) => {
  const { id } = req.params;
  const MaterialEliminado = await Material.findOneAndDelete({ _id: id });

  if (MaterialEliminado) {
    return res.json({
      msg: `Se eliminó el Material: ${id} de la base de datos`,
    });
  } else {
    res
      .status(400)
      .json({ msg: `El Material: ${id} no se encuentra en la base de datos` });
  }
};
