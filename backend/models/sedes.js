import mongoose from 'mongoose';

const sedeSchema = new mongoose.Schema(
  {
   nombre: { type:String, require:true,},
   direccion: {type:String, require:true},
   contacto: {type:String, require:true},
   estado: {type:Boolean,require:true},
   centro: {type:mongoose.Schema.Types.ObjectId,ref:'Centro',require:true},
   createdat : {type: Date, default: Date.now}
  },
  {collection: 'Sede' } 
);

const Sede = mongoose.model('Sede', sedeSchema);
export default Sede;