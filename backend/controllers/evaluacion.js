import Evaluacion from "../models/evaluacion.js";
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
    let evaluacion = await Evaluacion.findById(id);
    console.log(evaluacion);
    if (evaluacion.archivo) {
      const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
      const pathArchivo = path.join(
        __dirname,
        "../uploads/",
        evaluacion.archivo
      );

      if (fs.existsSync(pathArchivo)) {
        fs.unlinkSync(pathArchivo);
      }
    }
    evaluacion = await Evaluacion.findByIdAndUpdate(id, { archivo: archivo });
    res.json({ archivo });
  } catch (error) {
    res.status(400).json({ error, general: "Controlador" });
  }
};

export const mostrarArchivo = async (req, res) => {
  const { id } = req.params;
  try {
    let evaluacion = await Evaluacion.findById(id);
    if (evaluacion.archivo) {
      const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
      const pathArchivo = path.join(
        __dirname,
        "../uploads/",
        evaluacion.archivo
      );
      if (fs.existsSync(pathArchivo)) {
        const extension = path.extname(evaluacion.archivo).toLowerCase();
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

export const mostrarArchivoCloud = async (req, res) => {
  const { id } = req.params;
  try {
    let evaluacion = await Evaluacion.findById(id);
    if (evaluacion.archivo) {
      return res.json({ url: evaluacion.archivo });
    }
    res.status(400).json({ msg: "Falta Imagen" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const postEvaluacion = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });
  try {
    const {  nombre, estado } = req.body;
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
      const buscar = await Evaluacion.findOne({ nombre: nombre });
      if (buscar) {
        return res
          .status(400)
          .json({ msg: `Se encontro un Evaluacion registrado con ese Nombre` });
      } else {
        const nuevoEvaluacion = new Evaluacion({
          nombre: nombre,
          archivo: result.url,
          estado: estado
        });
        const EvaluacionCreado = await nuevoEvaluacion.save();
        res.status(201).json(EvaluacionCreado);
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getEvaluacion = async (req, res) => {
  try {
    const buscar = await Evaluacion.find();
    res.json({ buscar });
  } catch (error) {
    res.status(500).json({ msg: "No se puede buscar los Evaluacions" });
  }
};

export const getEvaluacionCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const evaluacion = await Evaluacion.find();
    const resultados = evaluacion.filter((objeto) =>
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

export const getEvaluacionId = async (req, res) => {
  try {
    const { id } = req.params;
    const evaluacion = await Evaluacion.findById({_id:id});
  if(evaluacion){
    res.json(evaluacion);
  }else{
    return res.status(404).json({ msg: `Sin coincidencias para ${id}` });
  }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const putEvaluacion = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });

  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const buscarCodigo = await Evaluacion.findOne({nombre:nombre})
    if (buscarCodigo && buscarCodigo._id.toString() !== id) {
      return res
        .status(404)
        .json({ msg: "Ya se encuentra un Instrumento de evaluación registrado con ese Nombre" });
    };
    
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

      const buscar = await Evaluacion.findById(id);
      if (buscar.archivo) {
        const nombreTemp = buscar.archivo.split("/");
        const nombrearchivo = nombreTemp[nombreTemp.length - 1];
        const [public_id] = nombrearchivo.split(".");
        await cloudinary.uploader.destroy(public_id);
      }

      updatedData.archivo = result.url;
    };
    
    const buscarEvaluacion = await Evaluacion.findByIdAndUpdate({ _id: id },
      { $set: updatedData },
      {
        new: true,
      });
    res.status(201).json(buscarEvaluacion);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export const patchEvaluacion = async (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;
  try {
    const evaluacion = await Evaluacion.findById(id);
    if (evaluacion) {
      evaluacion.estado = estado;
      await evaluacion.save();
      res.json(evaluacion);
    } else {
      console.log(`id: ${id} no encontrado`);
      res.status(404).json({ msg: `evaluacion con id: ${id} no encontrado` });
    }
  } catch (error) {
    console.log(`Error al actualizar el evaluacion: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteEvaluacion = async (req, res) => {
  const { id } = req.params;
  const EvaluacionEliminado = await Evaluacion.findOneAndDelete({ _id: id });

  if (EvaluacionEliminado) {
    return res.json({
      msg: `Se eliminó el Evaluacion: ${id} de la base de datos`,
    });
  } else {
    res
      .status(400)
      .json({
        msg: `El Evaluacion: ${id} no se encuentra en la base de datos`,
      });
  }
};
