import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { direccion } from "../routes/direccion.js";

export const useRedStore = defineStore("Red", () => {
  let cargando=ref(false)
let idRed=ref([]);


  const registrarRed = async (info) => {
    try {
      cargando.value=true;
      let datos = await axios.post(`${direccion}/red`, info);
      return datos;
    } catch (error) {
      cargando.value=true;
      throw error;
    }finally{
      cargando.value=false;
    }
  };

  const registarProgramaRed = async (id, info) =>{
    try {
      cargando.value=true;
      const formData = new FormData();
        for (const key in info) {
          formData.append(key, info[key]);
        }
        formData.append("disenoCurricular", disenoCurricular);
      let datos = await axios.post(`${direccion}/red/agregar/programa/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return datos
    } catch (error) {
      cargando.value=true;
      throw error
    }finally{
      cargando.value=false;
    }
  }

  
  const buscarRed = async()=> {
    try {
    cargando.value=true
    const red= await axios.get(`${direccion}/red`)
    red.data.buscar.reverse()
     return red.data.buscar
    }catch (error) {
      cargando.value=true
      console.log("error");
      return error.response.data
    }finally{
      cargando.value=false
    }
    }


    const buscarRedCodigo = async (codigo) => {
      try {
        let response = await axios.get(`${direccion}/red/${codigo}`);
        return response.data;
      } catch (error) {
       throw error
      }
    };

    const buscarRedId = async (id) => {
      try {
        let response = await axios.get(`${direccion}/red/id/${id}`);
        idRed.value = response.data;
      } catch (error) {
       throw error
      }
    };

  const editarRed= async (id, nombre) => {
    try {
      cargando.value=true;
      const response = await axios.put(`${direccion}/red/${id}`, {
        nombre: nombre,

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
      const res = await axios.patch(`${direccion}/red/${id}`, {
        estado: estado,
      });
      return res
    } catch (error) {
      console.log(error);
    }
  };

  return {
  registrarRed,
  registarProgramaRed,
  buscarRed,
  buscarRedCodigo,
  buscarRedId,
  editarRed,
  cambiarEstado,
  cargando,
  idRed,
  };
  
},{
  persist:true
});


