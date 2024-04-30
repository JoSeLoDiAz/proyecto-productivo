import Classroom from "../models/classroom.js";
import dotenv from "dotenv";
dotenv.config();

export const postClassroom = async (req, res) => {
  const newClassroom = new Classroom(req.body);
  const searchName = await Classroom.findOne({ name: newClassroom.name });
  const searchModule = await Classroom.findOne({ module: newClassroom.module });
  if (searchName && searchModule) {
    return res
      .status(404)
      .json({
        msg: `El Aula ${newClassroom.name} ya se encuentra registrado en el Modulo ${newClassroom.module}`,
      });
  } else {
    const classroomCreated = await newClassroom.save();
    res.status(201).json(classroomCreated);
  }
};

export const getClassroom = async (req, res) => {
  try {
    const search = await Classroom.find().populate("module");
    res.json({ search });
  } catch (error) {
    res.status(500).json({ msg: "No se puede buscar las Aulas" });
  }
};

export const getClassroomName = async (req, res) => {
  try {
    const { name } = req.params;
    const classroom = await Classroom.find();
    const resultados = classroom.filter((object) =>
      object.name.toString().startsWith(name)
    );
    console.log(results);
    if (results) {
      res.json(results);
    } else {
      return res.status(404).json({ msg: `Sin coincidencias para ${name}` });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const putClassroom = async (req, res) => {
  try {
    const { id } = req.params;
    const searchName = await Classroom.findOne({ name: req.body.name });
    if (searchName && searchName._id.toString() !== id) {
      return res
        .status(404)
        .json({ msg: "Ya se encuentra un Aula registrada con ese codigo" });
    }
    const classroomUpdated = await Classroom.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      {
        new: true,
      }
    );
    if (classroomUpdated !== null) {
      res.status(200).json(classroomUpdated);
    } else {
      return res.status(404).json({ msg: `Aula no encontrada.` });
    }
  } catch (error) {
    res.status(500).json({ error: "No se pudo actualizar el Aula." });
  }
};

export const patchClassroom = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    const classroom = await Classroom.findById(id);
    if (classroom) {
      classroom.status = status;
      await classroom.save();
      res.json(classroom);
    } else {
      console.log(`Id: ${id} no encontrado`);
      res.status(404).json({ msg: `Aula con id: ${id} no encontrado` });
    }
  } catch (error) {
    console.log(`Error al actualizar el Aula: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteClassroom = async (req, res) => {
  const { id } = req.params;
  const classroomDeleted = await Classroom.findOneAndDelete({ _id: id });

  if (classroomDeleted) {
    return res.json({
      msg: `Se eliminó el Aula: ${id} de la base de datos`,
    });
  } else {
    res
      .status(400)
      .json({ msg: `El Aula: ${id} no se encuentra en la base de datos` });
  }
};
