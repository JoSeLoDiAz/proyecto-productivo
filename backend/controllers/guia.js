import Guia from "../models/guia.js";
import Evaluacion from "../models/evaluacion.js";
import Material from "../models/material.js";
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
    let guia = await Guia.findById(id);
    console.log(guia);
    if (guia.archivo) {
      const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
      const pathArchivo = path.join(__dirname, "../uploads/", guia.archivo);
      if (fs.existsSync(pathArchivo)) {
        fs.unlinkSync(pathArchivo);
      }
    }
    guia = await Guia.findByIdAndUpdate(id, { archivo: archivo });
    res.json({ archivo });
  } catch (error) {
    res.status(400).json({ error, general: "Controlador" });
  }
};

export const mostrarArchivo = async (req, res) => {
  const { id } = req.params;
  try {
    let guia = await Guia.findById(id);
    if (guia.archivo) {
      const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
      const pathArchivo = path.join(__dirname, "../uploads/", guia.archivo);
      if (fs.existsSync(pathArchivo)) {
        const extension = path.extname(guia.archivo).toLowerCase();
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

export const postGuiaEvaluacion = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });

  try {
    const { id } = req.params;
    const { nombre, estado } = req.body;
    const { archivo } = req.files;

    const buscarGuia= await Guia.findById(id).populate('evaluacion')
    if(buscarGuia&& buscarGuia.evaluacion){
      for(let i = 0; i<buscarGuia.evaluacion.length; i++){
        if(buscarGuia.evaluacion[i].nombre===nombre){
          return res.status(404).json({msg:`Se encontro un Instrumento de Evaluación registrado con ese Nombre`}) 
        }
      }
    };
    

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
      // const guia = await Guia.findById(id).populate("evaluacion");
      // if (guia.evaluacion === null || guia.evaluacion === undefined) {
        const nuevoEvaluacion = new Evaluacion({
          nombre: nombre,
          estado: estado,
          archivo: result.url,
          estado: estado,
        });
        await nuevoEvaluacion.save();
        const EvaluacionAgregado = await Guia.updateOne(
          { _id: id },
          { $addToSet: { evaluacion: nuevoEvaluacion } }
        );
        if (EvaluacionAgregado.modifiedCount !== 0) {
          return res.json({
            EvaluacionAgregado,
            msj: "Instrumento de Evaluación agregado correctamente ✅",
          });
        }
      // } else {
      //   return res
      //     .status(404)
      //     .json({
      //       msg: "Ya existe un instrumento de evaluacion ligado a este programa",
      //     });
      // }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const postGuiaMaterial = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });

  try {
    const { id } = req.params;
    const { nombre, estado } = req.body;
    const { archivo } = req.files;

    const buscarGuia= await Guia.findById(id).populate('material');
    if(buscarGuia&& buscarGuia.material){
      for(let i = 0; i<buscarGuia.material.length; i++){
        if(buscarGuia.evaluacion[i].nombre===nombre){
          return res.status(404).json({msg:`Se encontro un Material de Apoyo registrado con ese Nombre`}) 
        }
      }
    };

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
      // const guia = await Guia.findById(id).populate("material");
      // if (guia.material === null || guia.material === undefined) {
        const nuevoMaterial = new Material({
          nombre: nombre,
          archivo: result.url,
          estado: estado,
        });
        await nuevoMaterial.save();
        const MaterialAgregado = await Guia.updateOne(
          { _id: id },
          {$addToSet:{ material: nuevoMaterial }}
        );
        if (MaterialAgregado.modifiedCount !== 0) {
          return res.json({
            MaterialAgregado,
            msj: "Material de apoyo agregado correctamente ✅",
          });
        }
      // } else {
      //   return res
      //     .status(404)
      //     .json({
      //       msg: "Ya existe un Material de apoyo ligado a este programa",
      //     });
      // }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getGuia = async (req, res) => {
  try {
    const buscar = await Guia.find()
      .populate("evaluacion")
      .populate("material");
    res.json({ buscar });
  } catch (error) {
    res.status(500).json({ msg: "No se puede buscar los Guias" });
  }
};

export const getGuiaCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const guia = await Guia.find();
    const resultados = guia.filter((objeto) =>
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

export const getGuiaId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const guia = await Guia.findById({ _id: id })
      .populate("evaluacion")
      .populate("material");
    if (guia) {
      res.json(guia);
    } else {
      return res.status(404).json({ msg: `Sin coincidencias para ${id}` });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

export const putGuia = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });

  try {
    const { id } = req.params;
    const { codigo, nombre, fase, evaluacion, material } = req.body;

    const buscarCodigo = await Guia.findOne({ codigo: codigo, fase:fase });
    if (
      buscarCodigo && 
      buscarCodigo._id.toString() !== id
    ) {
      return res
        .status(404)
        .json({ msg: "Ya se encuentra una Guia registrada con ese codigo" });
    }

    let updatedData = {
      codigo: codigo,
      nombre: nombre,
      fase: fase,
      evaluacion: evaluacion,
      material: material,
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

      const buscar = await Guia.findById(id);
      if (buscar.archivo) {
        const nombreTemp = buscar.archivo.split("/");
        const nombrearchivo = nombreTemp[nombreTemp.length - 1];
        const [public_id] = nombrearchivo.split(".");
        await cloudinary.uploader.destroy(public_id);
      }

      updatedData.archivo = result.url;
    }

    const buscarGuia = await Guia.findByIdAndUpdate(
      { _id: id },
      { $set: updatedData },
      { new: true }
    );
    res.status(201).json(buscarGuia);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const patchGuia = async (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;
  try {
    const guia = await Guia.findById(id);
    if (guia) {
      guia.estado = estado;
      await guia.save();
      res.json(guia);
    } else {
      console.log(`id: ${id} no encontrado`);
      res.status(404).json({ msg: `guia con id: ${id} no encontrado` });
    }
  } catch (error) {
    console.log(`Error al actualizar el guia: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteGuia = async (req, res) => {
  const { id } = req.params;
  const GuiaEliminado = await Guia.findOneAndDelete({ _id: id });

  if (GuiaEliminado) {
    return res.json({
      msg: `Se eliminó el Guia: ${id} de la base de datos`,
    });
  } else {
    res
      .status(400)
      .json({ msg: `El Guia: ${id} no se encuentra en la base de datos` });
  }
};
