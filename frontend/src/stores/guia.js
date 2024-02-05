import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { direccion } from "../routes/direccion.js";

export const useGuiaStore = defineStore("Guia", () => {
  let cargando=ref(false)
  let idGuia = ref([])
  

  const archivo = async (id,archivo)=>{
    try {
      cargando.value=true;
      const formData = new FormData();
            formData.append('archivo', archivo);
      let response = await axios.post(`${direccion}/guia/archivo/${id}`, formData,{
        archivo:archivo
      })
      return response
    } catch (error) {
      cargando.value=true;
      throw error
    }finally{
      cargando.value=false;
    }
      }
        

  const registrarGuia = async (id,info,archivo) => {
    try {
      cargando.value=true;
      const formData = new FormData();
      for (const key in info) {
        formData.append(key, info[key]);
      }
      formData.append('archivo', archivo);
      const datos = await axios.post(`${direccion}/programa/agregar/guia/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      return datos;
    } catch (error) {
      cargando.value=true;
      throw error;
    }finally{
      cargando.value=false;
    }
  };

  const agregarMaterial = async (id,info,archivo) => {
    try {
      cargando.value=true;
      const formData = new FormData();
      for (const key in info) {
        formData.append(key, info[key]);
      }
      formData.append('archivo', archivo);
      const datos = await axios.post(`${direccion}/guia/agregar/material/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      return datos;
    } catch (error) {
      cargando.value=true;
      throw error;
    }finally{
      cargando.value=false;
    }
  };

  const agregarEvaluacion = async (id,info, archivo) => {
    try {
      cargando.value=true;
      const formData = new FormData();
      for (const key in info) {
        formData.append(key, info[key]);
      }
      formData.append('archivo', archivo);
      const datos = await axios.post(`${direccion}/guia/agregar/evaluacion/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      return datos;
    } catch (error) {
      cargando.value=true;
      throw error;
    }finally{
      cargando.value=false;
    }
  };
  
  const buscarGuia = async()=> {
    try {
    cargando.value=true
    const guia= await axios.get(`${direccion}/guia`)
    guia.data.buscar.reverse()
     return guia.data.buscar
    }catch (error) {
      cargando.value=true
      console.log("error");
      return error.response
    }finally{
      cargando.value=false
    }
    };

    const buscarGuiaCodigo = async (codigo) => {
      try {
        cargando.value=true;
        let response = await axios.get(`${direccion}/guia/${codigo}`);
        return response.data;
      } catch (error) {
        cargando.value=true;
       throw error
      }finally{
        cargando.value=false;
      }
    };

    const buscarGuiaId = async (id) => {
      try {
        cargando.value=true;
        let response = await axios.get(`${direccion}/guia/id/${id}`);
        idGuia.value = response.data
      } catch (error) {
        cargando.value=true;
       throw error
      }finally{
        cargando.value=false;
      }
    };
  
  const editarGuia = async (id,codigo, nombre,fase, archivo ) => {
    try {
      cargando.value=true;
      const formData = new FormData();
        formData.append('codigo',codigo);
        formData.append('nombre', nombre);
        formData.append('fase', fase);
      formData.append('archivo', archivo);
      const response = await axios.put(`${direccion}/guia/${id}`, formData,{
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
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
      const res = await axios.patch(`${direccion}/guia/${id}`, {
        estado: estado,
      });
      return res
    } catch (error) {
      console.log(error);
    }
  };

  return {
  archivo,
  registrarGuia,
  agregarMaterial,
  agregarEvaluacion,
  buscarGuia,
  buscarGuiaCodigo,
  buscarGuiaId,
  editarGuia,
  cambiarEstado,
  idGuia,
  cargando
  };
},
{persist:true}
);


