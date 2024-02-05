import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { direccion } from "../routes/direccion.js";

export const useConfiguracionStore = defineStore("Configuracion", () => {
  let cargando=ref(false)

  const agregarConfiguracion = async (info) => {
    try {
      cargando.value=true;
      let datos = await axios.post(`${direccion}/configuracion`, info);
      return datos;
    } catch (error) {
      cargando.value=true;
      throw error;
    }finally{
      cargando.value=false;
    }
  };

  const  traerConfiguracion = async()=> {
    try {
    cargando.value=true
    const ciudad= await axios.get(`${direccion}/configuracion`)
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

  
  const editarConfiguracion = async (id,colorletra,colormenu,colortres,colorcuatro) => {
    try {
      cargando.value=true;
      const response = await axios.put(`${direccion}/configuracion/${id}`, {
        colorletra: colorletra,
        colormenu: colormenu,
        colortres:colortres,
        colorcuatro:colorcuatro
      });
      return response;
    } catch (error) {
      cargando.value=true;
      throw error;
    }finally{
      cargando.value=false;
    }
  };


  return {
agregarConfiguracion,
traerConfiguracion,
editarConfiguracion,
cargando
  };
  
});


