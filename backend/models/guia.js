import mongoose from 'mongoose';

const guiaSchema = new mongoose.Schema(
  {
   codigo:{type:String, require:true},
   nombre: {type:String, require:true},
   fase: {type:String, require:false},
   archivo: {type:String, require:true},
   evaluacion: [{type:mongoose.Schema.Types.ObjectId,ref:'Evaluacion',require:true}],
   material: [{type:mongoose.Schema.Types.ObjectId,ref:'Material',require:true}],
   estado : {type: Boolean, default:true, require:true },
   createdat : {type: Date, default: Date.now}
  },
  {collection: 'Guia', }
);

const Guia = mongoose.model('Guia', guiaSchema);
export default Guia;