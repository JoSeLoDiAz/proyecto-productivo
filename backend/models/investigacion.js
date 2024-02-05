import mongoose from 'mongoose';

const investigacionSchema = new mongoose.Schema(
  {
   nombre: { type:String, require:true,},
   descripcion:{type:String,require:true},
   fecha:{type:String,require:true},
   documento:{type:String,require:true},
   estado:{type:Boolean,require:true},
   programa:{type:mongoose.Schema.Types.ObjectId,ref:'Programa',require:true},
   createdat : {type: Date, default: Date.now}
  },
  {collection: 'Investigacion', }
);

const Ambiente = mongoose.model('Investigacion', investigacionSchema);
export default Ambiente;