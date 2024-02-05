import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { direccion } from "../routes/direccion.js";

export const useSedeStore = defineStore("Sede", () => {
  let cargando=ref(false)

  const registrarSede = async (info) => {
    try {
      cargando.value=true;
      let datos = await axios.post(`${direccion}/sedes`, info);
      return datos;
    } catch (error) {
      cargando.value=true;
      throw error;
    }finally{
      cargando.value=false;
    }
  };
  
  const buscarSede = async()=> {
    try {
    cargando.value=true
    const sede= await axios.get(`${direccion}/sedes`)
    sede.data.buscar.reverse()
     return sede.data.buscar
    }catch (error) {
      cargando.value=true
      console.log(error);
      return error.response
    }finally{
      cargando.value=false
    }
    }

    const buscarSedeCodigo = async (codigo) => {
      try {
        let response = await axios.get(`${direccion}/sedes/${codigo}`);
        return response.data;
      } catch (error) {
       throw error
      }
    };
  
  const editarSede= async (id,nombre,lugar,contacto,centro) => {
    try {
      cargando.value=true;
      const response = await axios.put(`${direccion}/sedes/${id}`, {
        nombre: nombre,
        direccion: lugar,
        contacto: contacto,
        centro:centro
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
      const res = await axios.patch(`${direccion}/sedes/${id}`, {
        estado: estado,
      });
      return res
    } catch (error) {
      console.log(error);
    }
  };


  return {
  registrarSede,
  buscarSede,
  buscarSedeCodigo,
  editarSede,
  cambiarEstado,
  cargando
  };
  
});


