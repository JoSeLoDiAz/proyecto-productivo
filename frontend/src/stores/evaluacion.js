import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { direccion } from "../routes/direccion.js";

export const useEvaluacionStore = defineStore("Evaluacion", () => {
  let cargando = ref(false);

  const archivo = async (id, archivo) => {
    try {
      cargando.value=true;
      const formData = new FormData();
      formData.append("archivo", archivo);
      let response = await axios.post(
        `${direccion}/evaluacion/archivo/${id}`,
        formData,
        {
          archivo: archivo,
        }
      );
      return response;
    } catch (error) {
      cargando.value=true;
      throw error;
    }finally{
      cargando.value=false;
    }
  };

  const registrarEvaluacion = async (info, archivo) => {
    try {
      cargando.value=true;
      const formData = new FormData();
      for (const key in info) {
        formData.append(key, info[key]);
      }
      formData.append('archivo', archivo);
      const datos = await axios.post(`${direccion}/evaluacion`, formData, {
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
  

  const buscarEvaluacion = async () => {
    try {
      cargando.value = true;
      const evaluacion = await axios.get(`${direccion}/evaluacion`);
      evaluacion.data.buscar.reverse();
      return evaluacion.data.buscar;
    } catch (error) {
      cargando.value = true;
      console.log("error");
      return error.response.data;
    } finally {
      cargando.value = false;
    }
  };

  const buscarEvaluacionCodigo = async (codigo) => {
    try {
      cargando.value = true;
      let response = await axios.get(`${direccion}/evaluacion/${codigo}`);
      return response.data;
    } catch (error) {
      cargando.value = true;
      throw error;
    }finally{
      cargando.value = false;
    }
  };

  const buscarEvaluacionId = async (id) => {
    try {
      cargando.value = true;
      let response = await axios.get(`${direccion}/evaluacion/id/${id}`);
      return response.data
    } catch (error) {
      cargando.value = true;
     throw error
    }finally{
      cargando.value = false;
    }
  };

  const editarEvaluacion = async (id, nombre, archivo ) => {
    try {
      cargando.value=true;
      const formData = new FormData();
        formData.append('nombre', nombre)
      formData.append('archivo', archivo);
      const response = await axios.put(`${direccion}/evaluacion/${id}`, formData,{
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
      const res = await axios.patch(`${direccion}/evaluacion/${id}`, {
        estado: estado,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    archivo,
    registrarEvaluacion,
    buscarEvaluacion,
    buscarEvaluacionCodigo,
    buscarEvaluacionId,
    editarEvaluacion,
    cambiarEstado,
    cargando,
  };
});
