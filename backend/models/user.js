import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    last_name: { type: String, require: true },
    identification_type: { type: String, require: true },
    identification_number: { type: String, require: true },
    date_of_birth: { type: String, require: true },
    gender: { type: String, require: true },
    address: { type: String, require: true },
    phone: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    occupation: { type: String, require: true },
    marital_status: { type: String, require: true },
    nationality: { type: String, require: true },
    medical_information: { type: String, require: true },
    emergency_contact: { type: String, require: true },
    curriculum_vitae: { type: String },
    file: {
      type: String,
      default:
        "https://res.cloudinary.com/dlarprqi3/image/upload/v1700194266/zzh4fe3lyich2ixrqj6z.png",
    },
    status: { type: Boolean, require: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", require: true },
    knowledge_network: { type: mongoose.Schema.Types.ObjectId, ref: "Red" },
    resetToken: { type: String, default: "" },
    createdat: { type: Date, default: Date.now },
  },
  { collection: "Users" }
);

const User = mongoose.model("User", userSchema);
export default User;
