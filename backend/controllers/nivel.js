import Nivel from "../models/nivel.js";
import dotenv from "dotenv";
dotenv.config();

export const postNivel = async (req, res) => {
  const nuevoNivel = new Nivel(req.body);
  const buscar = await Nivel.findOne({ denominacion: nuevoNivel.denominacion });
  if (buscar) {
    return res
      .status(400)
      .json({ msg: `Se encontro un Nivel registrado con ese codigo` });
  } else {
    const NivelCreado = await nuevoNivel.save();
    res.status(201).json(NivelCreado);
  }
};

export const getNivel = async (req, res) => {
  try {
    const buscar = await Nivel.find();
    res.json({ buscar });
  } catch (error) {
    res.status(500).json({ msg: "No se puede buscar los Nivels" });
  }
};

export const getNivelCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const nivel = await Nivel.find();
  const resultados = nivel.filter(objeto => objeto.codigo.toString().startsWith(codigo));
  console.log(resultados);
  if(resultados){
    res.json(resultados);
  }else{
    return res.status(404).json({ msg: `Sin coincidencias para ${codigo}` });
  }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const putNivel = async (req, res) => {
  try {
    const { id } = req.params;
    const buscar = await Nivel.findOne({ denominacion: req.body.denominacion });
    if (buscar && buscar._id.toString() !== id) {
      return res
        .status(404)
        .json({
          msg: "Ya se encuentra un Nivel de formación registrado con ese Nombre",
        });
    };
    const NivelActualizado = await Nivel.findByIdAndUpdate({_id:id}, {$set:req.body}, {
      new: true,
    });
    if (NivelActualizado !== null) {
      res.status(200).json(NivelActualizado);
    } else {
      return res.status(404).json({ msg: `Nivel no encontrado.` });
    }
  } catch (error) {
    res.status(500).json({ error: "No se pudo actualizar el Nivel." });
  }
};

export const patchNivel = async (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;
  try {
    const nivel = await Nivel.findById(id);
    if (nivel) {
      nivel.estado = estado;
      await nivel.save();
      res.json(nivel);
    } else {
      console.log(`id: ${id} no encontrado`);
      res.status(404).json({ msg: `nivel con id: ${id} no encontrado` });
    }
  } catch (error) {
    console.log(`Error al actualizar el nivel: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export const deleteNivel = async (req, res) => {
  const { id } = req.params;
  const NivelEliminado = await Nivel.findOneAndDelete({ _id: id });

  if (NivelEliminado) {
    return res.json({
      msg: `Se eliminó el Nivel: ${id} de la base de datos`,
    });
  } else {
    res
      .status(400)
      .json({ msg: `El Nivel: ${id} no se encuentra en la base de datos` });
  }
};
