import Programa from "../models/programa.js";
import Desarrollo from "../models/desarrollo.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();

export const postPrograma = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });
  try {
    const {
      codigo,
      nombre,
      modalidad,
      requisitos,
      version,
      estado,
      nivel,
      red,
    } = req.body;

    const buscar = await Programa.findOne({ codigo: codigo, red: red });

    if (buscar) {
      return res.status(404).json({
        msg: `Se encontró un programa con el Codigo ${codigo} en esta red`,
      });
    }

    const { disenoCurricular } = req.files;
    if (disenoCurricular) {
      const extension = disenoCurricular.name.split(".").pop();
      const { tempFilePath } = disenoCurricular;
      const result = await cloudinary.uploader.upload(tempFilePath, {
        width: 250,
        crop: "limit",
        resource_type: "raw",
        allowedFormats: ["jpg", "png", "docx", "xlsx", "pptx", "pdf"],
        format: extension,
      });

      const nuevoPrograma = new Programa({
        codigo: codigo,
        nombre: nombre,
        modalidad: modalidad,
        disenoCurricular: result.url,
        requisitos: requisitos,
        version: version,
        estado: estado,
        nivel: nivel,
        red: red,
      });
      await nuevoPrograma.save();
      res.setHeader('Content-Disposition', `attachment; filename="${result.url}"`);
      res.setHeader('Content-Type', 'application/octet-stream');
      return res.json(nuevoPrograma);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const postRegistroCalificado = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, lugar, fecha, metodologia, creditos, snies } = req.body;

    const nuevoRegistro = {
      titulo: titulo,
      lugar: lugar,
      fecha: fecha,
      metodologia: metodologia,
      creditos: creditos,
      snies: snies,
    };

    let buscar = await Programa.findById(id).populate("nivel");

    let nivel = "tecnologo";

    if (buscar.nivel.denominacion.toLowerCase() !== nivel) {
      return res.status(400).json({
        msg: "Solo los programas con nivel tecnologico tienen Registro Calificado",
      });
    }

    const RegistroAgregado = await Programa.updateOne(
      { _id: id },
      { registroCalificado: nuevoRegistro }
    );
    if (RegistroAgregado.modifiedCount !== 0) {
      return res.json({
        RegistroAgregado,
        msj: "Registro agregado correctamente ✅",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const postProgramaDesarrollo = async (req, res) => {
  const { id } = req.params;
  const nuevoDesarrollo = new Desarrollo(req.body);
  try {
    const programa = await Programa.findById(id).populate("desarrollo");
    if (!programa.desarrollo) {
      await nuevoDesarrollo.save();
      const DesarrolloAgregado = await Programa.updateOne(
        { _id: id },
        { desarrollo: nuevoDesarrollo._id }
      );
      if (DesarrolloAgregado.modifiedCount !== 0) {
        return res.json({
          DesarrolloAgregado,
          msj: "Desarrollo agregado correctamente ✅",
        });
      }
    } else {
      return res
        .status(404)
        .json({ msg: "Ya existe un desarrollo ligado a este programa" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const postProgramaUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario } = req.body;

    const programa = await Programa.findById(id);

    if (!programa) {
      return res.status(404).json({ msg: "Programa no encontrado" });
    }

    if (programa.usuario && programa.usuario.includes(usuario)) {
      return res
        .status(400)
        .json({ msg: "El Instructor ya se encuentra ligado a este Programa" });
    }

    const usuarioAgregado = await Programa.updateOne(
      { _id: id },
      { $addToSet: { usuario: usuario } }
    );
    if (usuarioAgregado.modifiedCount !== 0) {
      return res.json({
        usuarioAgregado,
        msj: "Instructor agregado correctamente ✅",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Hubo un error en el servidor", error: error.message });
  }
};

export const postProgramaMaterialFormacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { materialformacion } = req.body;

    const programa = await Programa.findById(id);

    if (!programa) {
      return res.status(404).json({ msg: "Programa no encontrado" });
    }

    if (
      programa.materialformacion &&
      programa.materialformacion.includes(materialformacion)
    ) {
      return res
        .status(400)
        .json({
          msg: "El Material de Formación ya se encuentra ligado a este Programa",
        });
    }

    const materialformacionAgregado = await Programa.updateOne(
      { _id: id },
      { $addToSet: { materialformacion: materialformacion } }
    );
    if (materialformacionAgregado.modifiedCount !== 0) {
      return res.json({
        materialformacionAgregado,
        msj: "Instructor agregado correctamente ✅",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Hubo un error en el servidor", error: error.message });
  }
};

export const postProgramaAmbiente = async (req, res) => {
  try {
    const { id } = req.params;
    const { ambiente } = req.body;

    const programa = await Programa.findById(id);
    console.log(programa);

    if (!programa) {
      return res.status(404).json({ msg: "Programa no encontrado" });
    }

    if (programa.ambiente) {
      if (programa.ambiente.includes(ambiente)) {
        return res
          .status(400)
          .json({ msg: "El Ambiente ya se encuentra ligado a este Programa" });
      }
    }

    const ambienteAgregado = await Programa.updateOne(
      { _id: id },
      { $addToSet: { ambiente: ambiente } }
    );
    if (ambienteAgregado.modifiedCount !== 0) {
      return res.json({
        ambienteAgregado,
        msj: "Ambiente agregado correctamente ✅",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Hubo un error en el servidor", error: error.message });
  }
};

export const getPrograma = async (req, res) => {
  try {
    const buscar = await Programa.find()
      .populate("nivel")
      .populate("red")
      .populate("desarrollo")
      .populate("usuario")
      .populate("ambiente")
      .populate("materialformacion");
    res.json({ buscar });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se puede buscar los Programas" });
  }
};

export const getProgramas = async (req, res) => {
  try {
    const { ids } = req.query;

    if (!ids) {
      return res
        .status(400)
        .json({ msg: "Debes proporcionar una lista de IDs para buscar." });
    }

    const idArray = ids.split(",").map((id) => id.trim());

    const buscar = await Programa.find({ _id: { $in: idArray } })
      .populate("nivel")
      .populate("red")
      .populate("desarrollo")
      .populate("usuario")
      .populate("ambiente")
      .populate("materialformacion");

    res.json({ buscar });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pueden buscar los Programas" });
  }
};

export const getProgramaCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const programa = await Programa.find()
      .populate("nivel")
      .populate("red")
      .populate("desarrollo")
      .populate("usuario")
      .populate("ambiente")
      .populate("materialformacion");
    const resultados = programa.filter((objeto) =>
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

export const getProgramaId = async (req, res) => {
  try {
    const { id } = req.params;
    const programa = await Programa.findById({ _id: id })
      .populate("nivel")
      .populate("red")
      .populate("desarrollo")
      .populate("usuario")
      .populate("ambiente")
      .populate("materialformacion");
    if (programa) {
      res.json(programa);
    } else {
      return res.status(404).json({ msg: `Sin coincidencias para ${id}` });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

export const putPrograma = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });

  try {
    const { id } = req.params;
    const {
      codigo,
      nombre,
      modalidad,
      requisitos,
      version,
      estado,
      nivel,
      red,
      desarrollo,
      usuario,
      ambiente,
      registroCalificado,
    } = req.body;

    const buscarCodigo = await Programa.findOne({ codigo: codigo });
    if (buscarCodigo && buscarCodigo._id.toString() !== id) {
      return res.status(404).json({
        msg: "Ya se encuentra un Programa de formación registrado con ese Codigo",
      });
    }

    let updatedData = {
      codigo: codigo,
      nombre: nombre,
      modalidad: modalidad,
      requisitos: requisitos,
      version: version,
      estado: estado,
      nivel: nivel,
      red: red,
    };

    if (req.files && req.files.disenoCurricular) {
      const disenoCurricular = req.files.disenoCurricular;
      const extension = disenoCurricular.name.split(".").pop();
      const { tempFilePath } = disenoCurricular;
      const result = await cloudinary.uploader.upload(tempFilePath, {
        width: 250,
        crop: "limit",
        resource_type: "raw",
        allowedFormats: ["jpg", "png", "docx", "xlsx", "pptx", "pdf"],
        format: extension,
      });

      const buscarId = await Programa.findById(id);

      if (buscarId.disenoCurricular) {
        const nombreTemp = buscarId.disenoCurricular.split("/");
        const nombredisenoCurricular = nombreTemp[nombreTemp.length - 1];
        const [public_id] = nombredisenoCurricular.split(".");
        await cloudinary.uploader.destroy(public_id);
      }

      updatedData.disenoCurricular = result.url;
    }

    if (req.body && req.body.desarrollo) {
      updatedData.desarrollo = desarrollo;
    }

    if (req.body && req.body.usuario) {
      updatedData.usuario = usuario;
    }

    if (req.body && req.body.ambiente) {
      updatedData.ambiente = ambiente;
    }

    if (req.body && req.body.registroCalificado) {
      updatedData.registroCalificado = registroCalificado;
    }

    const buscarPrograma = await Programa.findByIdAndUpdate(
      { _id: id },
      { $set: updatedData },
      { new: true }
    );
    res.status(201).json(buscarPrograma);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const putProgramaDiseno = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });

  try {
    const { id } = req.params;
    const { disenoCurricular } = req.files;
    if (!disenoCurricular || !disenoCurricular.tempFilePath) {
      return res.status(400).json({ error: "Archivo no proporcionado" });
    }

    const extension = disenoCurricular.name.split(".").pop();

    const { tempFilePath } = disenoCurricular;

    const result = await cloudinary.uploader.upload(tempFilePath, {
      width: 250,
      crop: "limit",
      resource_type: "raw",
      allowedFormats: ["jpg", "png", "jpeg"],
      format: extension,
    });

    let programa = await Programa.findById(id);
    if (!programa) {
      return res
        .status(404)
        .json({ error: "Programa de formación no encontrado" });
    }

    if (programa.disenoCurricular) {
      const nombreTemp = programa.disenoCurricular.split("/");
      const nombredisenoCurricular = nombreTemp[nombreTemp.length - 1];
      const [public_id] = nombredisenoCurricular.split(".");
      await cloudinary.uploader.destroy(public_id);
    }
    programa = await Programa.findByIdAndUpdate(id, {
      disenoCurricular: result.url,
    });
    res.json({ diseno: result.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const patchPrograma = async (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;
  try {
    const programa = await Programa.findById(id);
    if (programa) {
      programa.estado = estado;
      await programa.save();
      res.json(programa);
    } else {
      console.log(`id: ${id} no encontrado`);
      res.status(404).json({ msg: `programa con id: ${id} no encontrado` });
    }
  } catch (error) {
    console.log(`Error al actualizar el programa: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deletePrograma = async (req, res) => {
  const { id } = req.params;
  const ProgramaEliminado = await Programa.findOneAndDelete({ _id: id });

  if (ProgramaEliminado) {
    return res.json({
      msg: `Se eliminó el Programa: ${id} de la base de datos`,
    });
  } else {
    res
      .status(400)
      .json({ msg: `El Programa: ${id} no se encuentra en la base de datos` });
  }
};
