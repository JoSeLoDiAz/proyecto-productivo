import Registro from "../models/registro.js";
import dotenv from "dotenv";
dotenv.config();

export const postRegistro = async (req, res) => {
  const nuevoRegistro = new Registro(req.body);
  console.log(nuevoRegistro.codigo);
  const buscar = await Registro.findOne({ codigo: nuevoRegistro.codigo });
  if (buscar) {
    return res
      .status(400)
      .json({ msg: `Se encontro un Registro registrado con ese codigo` });
  } else {
    const RegistroCreado = await nuevoRegistro.save();
    res.status(201).json(RegistroCreado);
  }
};

export const getRegistro = async (req, res) => {
  try {
    const buscar = await Registro.find();
    res.json({ buscar });
  } catch (error) {
    res.status(500).json({ msg: "No se puede buscar los Registros" });
  }
};

export const getRegistroCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const registro = await Registro.find();
  const resultados = registro.filter(objeto => objeto.codigo.toString().startsWith(codigo));
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

export const putRegistro = async (req, res) => {
  try {
    const { id } = req.params;
    const RegistroActualizado = await Registro.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (RegistroActualizado !== null) {
      res.status(200).json(RegistroActualizado);
    } else {
      return res.status(404).json({ msg: `Registro no encontrado.` });
    }
  } catch (error) {
    res.status(500).json({ msg: "No se pudo actualizar el Registro." });
  }
};

export const patchRegistro = async (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;
  try {
    const registro = await Registro.findById(id);
    if (registro) {
      registro.estado = estado;
      await registro.save();
      res.json(registro);
    } else {
      console.log(`id: ${id} no encontrado`);
      res.status(404).json({ msg: `registro con id: ${id} no encontrado` });
    }
  } catch (error) {
    console.log(`Error al actualizar el registro: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export const deleteRegistro = async (req, res) => {
  const { id } = req.params;
  const RegistroEliminado = await Registro.findOneAndDelete({ _id: id });

  if (RegistroEliminado) {
    return res.json({
      msg: `Se eliminó el Registro: ${id} de la base de datos`,
    });
  } else {
    res
      .status(400)
      .json({ msg: `El Registro: ${id} no se encuentra en la base de datos` });
  }
};