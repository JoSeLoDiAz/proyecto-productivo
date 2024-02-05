import MaterialFormacion from "../models/materialFormacion.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();

export const postMaterialFormacion = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });
  try {
    const { nombre,tipo, descripcion, estado } =
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
      const buscar = await MaterialFormacion.findOne({ nombre: nombre });
      if (buscar) {
        return res
          .status(400)
          .json({ msg: `Ya existe un Material de Formación con el nombre ${nombre}` });
      } else {
        const nuevoMaterialFormacion = new MaterialFormacion({
          nombre: nombre,
          tipo: tipo,
          descripcion: descripcion,
          archivo: result.url,
          estado: estado,
        });
        const MaterialFormacionCreado = await nuevoMaterialFormacion.save();
        res.status(201).json(MaterialFormacionCreado);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getMaterialFormacion = async (req, res) => {
  try {
    const buscar = await MaterialFormacion.find();
    res.json({ buscar });
  } catch (error) {
    res.status(500).json({ msg: "No se puede buscar los Materiales de formación" });
  }
};

export const getMaterialFormacionCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const materialFormacion = await MaterialFormacion.find()
    const resultados = materialFormacion.filter((objeto) =>
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

export const putMaterialFormacion = async (req, res) => {
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
      tipo,
      descripcion
    } = req.body;

    const buscarNombre = await MaterialFormacion.findOne({ nombre: nombre });
    if (buscarNombre && buscarNombre._id.toString() !== id) {
      return res.status(404).json({
        msg: "Ya se encuentra un Material  de formación registrado con ese Nombre",
      });
    }

    let updatedData = {
      nombre: nombre,
      tipo: tipo,
      descripcion: descripcion,
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

      const buscarId = await MaterialFormacion.findById(id);

      if (buscarId.archivo) {
        const nombreTemp = buscarId.archivo.split("/");
        const nombrearchivo = nombreTemp[nombreTemp.length - 1];
        const [public_id] = nombrearchivo.split(".");
        await cloudinary.uploader.destroy(public_id);
      }

      updatedData.archivo = result.url;
    }

    const buscarMaterialFormacion = await MaterialFormacion.findByIdAndUpdate(
      { _id: id },
      { $set: updatedData },
      { new: true }
    );
    res.status(201).json(buscarMaterialFormacion);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const patchMaterialFormacion = async (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;
  try {
    const materialFormacion = await MaterialFormacion.findById(id);
    if (materialFormacion) {
      materialFormacion.estado = estado;
      await materialFormacion.save();
      res.json(materialFormacion);
    } else {
      res.status(404).json({ msg: `Material de formación con id: ${id} no encontrado` });
    }
  } catch (error) {
    console.log(`Error al actualizar el Material de formacion: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteMaterialFormacion = async (req, res) => {
  const { id } = req.params;
  const MaterialFormacionEliminado = await MaterialFormacion.findOneAndDelete({ _id: id });

  if (MaterialFormacionEliminado) {
    return res.json({
      msg: `Se eliminó el Material de Formación: ${id} de la base de datos`,
    });
  } else {
    res
      .status(400)
      .json({ msg: `El Material de Formación: ${id} no se encuentra en la base de datos` });
  }
};