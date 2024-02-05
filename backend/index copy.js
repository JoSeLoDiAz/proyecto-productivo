import express from "express";
import bodyParser from "body-parser"
import routes from "./routers/index.js"
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
const nombreBd= process.env.bdMongo||'transUrban';


app.use(cors())
app.use(bodyParser.json());
app.use(routes);
app.use(cors({
  origin: '*' // Permitir todas las URL
}));

mongoose.connect(process.env.CNX)
  .then(() => console.log(`Conectado a la Base de MongoDb llamada ${nombreBd}`))
  .catch((error) => console.error('Error de conexión a la base de datos:', error));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error de conexión a la base de datos:"));
db.once("open", () => {
  console.log("Conexión exitosa a la base de datos");//
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});

