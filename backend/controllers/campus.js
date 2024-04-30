import Campus from "../models/campus.js";
import dotenv from "dotenv";
dotenv.config();

export const postCampus = async (req, res) => {
  const newCampus = new Campus(req.body);
  const search = await Campus.findOne({ code: newCampus.code });
  if (search) {
    return res
      .status(400)
      .json({ msg: `Se encontro una Sede registrade con ese codigo` });
  } else {
    const createdCampus = await newCampus.save();
    res.status(201).json(createdCampus);
  }
};

export const getCampus = async (req, res) => {
  try {
    const search = await Campus.find()
    .populate('city');
    res.json({ search });
  } catch (error) {
    res.status(500).json({ msg: "No se pueden buscar las Sedes" });
  }
};


export const getCampusCode = async (req, res) => {
  try {
    const { code } = req.params;
    const campus = await Campus.find();
    const results = campus.filter((objet) =>
      objet.code.toString().startsWith(code)
    );
    console.log(results);
    if (results) {
      res.json(results);
    } else {
      return res.status(404).json({ msg: `Sin coincidencias para la Sede ${code}` });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getCampusId  = async (req, res) => {
  try {
    const { id } = req.params;
    const campus = await Campus.findById(id);
    if(campus){
return res.json(campus);
    }else{
return res.status(404).json({msg:`Sin coincidencias para la busqueda realizada`})
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const putCampus = async (req, res) => {
  try {
    const { id } = req.params;
    const searchCode = await Campus.findOne({code:req.body.code})
    if (searchCode && searchCode._id.toString() !== id) {
      return res
        .status(404)
        .json({ msg: "Ya se encuentra una Sede registrada con ese codigo" });
    };
    const updatedCampus = await Campus.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      {
        new: true,
      }
    );
    if (updatedCampus !== null) {
      res.status(200).json(updatedCampus);
    } else {
      return res.status(404).json({ msg: `Sede no encontrada.` });
    }
  } catch (error) {
    res.status(500).json({ msg: "No se pudo actualizar la Sede." });
  }
};

export const patchCampus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    const campus = await Campus.findById(id);
    if (campus) {
      campus.status = status;
      await campus.save();
      res.json(campus);
    } else {
      console.log(`La sede con el id: ${id} no encontrada`);
      res.status(404).json({ msg: `La Sede con el id: ${id} no encontrada` });
    }
  } catch (error) {
    console.log(`Error al actualizar la Sede: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteCampus = async (req, res) => {
  const { id } = req.params;
  const deletedCampus = await Campus.findOneAndDelete({ _id: id });

  if (deletedCampus) {
    return res.json({
      msg: `Se eliminó la Sede: ${id} de la base de datos`,
    });
  } else {
    res
      .status(400)
      .json({ msg: `La Sede: ${id} no se encuentra en la base de datos` });
  }
};
