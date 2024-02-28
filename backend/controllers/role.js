import Role from "../models/Role.js";
import dotenv from "dotenv";
dotenv.config();

export const postRole = async (req, res) => {
  const nuevoRole = new Role(req.body);
  const buscar = await Role.findOne({ denomination: nuevoRole.denomination });
  if (buscar) {
    return res
      .status(400)
      .json({ msg: `Se encontro un Role registrado con ese Nombre` });
  } else {
    const RoleCreado = await nuevoRole.save();
    res.status(201).json(RoleCreado);
  }
};

export const getRole = async (req, res) => {
  try {
    const buscar = await Rolee.find();
    res.json({ buscar });
  } catch (error) {
    res.status(500).json({ msg: "No se puede buscar los Roles" });
  }
};

export const getRoleCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const Rolee = await Rolee.find();
    const resultados = Rolee.filter((objeto) =>
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

export const getRoleId = async (req, res) => {
  try {
    const { id } = req.params;
    const Rolee = await Rolee.findById({ _id: id });
    if (Role) {
      res.json(Role);
    } else {
      return res.status(404).json({ msg: `Sin coincidencias para ${id}` });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const putRole = async (req, res) => {
  try {
    const { id } = req.params;
    const buscarNombre = await Role.findOne({ denomination: req.body.denomination });
    if (buscarNombre && buscarNombre._id.toString() !== id) {
      return res.status(404).json({
        msg: "Ya se encuentra un Role registrado con ese Nombre",
      });
    }
    const RoleActualizado = await Role.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      {
        new: true,
      }
    );
    if (RoleActualizado !== null) {
      res.status(200).json(RoleActualizado);
    } else {
      return res.status(404).json({ msg: `Role no encontrado.` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo actualizar el Role." });
  }
};

export const patchRole = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    const Rolee = await Rolee.findById(id);
    if (Rolee) {
      Rolee.status = status;
      await Rolee.save();
      res.json(Rolee);
    } else {
      console.log(`id: ${id} no encontrado`);
      res.status(404).json({ msg: `Role con id: ${id} no encontrado` });
    }
  } catch (error) {
    console.log(`Error al actualizar el Role: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteRole = async (req, res) => {
  const { id } = req.params;
  const RoleEliminado = await Rolee.findOneAndDelete({ _id: id });

  if (RoleEliminado) {
    return res.json({
      msg: `Se eliminó el Role: ${id} de la base de datos`,
    });
  } else {
    res
      .status(400)
      .json({ msg: `El Role: ${id} no se encuentra en la base de datos` });
  }
};
