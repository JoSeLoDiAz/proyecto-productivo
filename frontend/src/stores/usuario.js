import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { direccion } from "../routes/direccion.js";

export const useUsuarioStore = defineStore(
  "Usuario",
  () => {
    let cargando = ref(false);
    const token = ref('');
    const rol = ref('');
    const red = ref('');
    let usuarioId = ref([]);

    const archivo = async (id, archivo) => {
      try {
        cargando.value = true;
        const formData = new FormData();
        formData.append("archivo", archivo);
        let response = await axios.post(
          `${direccion}/usuario/archivo/${id}`,
          formData,
          {
            archivo: archivo,
          }
        );
        return response;
      } catch (error) {
        cargando.value = true;
        throw error;
      } finally {
        cargando.value = false;
      }
    };

    const mostrarArchivo = async (id) => {
      try {
        cargando.value = true;
        const response = axios.get(`${direccion}/usuario/mostrar/${id}`, {
          responseType: "blob",
        });
        return response;
      } catch (error) {
        cargando.value = true;
        throw error;
      } finally {
        cargando.value = false;
      }
    };

    const archivoNube = async (id, archivo) => {
      try {
        cargando.value = true;
        const formData = new FormData();
        formData.append("archivo", archivo);
        let response = await axios.post(
          `${direccion}/usuario/archivoNube/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response;
      } catch (error) {
        cargando.value = true;
        throw error;
      } finally {
        cargando.value = false;
      }
    };

    const mostrarArchivoCloud = async (id) => {
      try {
        cargando.value = true;
        const response = axios.get(`${direccion}/usuario/foto/${id}`);
        return response;
      } catch (error) {
        cargando.value = true;
        throw error;
      } finally {
        cargando.value = false;
      }
    };

    const hoja_vidaPerfil = async (id) => {
      try {
        cargando.value = true;
        const response = axios.get(`${direccion}/usuario/hojaVida/${id}`);
        return response;
      } catch (error) {
        cargando.value = true;
        throw error;
      } finally {
        cargando.value = false;
      }
    };

    const inicio = async (identificacion, password) => {
      try {
        cargando.value = true;
        let datos = await axios.post(`${direccion}/usuario/token`, {
          identificacion: identificacion,
          password: password,
        });
        token.value = datos.data.token;
        rol.value = datos.data.buscar.rol.denominacion;
        if (datos.data.buscar.red) {
          red.value = datos.data.buscar.red;
        }
        return datos;
      } catch (error) {
        cargando.value = true;
        throw error;
      } finally {
        cargando.value = false;
      }
    };

    const registrarUsuario = async (info) => {
      try {
        cargando.value = true;
        const formData = new FormData();
        for (const key in info) {
          formData.append(key, info[key]);
        }
        formData.append("hoja_vida", hoja_vida);
        const datos = await axios.post(`${direccion}/usuario`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return datos;
      } catch (error) {
        cargando.value = true;
        throw error;
      } finally {
        cargando.value = false;
      }
    };

    const registrarUsuarioRed = async (id, red) => {
      try {
        cargando.value = true;
        let datos = await axios.post(`${direccion}/usuario/agregarRed/${id}`, {
          red: red,
        });
        return datos;
      } catch (error) {
        cargando.value = true;
        throw error;
      } finally {
        cargando.value = false;
      }
    };

    const buscarUsuario = async () => {
      try {
        cargando.value = true;
        const usuario = await axios.get(`${direccion}/usuario`);
        usuario.data.buscar.reverse();
        return usuario.data.buscar;
      } catch (error) {
        cargando.value = true;
        console.log("error");
        return error.response.data;
      } finally {
        cargando.value = false;
      }
    };

    const buscarUsuarioCodigo = async (codigo) => {
      try {
        let response = await axios.get(`${direccion}/usuario/${codigo}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    };

    const buscarUsuarioId = async (id) => {
      try {
        let response = await axios.get(`${direccion}/usuario/id/${id}`);
        usuarioId.value = response.data;
      } catch (error) {
        throw error;
      }
    };

    const editarUsuario = async (
      id,
      nombre,
      apellidos,
      identificacion,
      fecha_nacimiento,
      genero,
      lugar,
      telefono,
      email,
      password,
      ocupacion,
      estado_civil,
      nacionalidad,
      contacto_emergencia,
      hoja_vida,
      archivo,
      rol,
      red
    ) => {
      try {
        cargando.value = true;
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("apellidos", apellidos);
        formData.append("identificacion", identificacion);
        formData.append("fecha_nacimiento", fecha_nacimiento);
        formData.append("genero", genero);
        formData.append("direccion", lugar);
        formData.append("telefono", telefono);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("ocupacion", ocupacion);
        formData.append("estado_civil", estado_civil);
        formData.append("nacionalidad", nacionalidad);
        formData.append("contacto_emergencia", contacto_emergencia);
        formData.append("hoja_vida", hoja_vida);
        formData.append("archivo", archivo);
        formData.append("rol", rol);
        formData.append("red", red);
        const response = await axios.put(
          `${direccion}/usuario/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response;
      } catch (error) {
        console.log(error);
        cargando.value = true;
        throw error;
      } finally {
        cargando.value = false;
      }
    };

    const recuperaPassword = async (email) => {
      try {
        cargando.value = true;
        const res = await axios.put(`${direccion}/usuario/forgot/password`, {
          email: email,
        });
        return res;
      } catch (error) {
        console.log(error);
        cargando.value = true;
        throw error;
      } finally {
        cargando.value = false;
      }
    };

    const newPassword = async (reset, newPassword) => {
      try {
        cargando.value = true;
        const res = await axios.put(
          `${direccion}/usuario/new/password`,
          {
            newPassword: newPassword,
          }, 
          {
            headers: {
              reset: reset,
            },
          }, 
          
        );

        return res;
      } catch (error) {
        cargando.value = false;
        throw error;
      } finally {
        cargando.value = false;
      }
    };

    const cambiarEstado = async (id, estado) => {
      try {
        const res = await axios.patch(`${direccion}/usuario/${id}`, {
          estado: estado,
        });
        return res;
      } catch (error) {
        console.log(error);
      }
    };

    return {
      archivo,
      archivoNube,
      mostrarArchivo,
      hoja_vidaPerfil,
      mostrarArchivoCloud,
      inicio,
      token,
      rol,
      red,
      registrarUsuario,
      registrarUsuarioRed,
      buscarUsuario,
      buscarUsuarioCodigo,
      buscarUsuarioId,
      editarUsuario,
      recuperaPassword,
      newPassword,
      cambiarEstado,
      cargando,
      usuarioId,
    };
  },
  {
    persist: true,
  }
);
