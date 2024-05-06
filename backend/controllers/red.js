// import Red from "../models/red.js";
// import Programa from "../models/programa.js";
// import dotenv from "dotenv";
// import { v2 as cloudinary } from "cloudinary";
// dotenv.config();

// export const postRed = async (req, res) => {
//   const nuevoRed = new Red(req.body);
//   const buscar = await Red.findOne({ nombre: nuevoRed.nombre });
//   if (buscar) {
//     return res
//       .status(400)
//       .json({ msg: `Se encontro un Red registrado con ese Nombre` });
//   } else {
//     const RedCreado = await nuevoRed.save();
//     res.status(201).json(RedCreado);
//   }
// };

// export const postRedPrograma = async (req, res) => {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET,
//     secure: true,
//   });
//   try {
//     const { id } = req.params;
//     const { nombre, modalidad, requisitos, version, estado, nivel } =
//       req.body;
//     const { disenoCurricular } = req.files;
//     if (disenoCurricular) {
//       const extension = disenoCurricular.name.split(".").pop();
//       const { tempFilePath } = disenoCurricular;
//       const result = await cloudinary.uploader.upload(tempFilePath, {
//         width: 250,
//         crop: "limit",
//         resource_type: "raw",
//         allowedFormats: ["jpg", "png", "docx", "xlsx", "pptx", "pdf"],
//         format: extension,
//       });

//       const red = await Red.findById(id).populate("programa");
//       console.log(red);
//       if (red.programa.some((objeto) => objeto.nombre === nombre)) {
//         return res
//           .status(400)
//           .json({
//             msg: `El programa con el nombre ${nombre} Ya se encuentra ligado a esta Red`,
//           });
//       }
//       const nuevoPrograma = new Programa({
//         nombre: nombre,
//         modalidad: modalidad,
//         disenoCurricular: result.url,
//         requisitos: requisitos,
//         version: version,
//         estado: estado,
//         nivel: nivel,
//       });
//       await nuevoPrograma.save();
//       const ProgramaAgregado = await Red.updateOne(
//         { _id: id },
//         { $addToSet: { programa: nuevoPrograma._id } }
//       );
//       if (ProgramaAgregado.modifiedCount !== 0) {
//         return res.json({
//           ProgramaAgregado,
//           msj: "Desarrollo agregado correctamente ✅",
//         });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: error.message });
//   }
// };

// export const getRed = async (req, res) => {
//   try {
//     const buscar = await Red.find();
//     res.json({ buscar });
//   } catch (error) {
//     res.status(500).json({ msg: "No se puede buscar las Redes" });
//   }
// };

// export const getRedCodigo = async (req, res) => {
//   try {
//     const { codigo } = req.params;
//     const red = await Red.find();
//     const resultados = red.filter((objeto) =>
//       objeto.codigo.toString().startsWith(codigo)
//     );
//     console.log(resultados);
//     if (resultados) {
//       res.json(resultados);
//     } else {
//       return res.status(404).json({ msg: `Sin coincidencias para ${codigo}` });
//     }
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// };

// export const getRedId = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const red = await Red.findById({ _id: id });
//     if (red) {
//       res.json(red);
//     } else {
//       return res.status(404).json({ msg: `Sin coincidencias para ${id}` });
//     }
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// };

// export const putRed = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { nombre, estado, programa } = req.body;

//     const buscarNombre = await Red.findOne({ nombre: nombre });
//     if (buscarNombre && buscarNombre._id.toString() !== id) {
//       return res.status(404).json({
//         msg: "Ya se encuentra una Red registrada con ese Nombre",
//       });
//     }

//     let updatedData = {
//       nombre: nombre,
//       estado: estado,
//     };

//     if (req.body && req.body.programa) {
//       updatedData.programa = programa;
//     }
//     const buscarRed = await Red.findByIdAndUpdate(
//       { _id: id },
//       { $set: updatedData },
//       { new: true }
//     );
//     res.status(201).json(buscarRed);
//   } catch (error) {
//     res.status(500).json({ msg: "No se pudo actualizar el Red." });
//   }
// };

// export const patchRed = async (req, res) => {
//   const id = req.params.id;
//   const { estado } = req.body;
//   try {
//     const red = await Red.findById(id);
//     if (red) {
//       red.estado = estado;
//       await red.save();
//       res.json(red);
//     } else {
//       console.log(`id: ${id} no encontrado`);
//       res.status(404).json({ msg: `red con id: ${id} no encontrado` });
//     }
//   } catch (error) {
//     console.log(`Error al actualizar el red: ${error}`);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// };

// export const deleteRed = async (req, res) => {
//   const { id } = req.params;
//   const RedEliminado = await Red.findOneAndDelete({ _id: id });
//   if (RedEliminado) {
//     return res.json({
//       msg: `Se eliminó el Red: ${id} de la base de datos`,
//     });
//   } else {
//     res
//       .status(400)
//       .json({ msg: `La Red: ${id} no se encuentra en la base de datos` });
//   }
// };
