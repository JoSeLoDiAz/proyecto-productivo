import mongoose from 'mongoose';

const evaluacionSchema = new mongoose.Schema(
  {
   nombre: {type:String, require:true},
   archivo: {type:String, require:true},
   estado : {type: Boolean, require: true },
   createdat : {type: Date, default: Date.now}
  },
  {collection: 'Evaluacion', }
);

const Evaluacion = mongoose.model('Evaluacion', evaluacionSchema);
export default Evaluacion;