import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { direccion } from "../routes/direccion.js";

export const useMaterialFormacionStore = defineStore("MaterialFormacion", () => {
  let cargando = ref(false);

  const registrarMaterialFormacion = async (info, archivo) => {
    try {
      cargando.value = true;
      const formData = new FormData();
      for (const key in info) {
        formData.append(key, info[key]);
      }
      formData.append("archivo", archivo);
      const datos = await axios.post(`${direccion}/materialformacion`, formData, {
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

  const buscarMaterialFormacion = async () => {
    try {
      cargando.value = true;
      const materialformacion = await axios.get(`${direccion}/materialformacion`);
      materialformacion.data.buscar.reverse();
      return materialformacion.data.buscar;
    } catch (error) {
      cargando.value = true;
      return error.response.data;
    } finally {
      cargando.value = false;
    }
  };

  const buscarMaterialFormacionCodigo = async (codigo) => {
    cargando.value=true
    try {
      let response = await axios.get(`${direccion}/materialformacion/${codigo}`);
      return response.data;
    } catch (error) {
      cargando.value=true
      throw error;
    }finally{
      cargando.value=false
    }
  };

  const editarMaterialFormacion = async (
    id,
    nombre,
    tipo,
    descripcion,
    archivo
  ) => {
    try {
      cargando.value = true;
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("tipo", tipo);
      formData.append("descripcion", descripcion);
      formData.append("archivo", archivo);
      const response = await axios.put(
        `${direccion}/materialformacion/${id}`,
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
      const res = await axios.patch(`${direccion}/materialformacion/${id}`, {
        estado: estado,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    registrarMaterialFormacion,
    buscarMaterialFormacion,
    buscarMaterialFormacionCodigo,
    editarMaterialFormacion,
    cambiarEstado,
    cargando,
  };
});