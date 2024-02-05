import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { direccion } from "../routes/direccion.js";

export const useCiudadStore = defineStore("Ciudad", () => {
  let cargando=ref(false)

  const registrarCiudad = async (info) => {
    try {
      cargando.value=true;
      let datos = await axios.post(`${direccion}/ciudad`, info);
      return datos;
    } catch (error) {
      cargando.value=true;
      throw error;
    }finally{
      cargando.value=false;
    }
  };
  
  const buscarCiudad= async()=> {
    try {
    cargando.value=true
    const ciudad= await axios.get(`${direccion}/ciudad`)
    ciudad.data.buscar.reverse()
     return ciudad.data.buscar
    }catch (error) {
      cargando.value=true
      console.log("error");
      return error.response.data
    }finally{
      cargando.value=false
    }
    }
    const buscarCiudadCodigo = async (codigo) => {
      try {
        let response = await axios.get(`${direccion}/ciudad/${codigo}`);
        return response.data;
      } catch (error) {
       throw error
      }
    };
  
  const editarCiudad = async (id,nombre,daneciudad,region, departamento, danedepartamento) => {
    try {
      cargando.value=true;
      const response = await axios.put(`${direccion}/ciudad/${id}`, {
        nombre: nombre,
        daneciudad: daneciudad,
        region: region,
        departamento: departamento,
        danedepartamento: danedepartamento,
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
      const res = await axios.patch(`${direccion}/ciudad/${id}`, {
        estado: estado,
      });
      return res
    } catch (error) {
      console.log(error);
    }
  };

  return {
  registrarCiudad,
  buscarCiudad,
  buscarCiudadCodigo,
  editarCiudad,
  cambiarEstado,
  cargando
  };
  
});


