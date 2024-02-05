import Configuracion from "../models/configuracion.js";
import dotenv from "dotenv";
dotenv.config();

export const postConfiguracion = async (req, res) => {
  try {
    const nuevaConfiguracion = new Configuracion(req.body);
    const configuracionCreada = await nuevaConfiguracion.save();
    res.status(201).json(configuracionCreada);
  } catch (error) {
    res.status(500).json({ error: "No se pudo crear la config." });
  }
};

export const getConfiguracion = async (req, res) => {
  try {
    const buscar = await Configuracion.find();
    res.json({ buscar });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo traer la configuracion." });
  }
};

export const putConfiguracion = async (req, res) => {
  const id = req.params.id;

  console.log(`aqui en controll ${id}`);

  const actualizado = {
    colorletra: req.body.colorletra,
    colormenu: req.body.colormenu,
    colortres: req.body.colortres,
    colorcuatro: req.body.colorcuatro
  };
  try {
    const coloractualizado = await Configuracion.findByIdAndUpdate(
      id,
      actualizado
    );
    if (coloractualizado) {
      res.status(200).json(coloractualizado);
    } else {
      res.status(404).json({ error: "Configuracion no encontrada." });
    }
  } catch (error) {
    res.status(500).json({ error: "No se pudo actualizar la configuracion." });
  }
};
