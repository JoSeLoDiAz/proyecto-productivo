import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { direccion } from "../routes/direccion.js";

export const useAmbienteStore = defineStore("Ambiente", () => {
  let cargando=ref(false)

  const registrarAmbiente = async (info) => {
    try {
      cargando.value=true
      let datos = await axios.post(`${direccion}/ambiente`, info);
      return datos;
    } catch (error) {
      cargando.value=true
      throw error;
    }finally{
      cargando.value=false
    }
  };
  
  const buscarAmbiente= async()=> {
    try {
    cargando.value=true
    const ambiente= await axios.get(`${direccion}/ambiente`)
    ambiente.data.buscar.reverse()
     return ambiente.data.buscar
    }catch (error) {
      cargando.value=true;
      return error.response
    }finally{
      cargando.value=false
    }
    }
    const buscarAmbienteNombre = async (nombre) => {
      try {
        cargando.value=true;
        let response = await axios.get(`${direccion}/ambiente/${nombre}`);
        return response.data;
      } catch (error) {
        cargando.value=true;
       throw error
      }finally{
        cargando.value=false;
      }
    };
  
  const editarAmbiente = async (id,nombre,capacidad,tipo_ambiente,equipamiento,sede) => {
    try {
      cargando.value=true
      const response = await axios.put(`${direccion}/ambiente/${id}`, {
        nombre: nombre,
        capacidad: capacidad,
        tipo_ambiente: tipo_ambiente,
        equipamiento: equipamiento,
        sede: sede
      });
      return response;
    } catch (error) {
      cargando.value=true
      throw error;
    }finally{
      cargando.value=false
    }
  };

  const cambiarEstado = async (id, estado) => {
    try {
      const res = await axios.patch(`${direccion}/ambiente/${id}`, {
        estado: estado,
      });
      return res
    } catch (error) {
      console.log(error);
    }
  };

  return {
  registrarAmbiente,
  buscarAmbiente,
  buscarAmbienteNombre,
  editarAmbiente,
  cambiarEstado,
  cargando
  };
  
});


