import Investigacion from "../models/investigacion.js"
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();

export const postInvestigacion = async (req, res) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
      secure: true,
    });
    try {
      const {
        nombre,
        descripcion,
        fecha,
        estado,
        programa
      } = req.body;
  
      const buscar = await Investigacion.findOne({ nombre: nombre });
  
      if (buscar) {
        return res.status(404).json({
          msg: `Se encontró un programa con el Nombre ${nombre} en las investigaciones`,
        });
      }
  
      const { documento } = req.files;
      if (documento) {
        const extension = documento.name.split(".").pop();
        const { tempFilePath } = documento;
        const result = await cloudinary.uploader.upload(tempFilePath, {
          width: 250,
          crop: "limit",
          resource_type: "raw",
          allowedFormats: ["jpg", "png", "docx", "xlsx", "pptx", "pdf"],
          format: extension,
        });
  
        const nuevoInvestigacion = new Investigacion({
            nombre:nombre,
            descripcion:descripcion,
            fecha:fecha,
            documento:result.url,
            estado:estado,
            programa:programa
        });
        await nuevoInvestigacion.save();
        return res.json(nuevoInvestigacion);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  };

export const getInvestigaciones = async (req,res)=>{
    try {
        const buscar = await Investigacion.find().populate("programa")
        if(buscar){
            return res.status(202).json(buscar)
        }
    } catch (error) {
        return res.status(404).json({msg:'Hubo un problema al buscar las Investigaciones'})
    }
  };

export const getInvestigacionId= async (req,res)=>{
    try {
        const {id} = req.params
        const buscar = await Investigacion.findById(id).populate('programa')
        if(buscar){
            return res.status(202).json(buscar)
        }else{
            return res.status(400).json({msg:'Sin coincidencias para la busqueda realizada'})
        }
    } catch (error) {
        
    }
};

export const putInvestigacion = async (req,res)=>{
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
        secure: true,
      });
    try {
       const {id} = req.params;
       const {nombre,descripcion,fecha,programa} = req.body;

       const buscar = await Investigacion.findOne({ nombre: nombre });
       if (buscar && buscar._id.toString() !== id) {
         return res.status(404).json({
           msg: "Ya se encuentra una Investigacion registrada con ese Nombre",
         });
       };
       let updatedData = {
        nombre: nombre,
        descripcion: descripcion,
        fecha: fecha,
        programa: programa
      };

      if (req.files && req.files.documento) {
        const documento = req.files.documento;
        const extension = documento.name.split(".").pop();
        const { tempFilePath } = documento;
        const result = await cloudinary.uploader.upload(tempFilePath, {
          width: 250,
          crop: "limit",
          resource_type: "raw",
          allowedFormats: ["jpg", "png", "docx", "xlsx", "pptx", "pdf"],
          format: extension,
        });
        const buscarId = await Investigacion.findById(id);
  
        if (buscarId.documento) {
          const nombreTemp = buscarId.documento.split("/");
          const nombredocumento = nombreTemp[nombreTemp.length - 1];
          const [public_id] = nombredocumento.split(".");
          await cloudinary.uploader.destroy(public_id);
        }
  
        updatedData.documento = result.url;
      };

      const buscarInvestigacion = await Investigacion.findByIdAndUpdate(
        { _id: id },
        { $set: updatedData },
        { new: true }
      );
      res.status(201).json(buscarInvestigacion);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const cambiarEstado = async (req, res) => {
    try {
        const {id} = req.params;
        const {estado} = req.body;
        const buscar = await Investigacion.findById(id);
        if(buscar){
          const actualizado=  await buscar.updateOne({estado:estado})
          return res.status(200).json({msg:'Cambio de estado realizado correctamente', actualizado})
        }  
    } catch (error) {
        return res.status(500).json({msg:'Ocurrio un problema al cambiar el estado'})
    }
};

export const deleteInvestigacion = async (req,res) => {
    try {
      const {id} = req.params;
      const buscar= await Investigacion.findByIdAndDelete(id);
      if(buscar){
        return res.status(200).json({msg:'Investigación eliminada Correctamente'})
      }  
    } catch (error) {
        
    }
};