import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { direccion } from "../routes/direccion.js";

export const useMaterialStore = defineStore("Material", () => {
  let cargando=ref(false)

  const archivo = async (id,archivo)=>{
    try {
      cargando.value=true;
      const formData = new FormData();
            formData.append('archivo', archivo);
      let response = await axios.post(`${direccion}/material/archivo/${id}`, formData,{
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

  const registrarMaterial = async (info,archivo) => {
    try {
      cargando.value=true;
      const formData = new FormData();
  
      for (const key in info) {
        formData.append(key, info[key]);
      }
  
      formData.append('archivo', archivo);
  
      const datos = await axios.post(`${direccion}/material`, formData, {
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
  
  const buscarMaterial = async()=> {
    try {
    cargando.value=true
    const material= await axios.get(`${direccion}/material`)
    material.data.buscar.reverse()
     return material.data.buscar
    }catch (error) {
      cargando.value=true
      return error.response.data
    }finally{
      cargando.value=false
    }
    }
    const buscarMaterialCodigo = async (codigo) => {
      try {
        cargando.value = true;
        let response = await axios.get(`${direccion}/material/${codigo}`);
        return response.data;
      } catch (error) {
        cargando.value = true;
       throw error
      }finally{
        cargando.value = false;
      }
    };

    const buscarMaterialId = async (id) => {
      try {
        cargando.value = true;
        let response = await axios.get(`${direccion}/material/id/${id}`);
        return response.data
      } catch (error) {
        cargando.value = true;
       throw error
      }finally{
        cargando.value = false;
      }
    };
  
  const editarMaterial = async (id, nombre, archivo ) => {
    try {
      cargando.value=true;
      const formData = new FormData();
        formData.append('nombre', nombre)
      formData.append('archivo', archivo);
      const response = await axios.put(`${direccion}/material/${id}`, formData,{
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
      const res = await axios.patch(`${direccion}/material/${id}`, {
        estado: estado,
      });
      return res
    } catch (error) {
      console.log(error);
    }
  };

  return {
    archivo,
  registrarMaterial,
  buscarMaterial,
  buscarMaterialCodigo,
  buscarMaterialId,
  editarMaterial,
  cambiarEstado,
  cargando
  };
  
});


