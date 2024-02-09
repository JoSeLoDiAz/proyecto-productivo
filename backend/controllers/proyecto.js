import Proyecto from "../models/proyecto.js";
import dotenv from "dotenv";
import path from "path";
import uploadFile  from "../helpers/subir-archivo.js";
import url from "url";
import * as fs from "fs";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();

export const Archivo = async (req, res) => {
  const { id } = req.params;
  try {
    let archivo;
    await uploadFile (req.files, undefined)
      .then((value) => (archivo = value))
      .catch((err) => console.log("Error : ", err));
    let proyecto = await Proyecto.findById(id);
    console.log(proyecto);
    if (proyecto.archivo) {
      const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
      const pathArchivo = path.join(__dirname, "../uploads/", proyecto.archivo);
      if (fs.existsSync(pathArchivo)) {
        fs.unlinkSync(pathArchivo);
      }
    }
    proyecto = await Proyecto.findByIdAndUpdate(id, { archivo: archivo });
    res.json({ archivo });
  } catch (error) {
    res.status(400).json({ error, general: "Controlador" });
  }
};

export const mostrarArchivo = async (req, res) => {
  const { id } = req.params;
  try {
    let proyecto = await Proyecto.findById(id);
    if (proyecto.archivo) {
      const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
      const pathArchivo = path.join(__dirname, "../uploads/", proyecto.archivo);
      if (fs.existsSync(pathArchivo)) {
        const extension = path.extname(proyecto.archivo).toLowerCase();
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

export const postProyecto = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });
  try {
    const { nombre, descripcion, fecha, version, estado, programa } =
      req.body;
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
      const buscar = await Proyecto.findOne({
        programa: programa,
      });
      if (buscar) {
        return res
          .status(400)
          .json({
            msg: `Este programa de formación ya tiene un proyecto registrado con el codigo ${codigo}`,
          });
      } else {
        const nuevoProyecto = new Proyecto({
          nombre: nombre,
          descripcion: descripcion,
          fecha: fecha,
          version: version,
          archivo: result.url,
          estado: estado,
          programa: programa,
        });
        const ProyectoCreado = await nuevoProyecto.save();
        res.status(201).json(ProyectoCreado);
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProyecto = async (req, res) => {
  try {
    const buscar = await Proyecto.find().populate("programa");
    res.json({ buscar });
  } catch (error) {
    res.status(500).json({ msg: "No se puede buscar los Proyectos" });
  }
};

export const getProyectoCodigo = async (req, res) => {
  try {
    const { programa } = req.params;
    const proyecto = await Proyecto.findOne({
      programa: programa,
    });
    if (proyecto) {
      res.json(proyecto);
    } else {
      return res.status(404).json({ msg: `Sin coincidencias para ${codigo}` });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

export const putProyecto = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });

  try {
    const { id } = req.params;
    const {
      nombre,
      descripcion,
      fecha,
      version,
      programa
    } = req.body;

    const buscarCodigo = await Proyecto.findOne({ codigo: codigo });
    if (buscarCodigo && buscarCodigo._id.toString() === id) {
      return res.status(404).json({
        msg: "Ya se encuentra un Proyecto registrado con ese codigo",
      });
    }

    let updatedData = {
      nombre: nombre,
      descripcion: descripcion,
      fecha: fecha,
      version: version,
      programa: programa,
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

      const buscarId = await Proyecto.findById(id);

      if (buscarId.archivo) {
        const nombreTemp = buscarId.archivo.split("/");
        const nombrearchivo = nombreTemp[nombreTemp.length - 1];
        const [public_id] = nombrearchivo.split(".");
        await cloudinary.uploader.destroy(public_id);
      }

      updatedData.archivo = result.url;
    }

    const buscarProyecto = await Proyecto.findByIdAndUpdate(
      { _id: id },
      { $set: updatedData },
      { new: true }
    );
    res.status(201).json(buscarProyecto);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const patchProyecto = async (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;
  try {
    const proyecto = await Proyecto.findById(id);
    if (proyecto) {
      proyecto.estado = estado;
      await proyecto.save();
      res.json(proyecto);
    } else {
      console.log(`id: ${id} no encontrado`);
      res.status(404).json({ msg: `proyecto con id: ${id} no encontrado` });
    }
  } catch (error) {
    console.log(`Error al actualizar el proyecto: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteProyecto = async (req, res) => {
  const { id } = req.params;
  const ProyectoEliminado = await Proyecto.findOneAndDelete({ _id: id });

  if (ProyectoEliminado) {
    return res.json({
      msg: `Se eliminó el Proyecto: ${id} de la base de datos`,
    });
  } else {
    res
      .status(400)
      .json({ msg: `El Proyecto: ${id} no se encuentra en la base de datos` });
  }
};
