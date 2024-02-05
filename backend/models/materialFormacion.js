import mongoose from 'mongoose';

const materialFormacionSchema = new mongoose.Schema(
  {
   nombre: {type:String, require:true},
   tipo: {type:String, require:true},
   descripcion: {type:String, require:true},
   archivo: {type:String, require:true},
   estado : {type: Boolean, require: true },
   createdat : {type: Date, default: Date.now}
  },
  {collection: 'MaterialFormacion', }
);

const MaterialFormacion = mongoose.model('MaterialFormacion', materialFormacionSchema);
export default MaterialFormacion;