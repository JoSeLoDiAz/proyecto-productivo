import Centro from "../models/centro.js";
import dotenv from "dotenv";
dotenv.config();

export const postCentro = async (req, res) => {
  const nuevoCentro = new Centro(req.body);
  const buscar = await Centro.findOne({ codigo: nuevoCentro.codigo });
  if (buscar) {
    return res
      .status(400)
      .json({ msg: `Se encontro un Centro registrado con ese codigo` });
  } else {
    const CentroCreado = await nuevoCentro.save();
    res.status(201).json(CentroCreado);
  }
};

export const getCentro = async (req, res) => {
  try {
    const buscar = await Centro.find()
    .populate('ciudad');
    res.json({ buscar });
  } catch (error) {
    res.status(500).json({ msg: "No se pueden buscar los Centros" });
  }
};


export const getCentroCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const centro = await Centro.find();
    const resultados = centro.filter((objeto) =>
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

export const getCentroId = async (req, res) => {
  try {
    const { id } = req.params;
    const centro = await Centro.findById(id);
    if(centro){
return res.json(centro);
    }else{
return res.status(404).json({msg:`Sin coincidencias para la busqueda realizada`})
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const putCentro = async (req, res) => {
  try {
    const { id } = req.params;
    const buscarCodigo = await Centro.findOne({codigo:req.body.codigo})
    if (buscarCodigo && buscarCodigo._id.toString() !== id) {
      return res
        .status(404)
        .json({ msg: "Ya se encuentra un Centro registrado con ese codigo" });
    };
    const CentroActualizado = await Centro.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      {
        new: true,
      }
    );
    if (CentroActualizado !== null) {
      res.status(200).json(CentroActualizado);
    } else {
      return res.status(404).json({ msg: `Centro no encontrado.` });
    }
  } catch (error) {
    res.status(500).json({ msg: "No se pudo actualizar el Centro." });
  }
};

export const patchCentro = async (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;
  try {
    const centro = await Centro.findById(id);
    if (centro) {
      centro.estado = estado;
      await centro.save();
      res.json(centro);
    } else {
      console.log(`id: ${id} no encontrado`);
      res.status(404).json({ msg: `centro con id: ${id} no encontrado` });
    }
  } catch (error) {
    console.log(`Error al actualizar el centro: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteCentro = async (req, res) => {
  const { id } = req.params;
  const CentroEliminado = await Centro.findOneAndDelete({ _id: id });

  if (CentroEliminado) {
    return res.json({
      msg: `Se eliminó el Centro: ${id} de la base de datos`,
    });
  } else {
    res
      .status(400)
      .json({ msg: `El Centro: ${id} no se encuentra en la base de datos` });
  }
};
