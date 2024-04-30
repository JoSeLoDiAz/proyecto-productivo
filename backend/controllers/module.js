import Module from "../models/module.js";
import dotenv from "dotenv";
dotenv.config();

export const postModules = async (req, res) => {
  const newModule = new Module(req.body);
  const search = await Module.findOne({
    name: newModule.name,
    campus: newModule.campus,
  });
  if (search) {
    return res
      .status(400)
      .json({ msg: `Se encontro un Modulo registrado con ese Nombre` });
  } else {
    const createdModule = await newModule.save();
    res.status(201).json(createdModule);
  }
};

export const getModules = async (req, res) => {
  try {
    const search = await Module.find();
    res.json({ search });
  } catch (error) {
    res.status(500).json({ msg: "No se puede buscar los Modulos" });
  }
};

export const getModulesCode = async (req, res) => {
  try {
    const { code } = req.params;
    const modules = await Module.find();
    const results = modules.filter((object) =>
      object.code.toString().startsWith(code)
    );
    console.log(results);
    if (results) {
      res.json(results);
    } else {
      return res.status(404).json({ msg: `Sin coincidencias para ${code}` });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const putModules = async (req, res) => {
  try {
    const { id } = req.params;

    const searchName = await Module.findOne({ name: req.body.name });
    if (searchName && searchName._id.toString() !== id) {
      return res.status(404).json({
        msg: "Ya se encuentra un Modulo registrado con ese Nombre",
      });
    }

    const updatedModule = await Module.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      {
        new: true,
      }
    );
    if (updatedModule !== null) {
      res.status(200).json(updatedModule);
    } else {
      return res.status(404).json({ msg: `Modulo no encontrado.` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo actualizar el Modulo." });
  }
};

export const patchModules = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    const module = await Module.findById(id);
    if (module) {
      module.status = status;
      await module.save();
      res.json(module);
    } else {
      console.log(`Modulo id: ${id} no encontrado`);
      res.status(404).json({ msg: `Modulo con id: ${id} no encontrado` });
    }
  } catch (error) {
    console.log(`Error al actualizar el Modulo: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteModules = async (req, res) => {
  const { id } = req.params;
  const deletedModule = await Module.findOneAndDelete({ _id: id });

  if (deletedModule) {
    return res.json({
      msg: `Se eliminó el Modulo: ${id} de la base de datos`,
    });
  } else {
    res
      .status(400)
      .json({ msg: `El Modulo: ${id} no se encuentra en la base de datos` });
  }
};
