import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { direccion } from "../routes/direccion.js";

export const useRegistroStore = defineStore("Registro", () => {
  let cargando=ref(false)

  const registrarRegistro = async (info) => {
    try {
      cargando.value=true;
      let datos = await axios.post(`${direccion}/registro`, info);
      return datos;
    } catch (error) {
      cargando.value=true;
      throw error;
    }finally{
      cargando.value=false;
    }
  };
  
  const buscarRegistro = async()=> {
    try {
    cargando.value=true
    const registro= await axios.get(`${direccion}/registro`)
    registro.data.buscar.reverse()
     return registro.data.buscar
    }catch (error) {
      cargando.value=true
      console.log("error");
      return error.response.data
    }finally{
      cargando.value=false
    }
    }

    const buscarRegistroCodigo = async (codigo) => {
      try {
        let response = await axios.get(`${direccion}/registro/${codigo}`);
        return response.data;
      } catch (error) {
       throw error
      }
    };
  
  const editarRegistro= async (id,titulootorgado,fecha,lugar, metodologia, snies, creditos ) => {
    try {
      cargando.value=true;
      const response = await axios.put(`${direccion}/registro/${id}`, {
        titulo_otorgado: titulootorgado,
        fecha: fecha,
        lugar: lugar,
        metodologia: metodologia,
        snies: snies,
        creditos: creditos

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
      const res = await axios.patch(`${direccion}/registro/${id}`, {
        estado: estado,
      });
      return res
    } catch (error) {
      console.log(error);
    }
  };

  return {
  registrarRegistro,
  buscarRegistro,
  buscarRegistroCodigo,
  editarRegistro,
  cambiarEstado,
  cargando
  };
  
});


