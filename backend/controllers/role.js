import Role from "../models/role.js";
import dotenv from "dotenv";
dotenv.config();

export const postRole = async (req, res) => {
  const newRole = new Role(req.body);
  const search = await Role.findOne({ denomination: newRole.denomination });
  if (search) {
    return res
      .status(400)
      .json({ msg: `Se encontro un Rol registrado con ese Nombre` });
  } else {
    const roleCreated = await newRole.save();
    res.status(201).json(roleCreated);
  }
};

export const getRole = async (req, res) => {
  try {
    const search = await Role.find();
    res.json({ search });
  } catch (error) {
    res.status(500).json({ msg: "No se puede search los Roles" });
  }
};

export const getRoleCode = async (req, res) => {
  try {
    const { code } = req.params;
    const Role = await Role.find();
    const results = Role.filter((objeto) =>
      objeto.code.toString().startsWith(code)
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

export const getRoleId = async (req, res) => {
  try {
    const { id } = req.params;
    const Role = await Role.findById({ _id: id });
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
    const searchName = await Role.findOne({
      denomination: req.body.denomination,
    });
    if (searchName && searchName._id.toString() !== id) {
      return res.status(404).json({
        msg: "Ya se encuentra un Rol registrado con ese Nombre",
      });
    }
    const roleUpdated = await Role.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      {
        new: true,
      }
    );
    if (roleUpdated !== null) {
      res.status(200).json(roleUpdated);
    } else {
      return res.status(404).json({ msg: `Rol no encontrado.` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo actualizar el Rol." });
  }
};

export const patchRole = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    const Role = await Role.findById(id);
    if (Role) {
      Role.status = status;
      await Role.save();
      res.json(Role);
    } else {
      console.log(`id: ${id} no encontrado`);
      res.status(404).json({ msg: `Rol con id: ${id} no encontrado` });
    }
  } catch (error) {
    console.log(`Error al actualizar el Rol: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteRole = async (req, res) => {
  const { id } = req.params;
  const roleDeleted = await Role.findOneAndDelete({ _id: id });

  if (roleDeleted) {
    return res.json({
      msg: `Se eliminó el Rol: ${id} de la base de datos`,
    });
  } else {
    res
      .status(400)
      .json({ msg: `El Rol: ${id} no se encuentra en la base de datos` });
  }
};
