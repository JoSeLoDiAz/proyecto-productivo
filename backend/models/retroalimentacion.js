import mongoose from 'mongoose';

const retroalimentacionSchema = new mongoose.Schema(
  {
   nombre: { type:String, require:true,},
   codigo_ficha: {type:String, require:true},
   descripcion: {type:String, require:true},
   fecha: {type:String, require:true},
   archivo: {type:String, require:true},
   programa: {type:mongoose.Schema.Types.ObjectId,ref:'Programa',require:true},
   estado : {type: Boolean, require: true },
   createdat : {type: Date, default: Date.now}
  },
  {collection: 'Retroalimentacion', }// Especifica el nombre de la colección en la base de datos 
);

const Retroalimentacion = mongoose.model('Retroalimentacion', retroalimentacionSchema);
export default Retroalimentacion;