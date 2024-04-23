import jwt from "jsonwebtoken";
import Role from "../models/role.js";

export const isAdmin = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  try {
    if (!authHeader) {
      return res.status(403).json({ msg: "Acceso no autorizado" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = decoded;

    if (user.role === "Administrador") {
      next();
    } else {
      return res
        .status(403)
        .json({ msg: "Solo el administrador puede realizar esta acción" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Acceso no autorizado" });
  }
};

export const isGestor = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(403).json({ msg: "Acceso no autorizado" });
  } else {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = decoded;
      const searchRole = await Role.findOne({ _id: user.rol });
      if (user && searchRole.denomination === "Gestor de red") {
        next();
      } else {
        res.status(403).json({ msg: "Acceso no autorizado" });
      }
    } catch (error) {
      res.status(403).json({ msg: "Acceso no autorizado" });
    }
  }
};

export const isInstructor = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(403).json({ msg: "Acceso no autorizado" });
  } else {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = decoded;
      const searchRole = await Role.findOne({ _id: user.role });
      if (user && searchRole.denomination === "Instructor") {
        next();
      } else {
        res.status(403).json({ msg: "Acceso no autorizado" });
      }
    } catch (error) {
      res.status(403).json({ msg: "Acceso no autorizado" });
    }
  }
};
