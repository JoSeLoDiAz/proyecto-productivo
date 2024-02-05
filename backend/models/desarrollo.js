import mongoose from 'mongoose';

const desarrolloSchema = new mongoose.Schema(
  {
   matriz_correlacion: { type:String, require:true,},
   proyecto: {type:String, require:true},
   planeacion: {type: String, require: true },
   estado: {type:Boolean,require:true},
   guia: [{type:mongoose.Schema.Types.ObjectId,ref:'Guia',require:true}],
   createdat : {type: Date, default: Date.now}
  },
  {collection: 'Desarrollo', } 
);

const Desarrollo = mongoose.model('Desarrollo', desarrolloSchema);
export default Desarrollo;