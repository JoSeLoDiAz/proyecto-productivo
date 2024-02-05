import mongoose from 'mongoose';

const ambienteSchema = new mongoose.Schema(
  {
   nombre: { type:String, require:true,},
   capacidad : {type: String, require: true },
   tipo_ambiente:{type: String, require: true},
   equipamiento: {type:String, require:true},
   estado: {type:Boolean,require:true,default:true},
   sede:{type:mongoose.Schema.Types.ObjectId,ref:'Sede',require:true},
   createdat : {type: Date, default: Date.now}
  },
  {collection: 'Ambiente', }// Especifica el nombre de la colección en la base de datos 
);

const Ambiente = mongoose.model('Ambiente', ambienteSchema);
export default Ambiente;