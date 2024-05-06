import express from "express";
import fileUpload from "express-fileupload";
import classroom from "../routers/classroom.js";
import campus from "../routers/campus.js";
// import ciudad from "../routers/ciudades.js";
import desarrollo from "../routers/desarrollo.js";
import evaluacion from "../routers/evaluacion.js";
import guia from "../routers/guia.js";
import investigacion from "../routers/investigacion.js";
import material from "../routers/material.js";
import materialformacion from "../routers/materialFormacion.js";
import grade from "../routers/grade.js";
import programa from "../routers/programa.js";
import proyecto from "../routers/proyecto.js";
// import red from "../routers/red.js";
import registro from "../routers/registro.js";
import retroalimentacion from "../routers/retroalimentacion.js";
import role from "../routers/role.js";
import module from "../routers/module.js";
import user from "../routers/user.js";
import configuracion from "../routers/configuracion.js";
import cors from "cors";
import mongoose from "mongoose";

class Server {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.conectarDB();
  }

  conectarDB() {
    mongoose
      .connect(process.env.bdMongo)
      .then(() =>
        console.log(`conectado a la base de datos ${process.env.bdMongo}`)
      );
  }
  routes() {
    this.app.use("/classroom", classroom);
    this.app.use("/campus", campus);
    // this.app.use("/ciudad", ciudad);
    this.app.use("/desarrollo", desarrollo);
    this.app.use("/evaluacion", evaluacion);
    this.app.use("/guia", guia);
    this.app.use("/investigacion", investigacion);
    this.app.use("/material", material);
    this.app.use("/materialformacion", materialformacion);
    this.app.use("/grade", grade);
    this.app.use("/programa", programa);
    this.app.use("/proyecto", proyecto);
    // this.app.use("/red", red);
    this.app.use("/registro", registro);
    this.app.use("/retroalimentacion", retroalimentacion);
    this.app.use("/role", role);
    this.app.use("/module", module);
    this.app.use("/user", user);
    this.app.use("/configuracion", configuracion);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.static("public"));
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }
  escuchar() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
    });
  }
}

export default Server;
