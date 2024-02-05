import mongoose from 'mongoose';

const proyectoSchema = new mongoose.Schema(
  {
   nombre: {type:String, require:true},
   descripcion: {type:String, require:true},
   fecha: {type:String, require:true},
   version: {type:String, require:true},
   archivo: {type:String, require:true},
   estado : {type: Boolean, require: true },
   programa: {type:mongoose.Schema.Types.ObjectId,ref:'Programa',require:true},
   createdat : {type: Date, default: Date.now}
  },
  {collection: 'Proyecto', }
);

const Proyecto = mongoose.model('Proyecto', proyectoSchema);
export default Proyecto;