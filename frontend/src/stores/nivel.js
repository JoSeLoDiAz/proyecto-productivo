import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { direccion } from "../routes/direccion.js";

export const useNivelStore = defineStore("Nivel", () => {
  let cargando=ref(false)

  const registrarNivel = async (info) => {
    try {
      cargando.value=true;
      let datos = await axios.post(`${direccion}/nivel`, info);
      return datos;
    } catch (error) {
      cargando.value=true;
      throw error;
    }finally{
      cargando.value=false;
    }
  };
  
  const buscarNivel = async()=> {
    try {
    cargando.value=true
    const nivel= await axios.get(`${direccion}/nivel`)
    nivel.data.buscar.reverse()
     return nivel.data.buscar
    }catch (error) {
      cargando.value=true
      console.log("error");
      return error.response.data
    }finally{
      cargando.value=false
    }
    }
    const buscarNivelCodigo = async (codigo) => {
      try {
        let response = await axios.get(`${direccion}/nivel/${codigo}`);
        return response.data;
      } catch (error) {
       throw error
      }
    };
  
  const editarNivel = async (id,denominacion,descripcion) => {
    try {
      cargando.value=true;
      const response = await axios.put(`${direccion}/nivel/${id}`, {
        denominacion:denominacion,
        descripcion: descripcion,

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
      const res = await axios.patch(`${direccion}/nivel/${id}`, {
        estado: estado,
      });
      return res
    } catch (error) {
      console.log(error);
    }
  };

  return {
  registrarNivel,
  buscarNivel,
  buscarNivelCodigo,
  editarNivel,
  cambiarEstado,
  cargando
  };
  
});


