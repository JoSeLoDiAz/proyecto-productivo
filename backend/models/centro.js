import mongoose from 'mongoose';

const centroSchema = new mongoose.Schema(
  {
   codigo:{type:String, require:true},
   nombre: { type:String, require:true,},
   direccion: {type:String, require:true},
   estado: {type:Boolean,require:true},
   ciudad: {type:mongoose.Schema.Types.ObjectId,ref:'Ciudad',require:true},
   createdat : {type: Date, default: Date.now}
  },
  {collection: 'Centro', } 
);

const Centro = mongoose.model('Centro', centroSchema);
export default Centro;