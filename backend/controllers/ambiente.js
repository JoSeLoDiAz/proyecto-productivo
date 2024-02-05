import Ambiente from "../models/ambiente.js";
import dotenv from "dotenv";
dotenv.config();

export const postAmbiente = async (req, res) => {
  const nuevoAmbiente = new Ambiente(req.body);
  const buscarNombre = await Ambiente.findOne({nombre:nuevoAmbiente.nombre});
  const buscarSede = await Ambiente.findOne({sede:nuevoAmbiente.sede})
  if(buscarNombre&&buscarSede){
    return res.status(404).json({msg:`El ambiente ${nuevoAmbiente.nombre} ya se encuentra registrado en esta sede`})
  }else{
    const ambienteCreado = await nuevoAmbiente.save();
    res.status(201).json(ambienteCreado);
  }
};

export const getAmbiente = async (req, res) => {
  try {
    const buscar = await Ambiente.find()
    .populate("sede")
    res.json({ buscar });
  } catch (error) {
    res.status(500).json({ msg: "No se puede buscar los ambientes" });
  }
};

export const getAmbienteNombre = async (req, res) => {
  try {
    const { nombre } = req.params;
    const ambiente = await Ambiente.find();
  const resultados = ambiente.filter(objeto => objeto.nombre.toString().startsWith(nombre));
  console.log(resultados);
  if(resultados){
    res.json(resultados);
  }else{
    return res.status(404).json({ msg: `Sin coincidencias para ${nombre}` });
  }
  } catch (error) {
    return res.status(400).json({ error });
  }
}

export const putAmbiente = async (req, res) => {
  try {
    const { id } = req.params;
    const buscarNombre = await Ambiente.findOne({nombre:req.body.nombre})
    if (buscarNombre && buscarNombre._id.toString() !== id) {
      return res
        .status(404)
        .json({ msg: "Ya se encuentraun Ambiente registrado con ese codigo" });
    };
    const ambienteActualizado = await Ambiente.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      {
        new: true,
      });
    if (ambienteActualizado !== null) {
      res.status(200).json(ambienteActualizado);
    } else {
      return res.status(404).json({ msg: `Ambiente no encontrado.` });
    }
  } catch (error) {
    res.status(500).json({ error: "No se pudo actualizar el ambiente." });
  }
};

export const patchAmbiente = async (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;
  try {
    const ambiente = await Ambiente.findById(id);
    if (ambiente) {
      ambiente.estado = estado;
      await ambiente.save();
      res.json(ambiente);
    } else {
      console.log(`id: ${id} no encontrado`);
      res.status(404).json({ msg: `ambiente con id: ${id} no encontrado` });
    }
  } catch (error) {
    console.log(`Error al actualizar el ambiente: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export const deleteAmbiente = async (req, res) => {
  const { id } = req.params;
  const ambienteEliminado = await Ambiente.findOneAndDelete({ _id: id });

  if (ambienteEliminado) {
    return res.json({
      msg: `Se eliminó el ambiente: ${id} de la base de datos`,
    });
  } else {
    res
      .status(400)
      .json({ msg: `El ambiente: ${id} no se encuentra en la base de datos` });
  }
};
