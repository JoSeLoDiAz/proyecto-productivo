import mongoose from 'mongoose';

const configuracionSchema = new mongoose.Schema(
  {
   colorletra: {type:String, require:true},
   colormenu: {type:String, require:true},
   colortres: {type:String, require:true},
   colorcuatro: {type:String, require:true},
   createdat : {type: Date, default: Date.now}
  },
  {collection: 'Configuracion', }
);

const Configuracion = mongoose.model('Configuracion', configuracionSchema);
export default Configuracion;