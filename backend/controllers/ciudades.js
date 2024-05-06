// import Ciudad from "../models/ciudades.js";
// import dotenv from "dotenv";
// dotenv.config();

// export const postCiudad = async (req, res) => {
//   const nuevoCiudad = new Ciudad(req.body);
//   const buscar = await Ciudad.findOne({ daneciudad: nuevoCiudad.daneciudad });
//   if (buscar) {
//     return res
//       .status(400)
//       .json({ msg: `Se encontro un Ciudad registrado con ese codigo DANE` });
//   } else {
//     const CiudadCreado = await nuevoCiudad.save();
//     res.status(201).json(CiudadCreado);
//   }
// };

// export const getCiudad = async (req, res) => {
//   try {
//     const buscar = await Ciudad.find();
//     res.json({ buscar });
//   } catch (error) {
//     res.status(500).json({ msg: "No se puede buscar los Ciudades" });
//   }
// };

// export const getCiudadCodigo = async (req, res) => {
//   try {
//     const { daneciudad } = req.params;
//     const ciudad = await Ciudad.find();
//     const resultados = ciudad.filter((objeto) =>
//       objeto.daneciudad.toString().startsWith(daneciudad)
//     );
//     if (resultados) {
//       res.json(resultados);
//     } else {
//       return res.status(404).json({ msg: `Sin coincidencias para ${daneciudad}` });
//     }
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// };

// export const putCiudad = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const buscarCodigo = await Ciudad.findOne({daneciudad:req.body.daneciudad})
//     if (buscarCodigo && buscarCodigo._id.toString() !== id) {
//       return res
//         .status(404)
//         .json({ msg: "Ya se encuentra una Ciudad registrada con ese codigo" });
//     };
//     const CiudadActualizado = await Ciudad.findByIdAndUpdate(
//       { _id: id },
//       { $set: req.body },
//       {
//         new: true,
//       }
//     );
//     if (CiudadActualizado !== null) {
//       res.status(200).json(CiudadActualizado);
//     } else {
//       return res.status(404).json({ msg: `Ciudad no encontrado.` });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "No se pudo actualizar el Ciudad." });
//   }
// };

// export const patchCiudad = async (req, res) => {
//   const id = req.params.id;
//   const { estado } = req.body;
//   try {
//     const ciudad = await Ciudad.findById(id);
//     if (ciudad) {
//       ciudad.estado = estado;
//       await ciudad.save();
//       res.json(ciudad);
//     } else {
//       console.log(`id: ${id} no encontrado`);
//       res.status(404).json({ msg: `ciudad con id: ${id} no encontrado` });
//     }
//   } catch (error) {
//     console.log(`Error al actualizar el ciudad: ${error}`);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// };

// export const deleteCiudad = async (req, res) => {
//   const { id } = req.params;
//   const CiudadEliminado = await Ciudad.findOneAndDelete({ _id: id });

//   if (CiudadEliminado) {
//     return res.json({
//       msg: `Se eliminó el Ciudad: ${id} de la base de datos`,
//     });
//   } else {
//     res
//       .status(400)
//       .json({ msg: `El Ciudad: ${id} no se encuentra en la base de datos` });
//   }
// };
