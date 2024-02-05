import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, require: true },
    apellidos: { type: String, require: true },
    identificacion: { type: String, require: true },
    fecha_nacimiento: { type: String, require: true },
    genero: { type: String, require: true },
    direccion: { type: String, require: true },
    telefono: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    ocupacion: { type: String, require: true },
    estado_civil: { type: String, require: true },
    nacionalidad: { type: String, require: true },
    contacto_emergencia: { type: String, require: true },
    hoja_vida: { type: String, require: true },
    archivo: {
      type: String,
      default:
        "https://res.cloudinary.com/dlarprqi3/image/upload/v1700194266/zzh4fe3lyich2ixrqj6z.png",
    },
    estado: { type: Boolean, require: true },
    rol: { type: mongoose.Schema.Types.ObjectId, ref: "Rol", require: true },
    red: { type: mongoose.Schema.Types.ObjectId, ref: "Red" },
    resetToken: { type: String, default: "" },
    createdat: { type: Date, default: Date.now },
  },
  { collection: "Usuario" }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
