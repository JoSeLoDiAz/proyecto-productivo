import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { direccion } from "../routes/direccion.js";

export const useProgramaStore = defineStore(
  "Programa",
  () => {
    let cargando = ref(false);
    let idPrograma = ref([]);

    const registrarPrograma = async (info) => {
      try {
        cargando.value = true;
        const formData = new FormData();
        for (const key in info) {
          formData.append(key, info[key]);
        }
        formData.append("disenoCurricular", disenoCurricular);
        const datos = await axios.post(`${direccion}/programa`, formData, {
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

    const registrarRegistroCalificado = async (id, info) => {
      try {
        cargando.value = true;
        const RegistroCalificado = await axios.post(
          `${direccion}/programa/registro/calificado/${id}`,
          info
        );
        return RegistroCalificado;
      } catch (error) {
        cargando.value = true;
        throw error;
      } finally {
        cargando.value = false;
      }
    };


    const buscarProgramas = async (ids)=>{
      try {
        cargando.value=true;
        const response = await axios.get(`${direccion}/programa/varios?ids=${ids.join(',')}`)
        return response.data.buscar
      } catch (error) {
        cargando.value=true;
        throw error
      }finally{
        cargando.value=false;
      }
    };

    const registrarProgramaDesarrollo = async (id, info) => {
      try {
        cargando.value = true;
        const programa = await axios.post(
          `${direccion}/programa/agregar/desarrollo/${id}`,
          info
        );
        return programa;
      } catch (error) {
        cargando.value = true;
        throw error;
      } finally {
        cargando.value = false;
      }
    };

    const agregarInstructor = async (id, usuario) => {
      try {
        cargando.value = true;
        const nuevoInstructor = await axios.post(
          `${direccion}/programa/agregar/usuario/${id}`,
          {
            usuario: usuario,
          }
        );
        return nuevoInstructor;
      } catch (error) {
        cargando.value = true;
        throw error;
      } finally {
        cargando.value = false;
      }
    };

    const agregarMaterialFormacion = async (id,materialformacion) => {
      try {
        cargando.value = true;
        const nuevoMaterial = await axios.post(`${direccion}/programa/agregar/material/formacion/${id}`,
        {
          materialformacion:materialformacion
        })
        return nuevoMaterial
      } catch (error) {
        cargando.value = true;
        throw error
      }finally {
        cargando.value = false;
      }
    }

    const agregarAmbiente = async (id, ambiente) => {
      try {
        cargando.value = true;
        const nuevoAmbiente = await axios.post(
          `${direccion}/programa/agregar/ambiente/${id}`,
          {
            ambiente: ambiente,
          }
        );
        return nuevoAmbiente;
      } catch (error) {
        cargando.value = true;
        throw error;
      } finally {
        cargando.value = false;
      }
    };

    const buscarPrograma = async () => {
      try {
        cargando.value = true;
        const programa = await axios.get(`${direccion}/programa`);
        programa.data.buscar.reverse();
        return programa.data.buscar;
      } catch (error) {
        cargando.value = true;
        return error;
      } finally {
        cargando.value = false;
      }
    };

    const buscarProgramaCodigo = async (codigo) => {
      try {
        cargando.value=true;
        let response = await axios.get(`${direccion}/programa/${codigo}`);
        return response.data;
      } catch (error) {
        cargando.value=true;
        throw error;
      }finally{
        cargando.value=false;
      }
    };

    const buscarProgramaId = async (id) => {
      try {
        cargando.value=true;
        let response = await axios.get(`${direccion}/programa/id/${id}`);
        idPrograma.value = response.data;
      } catch (error) {
        cargando.value=true;
        throw error;
      }finally{
        cargando.value=false;
      }
    };

    const editarPrograma = async (
      id,
      codigo,
      nombre,
      modalidad,
      disenoCurricular,
      requisitos,
      version,
      nivel,
      knowledge_network
    ) => {
      try {
        cargando.value = true;
        const formData = new FormData();
        formData.append("codigo", codigo);
        formData.append("nombre", nombre);
        formData.append("modalidad", modalidad);
        formData.append("disenoCurricular", disenoCurricular);
        formData.append("requisitos", requisitos);
        formData.append("version", version);
        formData.append("nivel", nivel);
        formData.append("red", knowledge_network);
        const response = await axios.put(
          `${direccion}/programa/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data;
      } catch (error) {
        cargando.value = true;
        throw error;
      } finally {
        cargando.value = false;
      }
    };

    const editarDiseno = async (id, disenoCurricular) => {
      try {
        cargando.value = true;
        const formData = new FormData();
        formData.append("disenoCurricular", disenoCurricular);
        let response = await axios.put(
          `${direccion}/programa/diseno/${id}`,
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

    const cambiarEstado = async (id, estado) => {
      try {
        const res = await axios.patch(`${direccion}/programa/${id}`, {
          estado: estado,
        });
        return res;
      } catch (error) {
        console.log(error);
      }
    };

    return {
      registrarPrograma,
      registrarProgramaDesarrollo,
      registrarRegistroCalificado,
      agregarInstructor,
      agregarMaterialFormacion,
      agregarAmbiente,
      buscarPrograma,
      buscarProgramas,
      buscarProgramaCodigo,
      buscarProgramaId,
      idPrograma,
      editarPrograma,
      editarDiseno,
      cambiarEstado,
      cargando,
    };
  },
  { persist: true }
);
