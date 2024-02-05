import Holder from "../models/holder.js"
import bcryptjs from "bcryptjs"
import { generarJWT } from "../middlewares/validar-jwt.js";
import subirArchivo from "../helpers/subir-archivo.js";
import * as fs from 'fs'
import path from 'path'
import url from 'url'
import { v2 as cloudinary } from 'cloudinary'
import sendEmail from "../utils/emails/sendEmail.js"
import tools from "../helpers/tools.js";

const holdersHttp = {

    holderGet: async (req, res) => {
        const { search } = req.query;

        const holder = await Holder.find(
            //{nombre:new RegExp(query,"i")}
            {
                $or: [
                    { name: new RegExp(search, "i") },
                    { email: new RegExp(search, "i") },
                    { document: new RegExp(search, "i") }
                ]
            }
        );

        res.json({
            holder
        })
    },

    holderGetByRol: async (req, res) => {
        const { rol } = req.params;

        const holder = await Holder.find({rol});

        res.json({
            holder
        })
    },


    holderGetById: async (req, res) => {

        const { id } = req.params;

        const holder = await Holder.findOne({ _id: id });

        res.json({
            holder
        })
    },
         
    holderPost: async (req, res) => {
        const { name, email, password, document, rol, ficha, phone } = req.body;
        const holder = new Holder({ name, email, password, document, rol, ficha, phone});

        const salt = bcryptjs.genSaltSync();
        holder.password = bcryptjs.hashSync(password, salt)

        await holder.save()

        res.json({
            holder
        })
    },

    holderPostSuper: async (req, res) => {
        const { email, password } = req.body;
        const name = "Super"
        const document = "Super"
        const rol = "SUPER"
        const phone = "000000000"
        const holder = new Holder({ name, email, password, document, rol, ficha, phone });

        const salt = bcryptjs.genSaltSync();
        holder.password = bcryptjs.hashSync(password, salt)

        await holder.save()

        res.json({
            holder
        })

    },

    holderPut: async (req, res) => {
        const { id } = req.params;

        let { _id, email, state, password, createdAt,photo, ...resto } = req.body;

        resto=tools.actualizarResto(resto.document,resto)
        resto=tools.actualizarResto(resto.name, resto)
        resto=tools.actualizarResto(resto.rol,resto)
        resto=tools.actualizarResto(resto.ficha,resto)
        resto=tools.actualizarResto(resto.phone,resto)

        const holder = await Holder.findByIdAndUpdate(id, resto);

        res.json({
            holder
        })
    },

    holderPutActivate: async (req, res) => {
        const { id } = req.params;

        const holder = await Holder.findByIdAndUpdate(id, { state: 1 });

        res.json({
            holder
        })
    },

    holderPutDeactivate: async (req, res) => {
        const { id } = req.params;

        const holder = await Holder.findByIdAndUpdate(id, { state: 0 });

        res.json({
            holder
        })
    },

    cambiopassword: async (req, res) => {
        const { id } = req.params;

        const { password } = req.body;

        if (password) {
            const salt = bcryptjs.genSaltSync();
            var newPassword = bcryptjs.hashSync(password, salt)
        }

        const holder = await Holder.findByIdAndUpdate(id, { password: newPassword });


        res.json({
            holder
        })
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const holder = await Holder.findOne({ email })
            if (!holder) {
                return res.status(400).json({
                    msg: "Holder / Password no son correctos"
                })
            }

            if (holder.estado === 0) {
                return res.status(400).json({
                    msg: "Holder Inactivo"
                })
            }

            const validPassword = bcryptjs.compareSync(password, holder.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: "Holder / Password no son correctos"
                })
            }

            const token = await generarJWT(holder.id);

            res.json({
                holder,
                token
            })

        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
    },
    cargarArchivo: async (req, res) => {
        const { id } = req.params;
        try {
            let nombre
            await subirArchivo(req.files, undefined)
                .then(value => nombre = value)
                .catch((err) => console.log(err));

            //persona a la cual pertenece la foto
            let holder = await Holder.findById(id);
            //si el Holder ya tiene foto la borramos
            if (holder.photo) {
                const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
                const pathImage = path.join(__dirname, '../uploads/', holder.photo);

                if (fs.existsSync(pathImage)) {
                    fs.unlinkSync(pathImage)
                }

            }

            holder = await Holder.findByIdAndUpdate(id, { photo: nombre })
            //responder
            res.json({ nombre });
        } catch (error) {
            res.status(400).json({ error, 'general': 'Controlador' })
        }

    },
    mostrarImagen: async (req, res) => {
        const { id } = req.params

        try {
            let holder = await Holder.findById(id)
            if (holder.photo) {
                const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
                const pathImage = path.join(__dirname, '../uploads/', holder.photo);
                if (fs.existsSync(pathImage)) {
                    return res.sendFile(pathImage)
                }
            }
            res.status(400).json({ msg: 'Falta Imagen' })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    cargarArchivoCloud: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true
        });

        const { id } = req.params;
        try {
            //subir archivo
            const { tempFilePath } = req.files.archivo
            cloudinary.uploader.upload(tempFilePath,
                { width: 250, crop: "limit" },
                async function (error, result) {
                    if (result) {
                        let holder = await Holder.findById(id);
                        if (holder.photo) {
                            const nombreTemp = holder.photo.split('/')
                            const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                            const [public_id] = nombreArchivo.split('.')
                            cloudinary.uploader.destroy(public_id)
                        }
                        holder = await Holder.findByIdAndUpdate(id, { photo: result.url })
                        //responder
                        res.json({ url: result.url });
                    } else {
                        res.json(error)
                    }

                })
        } catch (error) {
            res.status(400).json({ error, 'general': 'Controlador' })
        }
    },
    mostrarImagenCloud: async (req, res) => {
        const { id } = req.params

        try {
            let holder = await Holder.findById(id)
            if (holder.photo) {
                return res.json({ url: holder.photo })
            }
            res.status(400).json({ msg: 'Falta Imagen' })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    requestPasswordReset: async (req, res) => {
        //https://blog.logrocket.com/implementing-a-secure-password-reset-in-node-js/
        //https://www.youtube.com/watch?v=O49g_OVPe6Q
        //https://www.youtube.com/watch?v=KjheexBLY4A
        const { email } = req.body
        const holder = await Holder.findOne({ email });

        //let resetToken = crypto.randomBytes(32).toString("hex");

        // const salt = bcryptjs.genSaltSync();
        // const hash = bcryptjs.hashSync(resetToken, salt)
        const token = await generarJWT(holder.id);

        const link = `${process.env.CLIENT_URL}/api/holder/passwordreset?token=${token}&id=${holder._id}`;
        sendEmail(holder.email, "Password Reset Request", { name: holder.name, link }, "./template/requestResetPassword.handlebars");

        res.json({
            // holder,
            // token,
            // link,
            msg: "Email de recuperación enviado. No olvide revisar el spam"

        })
    },
    resetPassword: async (req, res) => {

        let { password, holderId } = req.body
        const salt = bcryptjs.genSaltSync();
        password = bcryptjs.hashSync(password, salt)
        const holder = await Holder.findByIdAndUpdate(holderId, { password });
        if (holder) {
            sendEmail(
                holder.email,
                "Password Reset Successfully",
                {
                    name: holder.name,
                },
                "./template/resetPassword.handlebars"
            );
            res.json({
                msg: "Password Reset Ok"

            })
        } else {
            res.json({
                msg: "Se produjo un error! Intentelo de nuevo"

            })
        }

    }

}

export default holdersHttp
