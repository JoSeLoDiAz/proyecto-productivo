import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { direccion } from "../routes/direccion.js";

export const useRetroalimentacionStore = defineStore("Retroalimentacion", () => {
  let cargando=ref(false)

  const archivo = async (id,archivo)=>{
    try {
      cargando.value=true;
      const formData = new FormData();
            formData.append('archivo', archivo);
      let response = await axios.post(`${direccion}/retroalimentacion/archivo/${id}`, formData,{
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

  const registrarRetroalimentacion = async (info, archivo) => {
    try {
      cargando.value=true;
      const formData = new FormData();
      for (const key in info) {
        formData.append(key, info[key]);
      }
      formData.append('archivo', archivo);
      const datos = await axios.post(`${direccion}/retroalimentacion`, formData, {
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
  
  const buscarRetroalimentacion = async()=> {
    try {
    cargando.value=true
    const Retroalimentacion= await axios.get(`${direccion}/retroalimentacion`)
    Retroalimentacion.data.buscar.reverse()
     return Retroalimentacion.data.buscar
    }catch (error) {
      cargando.value=true
      console.log("error");
      return error.response.data
    }finally{
      cargando.value=false
    }
    }

    const buscarRetroalimentacionCodigo = async (codigo) => {
      try {
        let response = await axios.get(`${direccion}/retroalimentacion/${codigo}`);
        return response.data;
      } catch (error) {
       throw error
      }
    };
  
  const editarRetroalimentacion= async (id, nombre, codigo_ficha, descripcion, fecha, archivo,
    programa ) => {
      try {
        cargando.value=true;
        const formData = new FormData();
          formData.append('nombre', nombre);
          formData.append('codigo_ficha', codigo_ficha);
          formData.append('descripcion', descripcion);
          formData.append('fecha', fecha);
        formData.append('archivo', archivo);
        formData.append('programa', programa);
        const response = await axios.put(`${direccion}/retroalimentacion/${id}`, formData,{
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
      const res = await axios.patch(`${direccion}/retroalimentacion/${id}`, {
        estado: estado,
      });
      return res
    } catch (error) {
      console.log(error);
    }
  };

  return {
    archivo,
  registrarRetroalimentacion,
  buscarRetroalimentacion,
  buscarRetroalimentacionCodigo,
  editarRetroalimentacion,
  cambiarEstado,
  cargando
  };
  
});