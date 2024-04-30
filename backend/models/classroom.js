import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    capacity: { type: String, require: true },
    room_type: { type: String, require: true },
    equipment: { type: String, require: true },
    status: { type: Boolean, require: true, default: true },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      require: true,
    },
    createdat: { type: Date, default: Date.now },
  },
  { collection: "Classrooms" }
);

const Classroom = mongoose.model("Classroom", classroomSchema);
export default Classroom;
