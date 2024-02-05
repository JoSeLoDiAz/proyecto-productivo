import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { direccion } from "../routes/direccion.js";

export const useCentroStore = defineStore(
  "Centro",
  () => {
    let cargando = ref(false);
    let idCentro = ref([]);

    const registrarCentro = async (info) => {
      try {
        cargando.value = true;
        let datos = await axios.post(`${direccion}/centro`, info);
        return datos;
      } catch (error) {
        cargando.value = true;
        throw error;
      } finally {
        cargando.value = false;
      }
    };

    const buscarCentro = async () => {
      try {
        cargando.value = true;
        const centro = await axios.get(`${direccion}/centro`);
        centro.data.buscar.reverse();
        return centro.data.buscar;
      } catch (error) {
        cargando.value = true;
        return error.response.data;
      } finally {
        cargando.value = false;
      }
    };

    const buscarCentroCodigo = async (codigo) => {
      try {
        cargando.value = true;
        let response = await axios.get(`${direccion}/centro/${codigo}`);
        return response.data;
      } catch (error) {
        cargando.value = true;
        throw error;
      } finally {
        cargando.value = false;
      }
    };

    const buscarCentroId = async (id) => {
      try {
        cargando.value = true;
        let response = await axios.get(`${direccion}/centro/id/${id}`);
        idCentro.value= response.data
      } catch (error) {
        cargando.value = true;
        throw error;
      } finally {
        cargando.value = false;
      }
    };

    const editarCentro = async (id, codigo, nombre, ubicacion, ciudad) => {
      try {
        cargando.value = true;
        const response = await axios.put(`${direccion}/centro/${id}`, {
          codigo: codigo,
          nombre: nombre,
          direccion: ubicacion,
          ciudad: ciudad,
        });
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
        const res = await axios.patch(`${direccion}/centro/${id}`, {
          estado: estado,
        });
        return res;
      } catch (error) {
        console.log(error);
      }
    };

    return {
      registrarCentro,
      buscarCentro,
      buscarCentroCodigo,
      buscarCentroId,
      editarCentro,
      cambiarEstado,
      idCentro,
      cargando,
    };
  },
  { persist: true }
);
