import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    status: { type: Boolean, required: true, default: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "Grades" }
);

const Grade = mongoose.model("Grade", gradeSchema);
export default Grade;
