import Grade from "../models/grade.js";
import dotenv from "dotenv";
dotenv.config();

export const postGrade = async (req, res) => {
  const newGrade = new Grade(req.body);
  const search = await Grade.findOne({ name: newGrade.name });
  if (search) {
    return res
      .status(400)
      .json({ msg: `Se encontro un Nivel de Grado registrado con ese codigo` });
  } else {
    const gradeCreated = await newGrade.save();
    res.status(201).json(gradeCreated);
  }
};

export const getGrade = async (req, res) => {
  try {
    const search = await Grade.find();
    res.json({ search });
  } catch (error) {
    res.status(500).json({ msg: "No se puede buscar los Niveles de Grado" });
  }
};

export const getGradeCode = async (req, res) => {
  try {
    const { code } = req.params;
    const nivel = await Nivel.find();
  const results = nivel.filter(object => object.code.toString().startsWith(code));
  console.log(results);
  if(results){
    res.json(results);
  }else{
    return res.status(404).json({ msg: `Sin coincidencias para ${code}` });
  }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const putGrade = async (req, res) => {
  try {
    const { id } = req.params;
    const search = await Grade.findOne({ name: req.body.name });
    if (search && search._id.toString() !== id) {
      return res
        .status(404)
        .json({
          msg: "Ya se encuentra un Nivel de Grado registrado con ese Nombre",
        });
    };
    const gradeUpdated = await Nivel.findByIdAndUpdate({_id:id}, {$set:req.body}, {
      new: true,
    });
    if (gradeUpdated !== null) {
      res.status(200).json(gradeUpdated);
    } else {
      return res.status(404).json({ msg: `Nivel de Grado no encontrado.` });
    }
  } catch (error) {
    res.status(500).json({ error: "No se pudo actualizar el Nivel de Grado." });
  }
};

export const patchGrade = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    const grade = await Grade.findById(id);
    if (grade) {
      grade.status = status;
      await grade.save();
      res.json(grade);
    } else {
      console.log(`id: ${id} no encontrado`);
      res.status(404).json({ msg: `nivel de grado con id: ${id} no encontrado` });
    }
  } catch (error) {
    console.log(`Error al actualizar el Grado: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export const deleteGrade = async (req, res) => {
  const { id } = req.params;
  const gradeDeleted = await Grade.findOneAndDelete({ _id: id });

  if (gradeDeleted) {
    return res.json({
      msg: `El Grado: ${id} ha siso eliminado de la base de datos`,
    });
  } else {
    res
      .status(400)
      .json({ msg: `El Grado: ${id} no se encuentra en la base de datos` });
  }
};
