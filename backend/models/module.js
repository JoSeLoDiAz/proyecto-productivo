import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    location: { type: String, require: true },
    classrooms: { type: Number, require: true },
    status: { type: Boolean, require: true, default: true },
    campus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campus",
      require: true,
    },
    createdat: { type: Date, default: Date.now },
  },
  { collection: "Modules" }
);

const Module = mongoose.model("Module", moduleSchema);
export default Module;
