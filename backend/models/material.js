import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema(
  {
   nombre: {type:String, require:true},
   archivo: {type:String, require:true},
   estado : {type: Boolean, require: true },
   createdat : {type: Date, default: Date.now}
  },
  {collection: 'Material', }
);

const Material = mongoose.model('Material', materialSchema);
export default Material;