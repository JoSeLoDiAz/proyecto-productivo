import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { direccion } from "../routes/direccion.js";

export const useUsuarioStore = defineStore(
  "Usuario",
  () => {
    let cargando = ref(false);
    const token = ref('');
    const role = ref('');
    const knowledge_network = ref('');
    let usuarioId = ref([]);

    const file = async (id, file) => {
      try {
        cargando.value = true;
        const formData = new FormData();
        formData.append("archivo", file);
        let response = await axios.post(
          `${direccion}/usuario/file/${id}`,
          formData,
          {
            file: file,
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

    const archivoNube = async (id, file) => {
      try {
        cargando.value = true;
        const formData = new FormData();
        formData.append("archivo", file);
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

    const inicio = async (identification_number, password) => {
      try {
        cargando.value = true;
        let datos = await axios.post(`${direccion}/usuario/token`, {
          identification_number: identification_number,
          password: password,
        });
        token.value = datos.data.token;
        role.value = datos.data.buscar.role.denominacion;
        if (datos.data.buscar.knowledge_network) {
          knowledge_network.value = datos.data.buscar.knowledge_network;
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
        formData.append("hoja_vida", curriculum_vitae);
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

    const registrarUsuarioRed = async (id, knowledge_network) => {
      try {
        cargando.value = true;
        let datos = await axios.post(`${direccion}/usuario/agregarRed/${id}`, {
          knowledge_network: knowledge_network,
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
        const user = await axios.get(`${direccion}/usuario`);
        user.data.buscar.reverse();
        return user.data.buscar;
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
      name,
      last_name,
      identification_number,
      date_of_birth,
      gender,
      lugar,
      phone,
      email,
      password,
      occupation,
      marital_status,
      nationality,
      emergency_contact,
      curriculum_vitae,
      file,
      role,
      knowledge_network
    ) => {
      try {
        cargando.value = true;
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("apellidos", last_name);
        formData.append("identificacion", identification_number);
        formData.append("fecha_nacimiento", date_of_birth);
        formData.append("genero", gender);
        formData.append("direccion", lugar);
        formData.append("celular", phone);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("ocupacion", occupation);
        formData.append("estado_civil", marital_status);
        formData.append("nacionalidad", nationality);
        formData.append("contacto_emergencia", emergency_contact);
        formData.append("hoja_vida", curriculum_vitae);
        formData.append("archivo", file);
        formData.append("rol", role);
        formData.append("red", knowledge_network);
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

    const cambiarEstado = async (id, status) => {
      try {
        const res = await axios.patch(`${direccion}/usuario/${id}`, {
          status: status,
        });
        return res;
      } catch (error) {
        console.log(error);
      }
    };

    return {
      file,
      archivoNube,
      mostrarArchivo,
      hoja_vidaPerfil,
      mostrarArchivoCloud,
      inicio,
      token,
      role,
      knowledge_network,
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
