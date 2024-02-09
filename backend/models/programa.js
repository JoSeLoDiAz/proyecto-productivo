import mongoose, { Mongoose } from 'mongoose';

const programaSchema = new mongoose.Schema(
  {
   codigo: {type:String, require:true},
   nombre: {type:String, require:true},
   modalidad: {type:String, require:true},
   disenoCurricular:{type: String, require: true},
   requisitos: {type:String, require:true},
   version: {type:String,require:true},
   estado: {type:Boolean,require:true},
   nivel: {type:mongoose.Schema.Types.ObjectId,ref:'Nivel',require:true},
   red:{type:mongoose.Schema.Types.ObjectId,ref:'Red'},
   desarrollo: {type:mongoose.Schema.Types.ObjectId,ref:'Desarrollo'},
   user:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
   ambiente: [{type:mongoose.Schema.Types.ObjectId,ref:'Ambiente'}],
   materialformacion: [{type:mongoose.Schema.Types.ObjectId, ref: 'MaterialFormacion'}],
   registroCalificado: {type: Object},
   createdat : {type: Date, default: Date.now}
  },
  {collection: 'Programa', }// Especifica el nombre de la colección en la base de datos 
);

const Programa = mongoose.model('Programa', programaSchema);
export default Programa;