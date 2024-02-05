import mongoose from 'mongoose';

const nivelSchema = new mongoose.Schema(
  {
   denominacion: { type:String, require:true,},
   descripcion: {type:String},
   estado: {type:Boolean,require:true},
   createdat : {type: Date, default: Date.now}
  },
  {collection: 'Nivel', }// Especifica el nombre de la colección en la base de datos 
);

const Nivel = mongoose.model('Nivel', nivelSchema);
export default Nivel;