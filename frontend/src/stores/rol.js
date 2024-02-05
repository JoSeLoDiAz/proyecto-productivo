import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { direccion } from "../routes/direccion.js";

export const useRolStore = defineStore("Rol", () => {
  let cargando=ref(false)
  let idRol=ref([])

  const registrarRol = async (info) => {
    try {
      cargando.value=true;
      let datos = await axios.post(`${direccion}/rol`, info);
      return datos;
    } catch (error) {
      cargando.value=true;
      throw error;
    }finally{
      cargando.value=false;
    }
  };
  
  const buscarRol = async()=> {
    try {
    cargando.value=true
    const rol= await axios.get(`${direccion}/rol`)
    rol.data.buscar.reverse()
     return rol.data.buscar
    }catch (error) {
      cargando.value=true
      console.log("error");
      return error.response.data
    }finally{
      cargando.value=false
    }
    }

    const buscarRolCodigo = async (codigo) => {
      try {
        let response = await axios.get(`${direccion}/rol/${codigo}`);
        return response.data;
      } catch (error) {
       throw error
      }
    };

    const buscarRolId = async (id) => {
      try {
        let response = await axios.get(`${direccion}/rol/id/${id}`);
        idRol.value = response.data
      } catch (error) {
       throw error
      }
    };
  
  const editarRol= async (id, denominacion) => {
    try {
      cargando.value=true;
      const response = await axios.put(`${direccion}/rol/${id}`, {
        denominacion: denominacion,

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
      const res = await axios.patch(`${direccion}/rol/${id}`, {
        estado: estado,
      });
      return res
    } catch (error) {
      console.log(error);
    }
  };

  return {
  registrarRol,
  buscarRol,
  buscarRolCodigo,
  buscarRolId,
  editarRol,
  cambiarEstado,
  cargando,
  idRol
  };
  
},{
  persist:true
});


