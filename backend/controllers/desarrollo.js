import Desarrollo from "../models/desarrollo.js";
import Guia from "../models/guia.js"
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();

export const postDesarrolloMatriz = async (req, res) =>{
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });

  try {
    const { id } = req.params;
    const { matriz_correlacion } = req.files;
    if (!matriz_correlacion || !matriz_correlacion.tempFilePath) {
      return res.status(400).json({ error: "Archivo no proporcionado" });
    }

    const extension = matriz_correlacion.name.split('.').pop();

    const { tempFilePath } = matriz_correlacion;

    const result = await cloudinary.uploader.upload(tempFilePath, {
      width: 250,
      crop: "limit",
      resource_type: "raw",
      allowedFormats: ['pdf', 'docx', 'pptx'],
      format: extension,
    });

    let desarrollo = await Desarrollo.findById(id);
    if (!desarrollo) {
      return res.status(404).json({ error: "Evaluación no encontrada" });
    }

    if (desarrollo.matriz_correlacion) {
      const nombreTemp = desarrollo.matriz_correlacion.split("/");
      const nombrematriz_correlacion = nombreTemp[nombreTemp.length - 1];
      const [public_id] = nombrematriz_correlacion.split(".");
      await cloudinary.uploader.destroy(public_id);
    }
    desarrollo = await Desarrollo.findByIdAndUpdate(id, { matriz_correlacion: result.url });
    res.json({ url: result.url });
  } catch (error) {
    console.error("Error en el controlador:", error);
    res.status(500).json({ error: error.message });
  }
}

export const postDesarrolloProyecto = async (req, res) =>{
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });

  try {
    const { id } = req.params;
    const { proyecto } = req.files;
    if (!proyecto || !proyecto.tempFilePath) {
      return res.status(400).json({ error: "proyecto no proporcionado" });
    }

    const extension = proyecto.name.split('.').pop();

    const { tempFilePath } = proyecto;

    const result = await cloudinary.uploader.upload(tempFilePath, {
      width: 250,
      crop: "limit",
      resource_type: "raw",
      allowedFormats: ['jpg', 'png', 'jpeg'],
      format: extension,
    });

    let desarrollo = await Desarrollo.findById(id);
    if (!desarrollo) {
      return res.status(404).json({ error: "Evaluación no encontrada" });
    }

    if (desarrollo.proyecto) {
      const nombreTemp = desarrollo.proyecto.split("/");
      const nombreproyecto = nombreTemp[nombreTemp.length - 1];
      const [public_id] = nombreproyecto.split(".");
      await cloudinary.uploader.destroy(public_id);
    }
    desarrollo = await Desarrollo.findByIdAndUpdate(id, { proyecto: result.url });
    res.json({ url: result.url });
  } catch (error) {
    console.error("Error en el controlador:", error);
    res.status(500).json({ error: error.message });
  }
}

export const postDesarrolloPlaneacion = async (req, res) =>{
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });

  try {
    const { id } = req.params;
    const { planeacion } = req.files;
    if (!planeacion || !planeacion.tempFilePath) {
      return res.status(400).json({ error: "Archivo no proporcionado" });
    }

    const extension = planeacion.name.split('.').pop();

    const { tempFilePath } = planeacion;

    const result = await cloudinary.uploader.upload(tempFilePath, {
      width: 250,
      crop: "limit",
      resource_type: "raw",
      allowedFormats: ['jpg', 'png', 'jpeg'],
      format: extension,
    });

    let desarrollo = await Desarrollo.findById(id);
    if (!desarrollo) {
      return res.status(404).json({ error: "Evaluación no encontrada" });
    }

    if (desarrollo.planeacion) {
      const nombreTemp = desarrollo.planeacion.split("/");
      const nombreplaneacion = nombreTemp[nombreTemp.length - 1];
      const [public_id] = nombreplaneacion.split(".");
      await cloudinary.uploader.destroy(public_id);
    }
    desarrollo = await Desarrollo.findByIdAndUpdate(id, { planeacion: result.url });
    res.json({ url: result.url });
  } catch (error) {
    console.error("Error en el controlador:", error);
    res.status(500).json({ error: error.message });
  }
}

export const postDesarrollo = async (req, res) => {
  const nuevoDesarrollo = new Desarrollo(req.body);
    const DesarrolloCreado = await nuevoDesarrollo.save();
    res.status(201).json(DesarrolloCreado);
};

export const postDesarrolloGuia = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });

  try {
    const { id } = req.params;
    const { codigo, nombre, fase, estado } = req.body;
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

      const desarrollo = await Desarrollo.findById(id).populate('guia');

      let codigoDuplicado = false;

      for (let i = 0; i < desarrollo.guia.length; i++) {
        if(desarrollo.guia[i].fase===fase){
          if (desarrollo.guia[i].codigo === codigo) {
            codigoDuplicado = true;
            break;
          }
        }
        
      }

      if (codigoDuplicado) {
        return res
          .status(400)
          .json({ msg: `Se encontró un Guia registrado con ese codigo en la fase de ${fase}` });
      }
      
      const nuevoGuia = new Guia({
        codigo:codigo,
        nombre: nombre,
        fase: fase,
        archivo: result.url,
        estado: estado,
      });
      await nuevoGuia.save();

      const guiaAgregada = await Desarrollo.updateOne(
        { _id: id },
        { $addToSet: { guia: nuevoGuia._id } }
      );

      if (guiaAgregada.modifiedCount !== 0) {
        res.setHeader('Content-Disposition', `attachment; filename="${result.url}"`);
        res.setHeader('Content-Type', 'application/octet-stream');
        return res.json({ guiaAgregada, msj: "Guia agregada correctamente ✅" });
      } else {
        return res
          .status(400)
          .json({ msg: `Error al crear la Guia` });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const mostrarArchivoMatriz = async (req, res) => {
  const { id } = req.params;
  try {
    let desarrollo = await Desarrollo.findById(id);
    if (desarrollo.matriz_correlacion) {
      return res.json({ url: desarrollo.matriz_correlacion });
    }
    res.status(400).json({ msg: "Falta el Archivo" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const mostrarArchivoProyecto = async (req, res) => {
  const { id } = req.params;
  try {
    let desarrollo = await Desarrollo.findById(id);
    if (desarrollo.proyecto) {
      return res.json({ url: desarrollo.proyecto });
    }
    res.status(400).json({ msg: "Falta el Archivo" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const mostrarArchivoPlaneacion = async (req, res) => {
  const { id } = req.params;
  try {
    let desarrollo = await Desarrollo.findById(id);
    if (desarrollo.planeacion) {
      return res.json({ url: desarrollo.planeacion });
    }
    res.status(400).json({ msg: "Falta el Archivo" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getDesarrollo = async (req, res) => {
  try {
    const buscar = await Desarrollo.find()
    .populate('guia')
    res.json({buscar});
  } catch (error) {
    res.status(500).json({ msg: "No se puede buscar los Desarrollos" });
  }
};

export const getDesarrolloCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const desarrollo = await Desarrollo.find();
    const resultados = desarrollo.filter((objeto) =>
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

export const getDesarrolloId = async (req, res) => {
  try {
    const { id } = req.params;
    const desarrollo = await Desarrollo.findById({_id:id})
    .populate('guia')
  if(desarrollo){
    res.json(desarrollo);
  }else{
    return res.status(404).json({ msg: `Sin coincidencias para ${id}` });
  }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

export const putDesarrollo = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const { matriz_correlacion, proyecto, planeacion } = req.files;

    let resultMatriz;
    let resultProyecto;
    let resultPlaneacion;

    if (matriz_correlacion) {
      const extension = matriz_correlacion.name.split(".").pop();
      const { tempFilePath } = matriz_correlacion;
      resultMatriz = await cloudinary.uploader.upload(tempFilePath, {
        width: 250,
        crop: "limit",
        resource_type: "raw",
        allowedFormats: ["jpg", "png", "docx", "xlsx", "pptx", "pdf"],
        format: extension,
      });
    }

    if (proyecto) {
      const extension = proyecto.name.split(".").pop();
      const { tempFilePath } = proyecto;
      resultProyecto = await cloudinary.uploader.upload(tempFilePath, {
        width: 250,
        crop: "limit",
        resource_type: "raw",
        allowedFormats: ["jpg", "png", "docx", "xlsx", "pptx", "pdf"],
        format: extension,
      });
    }

    if (planeacion) {
      const extension = planeacion.name.split(".").pop();
      const { tempFilePath } = planeacion;
      resultPlaneacion = await cloudinary.uploader.upload(tempFilePath, {
        width: 250,
        crop: "limit",
        resource_type: "raw",
        allowedFormats: ["jpg", "png", "docx", "xlsx", "pptx", "pdf"],
        format: extension,
      });
    }

    if (!resultMatriz || !resultProyecto || !resultPlaneacion) {
      return res.status(400).json({ msg: "Falta uno o más archivos" });
    }

    const buscar = await Desarrollo.findById(id);
    if (buscar.matriz_correlacion) {
      const nombreTemp = buscar.matriz_correlacion.split("/");
      const nombrematriz_correlacion = nombreTemp[nombreTemp.length - 1];
      const [public_id] = nombrematriz_correlacion.split(".");
      await cloudinary.uploader.destroy(public_id);
    }

    if (buscar.proyecto) {
      const nombreTemp = buscar.proyecto.split("/");
      const nombreproyecto = nombreTemp[nombreTemp.length - 1];
      const [public_id] = nombreproyecto.split(".");
      await cloudinary.uploader.destroy(public_id);
    }

    if (buscar.planeacion) {
      const nombreTemp = buscar.planeacion.split("/");
      const nombreplaneacion = nombreTemp[nombreTemp.length - 1];
      const [public_id] = nombreplaneacion.split(".");
      await cloudinary.uploader.destroy(public_id);
    }

    const buscarPrograma = await Programa.findByIdAndUpdate(id, {
      codigo: codigo,
      matriz_correlacion: resultMatriz.url,
      proyecto: resultProyecto.url,
      planeacion: resultPlaneacion.url,
      estado: estado,
    });

    res.status(201).json(buscarPrograma);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const patchDesarrollo = async (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;
  try {
    const desarrollo = await Desarrollo.findById(id);
    if (desarrollo) {
      desarrollo.estado = estado;
      await desarrollo.save();
      res.json(desarrollo);
    } else {
      console.log(`id: ${id} no encontrado`);
      res.status(404).json({ msg: `desarrollo con id: ${id} no encontrado` });
    }
  } catch (error) {
    console.log(`Error al actualizar el desarrollo: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteDesarrollo = async (req, res) => {
  const { id } = req.params;
  const DesarrolloEliminado = await Desarrollo.findOneAndDelete({ _id: id });

  if (DesarrolloEliminado) {
    return res.json({
      msg: `Se eliminó el Desarrollo: ${id} de la base de datos`,
    });
  } else {
    res
      .status(400)
      .json({
        msg: `El Desarrollo: ${id} no se encuentra en la base de datos`,
      });
  }
};
