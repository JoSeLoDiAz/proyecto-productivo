<template>
  <div>
    <!-- Modal editar -->

     <div class="modal fade" id="modalRegistro" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="modalRegistroLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="modalRegistroLabel">
              Editar Registro Calificado
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body d-flex flex-column">

            <span>Titulo que Otorga</span>
            <input type="text" v-model="titulo">

            <span>Lugar Desarrollo de la Oferta</span>
            <input type="text" v-model="lugar" />

            <span>Fecha</span>
            <input type="date" v-model="fecha" />

            <span>Metodologia</span>
            <input type="text" v-model="metodologia" />

            <span>Número de creditos</span>
            <input type="text" v-model="creditos" />

            <span>Código SNIES</span>
            <input type="text" v-model="snies" />

          </div>

          <div v-if="alert === true">
            <svg xmlns="http://www.w3.org/2000/svg" class="d-none alerta">
              <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
                <path
                  d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                />
              </symbol>
            </svg>
            <div
              class="alert alert-warning d-flex align-items-center"
              role="alert"
            >
              <svg
                style="width: 20px; height: 20px"
                class="bi flex-shrink-0 me-2"
                role="img"
                aria-label="Warning:"
              >
                <use xlink:href="#exclamation-triangle-fill" />
              </svg>
              <div>
                {{ errores }}
              </div>
            </div>
          </div>

          <div v-if="usePrograma.cargando===true" class="row d-flex justify-content-center">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
        
          <div class="modal-footer" style="margin: auto;">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close" id="close1">
              Cancelar
            </button>
            <button type="button" class="btn btn-success"
              @click="registrarRegistroCalificado()">
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
<!-- ---------------------------------- -->
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10%;
      "
    >
    <router-link to="infoprograma">
        <img src="../assets/volver.png" style="width: 45px;height: 45px;left: -200px;position: relative;" alt="">
      </router-link>
      <p class="tituloo" style="font-size: 35px; font-weight: 1000">
        REGISTRO CALIFICADO
      </p>
    </div>
    <div class="contienediv">
      <div class="cuadrado">
        <br />

        <p class="titulos">Titulo que otorga:</p>
        <p class="respuestas">{{ registro.titulo }}</p>

        <p class="titulos">Fecha:</p>
        <p class="respuestas">{{ registro.fecha }}</p>

        <p class="titulos">Lugar de desarrollo de la oferta:</p>
        <p class="respuestas">{{ registro.lugar }}</p>

        <p class="titulos">Metodologia:</p>
        <p class="respuestas">{{ registro.metodologia }}</p>

        <p class="titulos">Numero de creditos:</p>
        <p class="respuestas">{{ registro.creditos }}</p>

        <p class="titulos">Código SNIES</p>
        <p class="respuestas">{{ registro.snies }}</p>

        <div class="modal-footer" v-if="useUsuario.rol==='Gestor'" style="margin: auto;">
          <button
            @click="editar(registro)"
            type="button"
            class="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#modalRegistro"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRegistroStore } from "../stores/registro.js";
import { ref, onMounted } from "vue";
import { useProgramaStore } from "../stores/programa.js";
import { useUsuarioStore } from "../stores/usuario";

const useregistro = useRegistroStore();
const usePrograma = useProgramaStore();
const useUsuario =useUsuarioStore();

// valores de modales
let titulo = ref('');
let lugar = ref('');
let fecha = ref('');
let metodologia = ref('');
let creditos = ref('');
let snies = ref('');
let registro= ref(usePrograma.idPrograma.registroCalificado)
console.log(registro.value);

let alert = ref(false);
let errores = ref("");

async function buscarPro(){
  await usePrograma.buscarProgramaId(usePrograma.idPrograma._id);
  registro.value=usePrograma.idPrograma.registroCalificado
}

function editar(registro){
titulo.value=registro.titulo,
lugar.value=registro.lugar,
fecha.value=registro.fecha,
metodologia.value=registro.metodologia,
creditos.value=registro.creditos,
snies.value=registro.snies
}

async function registrarRegistroCalificado(){
  await usePrograma.registrarRegistroCalificado(usePrograma.idPrograma._id,{
    titulo: titulo.value,
    lugar:lugar.value,
    fecha: fecha.value,
    metodologia:metodologia.value,
    creditos:creditos.value,
    snies:snies.value
  }).then(()=>{
    buscarPro()
    document.getElementById("close1").click();
    ok();
    limpiar();
  }).catch((err)=>{
    if (err.response && err.response.data.errors) {
        alert.value = true;
        errores.value = err.response.data.errors[0].msg;
        alerta();
      } else if (err.response && err.response.data.msg) {
        alert.value = true;
        errores.value = err.response.data.msg;
        alerta();
      }else if(err.response.data.error){
        alert.value = true;
      errores.value = 'Falta el archivo'
      alerta();
      }
  })
}

function ok() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Cambios guardados",
    showConfirmButton: false,
    timer: 1500,
  });
}


function limpiar() {
  titulo.value='',
lugar.value='',
fecha.value='',
metodologia.value='',
creditos.value='',
snies.value=''
}

function alerta() {
  setTimeout(() => {
    alert.value = false;
    errores.value = "";
  }, 1600);
}



onMounted(async()=>{
  await traigodatos()
});

import { useConfiguracionStore } from "../stores/configuracion.js";
const useConfiguracion = useConfiguracionStore();
let coloroficialmenu = ref()
let coloroficialletra = ref()
let coloroficialtres = ref()
let coloroficialcuatro = ref()
 async function traigodatos() {
  await  useConfiguracion.traerConfiguracion().then(resultado => {
  coloroficialmenu.value = resultado[0].colormenu
  coloroficialletra.value = resultado[0].colorletra  
  coloroficialtres.value = resultado[0].colortres
  coloroficialcuatro.value = resultado[0].colorcuatro
}).catch(error => {
  console.error('Hubo un error:', error);
});
}
</script>

<style scope>

.tituloo{
  text-transform: capitalize;
  color: v-bind(coloroficialletra);
}

.titulos {
  text-transform: capitalize;
  font-size: 20px;
  margin-left: 40px;
  font-weight: 1000;
}

.respuestas {
  text-transform: capitalize;
  font-size: 15px;
  margin-left: 40px;
}

.contienediv {
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  margin-top: 2%;
}

.cuadrado {
  -webkit-box-shadow: 1px 76px 300px -2px rgba(134, 138, 135, 1);
  -moz-box-shadow: 1px 76px 300px -2px rgba(134, 138, 135, 1);
  box-shadow: 1px 76px 300px -2px rgba(134, 138, 135, 1);

  border-radius: 10px;
  background-color: #fffbfb;
  width: 550px;
  height: 600px;
  margin-bottom: 3%;
}
</style>