import Rol from "../models/rol.js";
import dotenv from "dotenv";
dotenv.config();

export const postRol = async (req, res) => {
  const nuevoRol = new Rol(req.body);
  const buscar = await Rol.findOne({ denominacion: nuevoRol.denominacion });
  if (buscar) {
    return res
      .status(400)
      .json({ msg: `Se encontro un Rol registrado con ese Nombre` });
  } else {
    const RolCreado = await nuevoRol.save();
    res.status(201).json(RolCreado);
  }
};

export const getRol = async (req, res) => {
  try {
    const buscar = await Rol.find();
    res.json({ buscar });
  } catch (error) {
    res.status(500).json({ msg: "No se puede buscar los Rols" });
  }
};

export const getRolCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const rol = await Rol.find();
    const resultados = rol.filter((objeto) =>
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

export const getRolId = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await Rol.findById({ _id: id });
    if (rol) {
      res.json(rol);
    } else {
      return res.status(404).json({ msg: `Sin coincidencias para ${id}` });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const putRol = async (req, res) => {
  try {
    const { id } = req.params;
    const buscarNombre = await Rol.findOne({ denominacion: req.body.denominacion });
    if (buscarNombre && buscarNombre._id.toString() !== id) {
      return res.status(404).json({
        msg: "Ya se encuentra un Rol registrado con ese Nombre",
      });
    }
    const RolActualizado = await Rol.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      {
        new: true,
      }
    );
    if (RolActualizado !== null) {
      res.status(200).json(RolActualizado);
    } else {
      return res.status(404).json({ msg: `Rol no encontrado.` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo actualizar el Rol." });
  }
};

export const patchRol = async (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;
  try {
    const rol = await Rol.findById(id);
    if (rol) {
      rol.estado = estado;
      await rol.save();
      res.json(rol);
    } else {
      console.log(`id: ${id} no encontrado`);
      res.status(404).json({ msg: `rol con id: ${id} no encontrado` });
    }
  } catch (error) {
    console.log(`Error al actualizar el rol: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteRol = async (req, res) => {
  const { id } = req.params;
  const RolEliminado = await Rol.findOneAndDelete({ _id: id });

  if (RolEliminado) {
    return res.json({
      msg: `Se eliminó el Rol: ${id} de la base de datos`,
    });
  } else {
    res
      .status(400)
      .json({ msg: `El Rol: ${id} no se encuentra en la base de datos` });
  }
};
