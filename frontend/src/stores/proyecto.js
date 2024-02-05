import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { direccion } from "../routes/direccion.js";

export const useProyectoStore = defineStore("Proyecto", () => {
  let cargando = ref(false);

  const archivo = async (id, archivo) => {
    try {
      cargando.value = true;
      const formData = new FormData();
      formData.append("archivo", archivo);
      let response = await axios.post(
        `${direccion}/proyecto/archivo/${id}`,
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

  const registrarProyecto = async (info, archivo) => {
    try {
      cargando.value = true;
      const formData = new FormData();
      for (const key in info) {
        formData.append(key, info[key]);
      }
      formData.append("archivo", archivo);
      const datos = await axios.post(`${direccion}/proyecto`, formData, {
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

  const buscarProyecto = async () => {
    try {
      cargando.value = true;
      const proyecto = await axios.get(`${direccion}/proyecto`);
      proyecto.data.buscar.reverse();
      return proyecto.data.buscar;
    } catch (error) {
      cargando.value = true;
      console.log("error");
      return error.response.data;
    } finally {
      cargando.value = false;
    }
  };

  const buscarProyectoCodigo = async (codigo,programa) => {
    cargando.value=true
    try {
      let response = await axios.get(`${direccion}/proyecto/${codigo}/${programa}`);
      return response.data;
    } catch (error) {
      cargando.value=true
      throw error;
    }finally{
      cargando.value=false
    }
  };

  const editarProyecto = async (
    id,
    nombre,
    descripcion,
    fecha,
    version,
    archivo,
    programa
  ) => {
    try {
      cargando.value = true;
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("descripcion", descripcion);
      formData.append("fecha", fecha);
      formData.append("version", version);
      formData.append("archivo", archivo);
      formData.append("programa", programa);
      const response = await axios.put(
        `${direccion}/proyecto/${id}`,
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
      const res = await axios.patch(`${direccion}/proyecto/${id}`, {
        estado: estado,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    archivo,
    registrarProyecto,
    buscarProyecto,
    buscarProyectoCodigo,
    editarProyecto,
    cambiarEstado,
    cargando,
  };
});
