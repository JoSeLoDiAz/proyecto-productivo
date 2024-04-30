import mongoose from 'mongoose';

const campusSchema = new mongoose.Schema(
  {
    code: {type:String, required:true},
    name: { type:String, required:true},
    address: {type:String, required:true},
    status: {type:Boolean, required:true},
    city: {type:mongoose.Schema.Types.ObjectId, ref:'City', required:true},
    createdAt : {type: Date, default: Date.now}
  },
  {collection: 'Campus'} 
);

const Campus = mongoose.model('campus', campusSchema);
export default Campus;