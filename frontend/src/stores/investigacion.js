import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { direccion } from "../routes/direccion.js";

export const useInvestigacionStore = defineStore("Investigacion", () => {
  let cargando = ref(false);

  const registrarInvestigacion = async (info, archivo) => {
    try {
      cargando.value=true;
      const formData = new FormData();
      for (const key in info) {
        formData.append(key, info[key]);
      }
      formData.append('archivo', archivo);
      const datos = await axios.post(`${direccion}/investigacion`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      return datos;
    } catch (error) {
      cargando.value=true;
      throw error;
    }finally{
      cargando.value=false;
    }
  };
  

  const buscarInvestigaciones = async () => {
    try {
      cargando.value = true;
      const investigacion = await axios.get(`${direccion}/investigacion`);
      console.log(investigacion.data);
      investigacion.data.reverse();
      return investigacion.data;
    } catch (error) {
      cargando.value = true;
      return error.response.data;
    } finally {
      cargando.value = false;
    }
  };

  const buscarInvestigacionId = async (id) => {
    try {
      cargando.value = true;
      let response = await axios.get(`${direccion}/investigacion/${id}`);
      return response.data;
    } catch (error) {
      cargando.value = true;
      throw error;
    }finally{
      cargando.value = false;
    }
  };

  const editarInvestigacion = async (id, nombre, descripcion, fecha, documento, programa ) => {
    try {
      cargando.value=true;
      const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('fecha', fecha);
      formData.append('documento', documento);
      formData.append('programa', programa);
      const response = await axios.put(`${direccion}/investigacion/${id}`, formData,{
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      return response;
    } catch (error) {
      cargando.value=true;
      throw error;
    }finally{
      cargando.value=false;
    }
  };

  const cambiarEstado = async (id, estado) => {
    try {
      const res = await axios.put(`${direccion}/investigacion/estado/${id}`, {
        estado: estado,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    registrarInvestigacion,
    buscarInvestigaciones,
    buscarInvestigacionId,
    editarInvestigacion,
    cambiarEstado,
    cargando,
  };
});