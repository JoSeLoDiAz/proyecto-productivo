import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { direccion } from "../routes/direccion.js";

export const useDesarrolloStore = defineStore("Desarrollo", () => {
  let cargando=ref(false)
  let idDesarrollo=ref([]);
  let faseAnalisis =ref([]);
  let fasePlaneacion = ref([]);
  let faseEjecucion = ref([]);
  let faseEvaluacion = ref([]);

  const registrarDesarrollo = async () => {
    try {
      cargando.value=true;
      let datos = await axios.post(`${direccion}/desarrollo`);
      return datos;
    } catch (error) {
      cargando.value=true;
      throw error;
    }finally{
      cargando.value=false;
    }
  };

  const registrarDesarrolloGuia = async (id,info, archivo) => {
    try {
      cargando.value=true;
      const formData = new FormData();
      for (const key in info) {
        formData.append(key, info[key]);
      }
      formData.append('archivo', archivo);
      const datos = await axios.post(`${direccion}/desarrollo/agregar/guia/${id}`, formData, {
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

  const registrarMatriz = async (id,matriz_correlacion) => {
    try {
      cargando.value=true;
      const formData = new FormData();
      formData.append('matriz_correlacion', matriz_correlacion);
      const datos = await axios.post(`${direccion}/desarrollo/matriz/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      return datos;
    } catch (error) {
      cargando.value=true;
      throw error;
    }finally{
      cargando.value=false
    }
  };

  const registrarProyecto = async (id,proyecto) => {
    try {
      cargando.value=true;
      const formData = new FormData();
      formData.append('proyecto', proyecto);
      const datos = await axios.post(`${direccion}/desarrollo/proyecto/${id}`, formData, {
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
  
  const registrarplaneacion = async (id,planeacion) => {
    try {
      cargando.value=true;
      const formData = new FormData();
      formData.append('planeacion', planeacion);
      const datos = await axios.post(`${direccion}/desarrollo/planeacion/${id}`, formData, {
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

  const archivoMatriz= async(id)=>{
try {
  cargando.value=true;
  const matriz= await axios.get(`${direccion}/desarrollo/archivo/matriz/${id}`)
  return matriz.data.url
} catch (error) {
  cargando.value=true;
  throw error;
}finally{
  cargando.value=false;
}
  };

  const archivoProyecto= async(id)=>{
    try {
      cargando.value=true;
      const matriz= await axios.get(`${direccion}/desarrollo/archivo/proyecto/${id}`)
      return matriz.data.url
    } catch (error) {
      cargando.value=true;
      throw error;
    }finally{
      cargando.value=false;
    }
      };

      const archivoPlaneacion= async(id)=>{
        try {
          cargando.value=true;
          const matriz= await axios.get(`${direccion}/desarrollo/archivo/planeacion/${id}`)
          return matriz.data.url
        } catch (error) {
          cargando.value=true;
          throw error;
        }finally{
          cargando.value=false;
        }
          };

  const buscarDesarrollo= async()=> {
    try {
    cargando.value=true
    const desarrollo= await axios.get(`${direccion}/desarrollo`)
    desarrollo.data.buscar.reverse();
    console.log(desarrollo.data.buscar);
     return desarrollo.data.buscar
    }catch (error) {
      cargando.value=true
      console.log(error);
      return error.response
    }finally{
      cargando.value=false
    }
    }
    const buscarDesarrolloCodigo = async (codigo) => {
      try {
        let response = await axios.get(`${direccion}/desarrollo/${codigo}`);
        return response.data;
      } catch (error) {
       throw error
      }
    };

    const buscarDesarrolloId = async (id) => {
      try {
        cargando.value=true;
        let response = await axios.get(`${direccion}/desarrollo/id/${id}`);
        idDesarrollo.value = response.data
        const analisisFase = idDesarrollo.value.guia.filter((guia) => guia.fase === "analisis");
          faseAnalisis.value=analisisFase
        
        const planeacionFase = idDesarrollo.value.guia.filter((guia) => guia.fase === "planeacion");       
          fasePlaneacion.value=planeacionFase        
        
        const ejecucionFase = idDesarrollo.value.guia.filter((guia) => guia.fase === "ejecucion");
          faseEjecucion.value=ejecucionFase
        
        const evaluacionFase = idDesarrollo.value.guia.filter((guia) => guia.fase === "evaluacion");
          faseEvaluacion.value=evaluacionFase
        
      } catch (error) {
        cargando.value=true;
       throw error
      }finally{
        cargando.value=false;
      }
    };
  
  const editarDesarrollo = async (id,codigo, matriz_correlacion, proyecto, planeacion, guia ) => {
    try {
      cargando.value=true;
      const response = await axios.put(`${direccion}/desarrollo/${id}`, {
        codigo: codigo,
        matriz_correlacion: matriz_correlacion,
        proyecto: proyecto,
        planeacion: planeacion,
        guia: guia
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
      const res = await axios.patch(`${direccion}/desarrollo/${id}`, {
        estado: estado,
      });
      return res
    } catch (error) {
      console.log(error);
    }
  };


  return {
  registrarDesarrollo,
  registrarDesarrolloGuia,
  registrarMatriz,
  registrarProyecto,
  registrarplaneacion,
  archivoMatriz,
  archivoProyecto,
  archivoPlaneacion,
  buscarDesarrollo,
  buscarDesarrolloCodigo,
  buscarDesarrolloId,
  editarDesarrollo,
  cambiarEstado,
  idDesarrollo,
  cargando,
  faseAnalisis,
  fasePlaneacion,
  faseEjecucion,
  faseEvaluacion
  };
  
},
{persist:true});


