import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    denomination: { type: String, require: true },
    status: { type: Boolean, require: true },
    createdat: { type: Date, default: Date.now },
  },
  { collection: "Roles" }
);

const Role = mongoose.model("Role", roleSchema);
export default Role;
