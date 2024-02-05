import Sedes from "../models/sedes.js";
import dotenv from "dotenv";
dotenv.config();

export const postSedes = async (req, res) => {
  const nuevoSedes = new Sedes(req.body);
  const buscar = await Sedes.findOne({ nombre: nuevoSedes.nombre, centro: nuevoSedes.centro });
  if (buscar) {
    return res
      .status(400)
      .json({ msg: `Se encontro un Sedes registrado con ese Nombre` });
  } else {
    const SedesCreado = await nuevoSedes.save();
    res.status(201).json(SedesCreado);
  }
};

export const getSedes = async (req, res) => {
  try {
    const buscar = await Sedes.find();
    res.json({ buscar });
  } catch (error) {
    res.status(500).json({ msg: "No se puede buscar los Sedess" });
  }
};

export const getSedesCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const sedes = await Sedes.find();
    const resultados = sedes.filter((objeto) =>
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

export const putSedes = async (req, res) => {
  try {
    const { id } = req.params;
    
    const buscarNombre = await Sedes.findOne({ nombre: req.body.nombre });
    if (buscarNombre && buscarNombre._id.toString() !== id) {
      return res.status(404).json({
        msg: "Ya se encuentra una Sede registrada con ese Nombre",
      });
    }

    const SedesActualizado = await Sedes.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      {
        new: true,
      }
    );
    if (SedesActualizado !== null) {
      res.status(200).json(SedesActualizado);
    } else {
      return res.status(404).json({ msg: `Sedes no encontrado.` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo actualizar el Sedes." });
  }
};

export const patchSedes = async (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;
  try {
    const sedes = await Sedes.findById(id);
    if (sedes) {
      sedes.estado = estado;
      await sedes.save();
      res.json(sedes);
    } else {
      console.log(`id: ${id} no encontrado`);
      res.status(404).json({ msg: `sedes con id: ${id} no encontrado` });
    }
  } catch (error) {
    console.log(`Error al actualizar el sedes: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteSedes = async (req, res) => {
  const { id } = req.params;
  const SedesEliminado = await Sedes.findOneAndDelete({ _id: id });

  if (SedesEliminado) {
    return res.json({
      msg: `Se eliminó el Sedes: ${id} de la base de datos`,
    });
  } else {
    res
      .status(400)
      .json({ msg: `El Sedes: ${id} no se encuentra en la base de datos` });
  }
};
