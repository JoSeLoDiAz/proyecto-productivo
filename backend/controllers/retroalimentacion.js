import Retroalimentacion from "../models/retroalimentacion.js";
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
    let retroalimentacion = await Retroalimentacion.findById(id);
    console.log(retroalimentacion);
    if (retroalimentacion.archivo) {
      const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
      const pathArchivo = path.join(
        __dirname,
        "../uploads/",
        retroalimentacion.archivo
      );
      if (fs.existsSync(pathArchivo)) {
        fs.unlinkSync(pathArchivo);
      }
    }
    retroalimentacion = await Retroalimentacion.findByIdAndUpdate(id, {
      archivo: archivo,
    });
    res.json({ archivo });
  } catch (error) {
    res.status(400).json({ error, general: "Controlador" });
  }
};

export const mostrarArchivo = async (req, res) => {
  const { id } = req.params;
  try {
    let retroalimentacion = await Retroalimentacion.findById(id);
    if (retroalimentacion.archivo) {
      const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
      const pathArchivo = path.join(
        __dirname,
        "../uploads/",
        retroalimentacion.archivo
      );
      if (fs.existsSync(pathArchivo)) {
        const extension = path.extname(retroalimentacion.archivo).toLowerCase();
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

export const postRetroalimentacion = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });
  try {
    const {
      nombre,
      codigo_ficha,
      descripcion,
      fecha,
      programa,
      estado,
    } = req.body;
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
      const buscar = await Retroalimentacion.findOne({ codigo_ficha: codigo_ficha, programa:programa });
      if (buscar) {
        return res
          .status(400)
          .json({
            msg: `Se encontro un Retroalimentacion registrado con ese codigo`,
          });
      } else {
        const nuevoRetroalimentacion = new Retroalimentacion({
          nombre: nombre,
          codigo_ficha: codigo_ficha,
          descripcion: descripcion,
          fecha: fecha,
          archivo: result.url,
          programa: programa,
          estado: estado,
        });
        const RetroalimentacionCreado = await nuevoRetroalimentacion.save();
        res.status(201).json(RetroalimentacionCreado);
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRetroalimentacion = async (req, res) => {
  try {
    const buscar = await Retroalimentacion.find().populate("programa");
    res.json({ buscar });
  } catch (error) {
    res.status(500).json({ msg: "No se puede buscar los Retroalimentacions" });
  }
};

export const getRetroalimentacionCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const retroalimentacion = await Retroalimentacion.find();
    const resultados = retroalimentacion.filter((objeto) =>
      objeto.codigo.toString().startsWith(codigo)
    );
    console.log(resultados);
    if (resultados) {
      res.json(resultados);
    } else {
      return res.status(404).json({ msg: `Sin coincidencias para ${codigo}` });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const putRetroalimentacion = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });
  try {
    const { id } = req.params;
    const { nombre, codigo_ficha, descripcion, fecha, programa } =
      req.body;

    const buscarNombre = await Retroalimentacion.findOne({ nombre: nombre });
    if (buscarNombre && !buscarNombre._id.toString() === id) {
      return res.status(404).json({
        msg: "Ya se encuentra una Retroalimentacion registrada con ese Nombre",
      });
    }

    let updatedData = {
      nombre: nombre,
      codigo_ficha: codigo_ficha,
      descripcion: descripcion,
      fecha: fecha,
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
      const buscar = await Retroalimentacion.findById(id);
      if (buscar.archivo) {
        const nombreTemp = buscar.archivo.split("/");
        const nombreArchivo = nombreTemp[nombreTemp.length - 1];
        const [public_id] = nombreArchivo.split(".");
        await cloudinary.uploader.destroy(public_id);
      }
      updatedData.archivo = result.url;
    };
      const buscarRetroalimentacion = await Retroalimentacion.findByIdAndUpdate(
        { _id: id },
        {
          $set: updatedData,
        },
        { new: true }
      );

      res.status(201).json(buscarRetroalimentacion);
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const patchRetroalimentacion = async (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;
  try {
    const Retroalimentacion = await Retroalimentacion.findById(id);
    if (Retroalimentacion) {
      Retroalimentacion.estado = estado;
      await Retroalimentacion.save();
      res.json(Retroalimentacion);
    } else {
      console.log(`id: ${id} no encontrado`);
      res
        .status(404)
        .json({ msg: `Retroalimentacion con id: ${id} no encontrado` });
    }
  } catch (error) {
    console.log(`Error al actualizar el Retroalimentacion: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteRetroalimentacion = async (req, res) => {
  const { id } = req.params;
  const RetroalimentacionEliminado = await Retroalimentacion.findOneAndDelete({
    _id: id,
  });

  if (RetroalimentacionEliminado) {
    return res.json({
      msg: `Se eliminó el Retroalimentacion: ${id} de la base de datos`,
    });
  } else {
    res
      .status(400)
      .json({
        msg: `El Retroalimentacion: ${id} no se encuentra en la base de datos`,
      });
  }
};
