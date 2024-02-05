import mongoose from 'mongoose';

const registroSchema = new mongoose.Schema(
  {
   denominacion: { type:String, require:false,},
   titulo_otorgado: {type:String, require:true},
   lugar: {type:String, require:true},
   metodologia: {type:String, require:true},
   snies: {type:String, require:true},
   resolucion: {type:String, require:false},
   soporte: {type:String,require:false},
   creditos: {type:String, require:true},
   estado : {type: Boolean,default:true , require: true },
   fecha: {type: Date, require: true},
   createdat : {type: Date, default: Date.now}
  },
  {collection: 'Registro', }// Especifica el nombre de la colección en la base de datos 
);

const Registro = mongoose.model('Registro', registroSchema);
export default Registro;