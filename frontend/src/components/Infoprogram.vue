<template>
  <div>
    <div class="row">
      <div style="display: flex; justify-content: center; align-items: center">
        <h1 class="titulo">
          <router-link to="programas">
            <img
              src="../assets/volver.png"
              style="width: 45px; height: 45px; left: -20px; position: relative"
              alt=""
            />
          </router-link>
          <!-- <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><router-link >{{  }}</router-link></li>
    <li class="breadcrumb-item active" aria-current="page"><router-link :to="hacia">{{ hacia }}</router-link> </li>
  </ol>
</nav> -->
          Programa {{ usePrograma.idPrograma.nombre }}
        </h1>
      </div>
    </div>

    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              Editar diseño curricular
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <span>Archivo</span>
            <span class="mi-archivo">
              <input
                type="file"
                accept=".pdf, .doc, .docx"
                @change="llevar"
                id="mi-archivo"
                name="mi-archivo"
              />
            </span>
            <label for="mi-archivo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="iborrainputfile"
                width="20"
                height="17"
                viewBox="0 0 20 17"
              >
                <path
                  d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"
                ></path>
              </svg>
              <span style="margin: 0 10px" v-if="archivo === null"
                >Archivo</span
              >
              <span style="margin: 0 10px" v-else>{{ archivo.name }}</span>
            </label>
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

          <div
            v-if="usePrograma.cargando === true"
            class="row d-flex justify-content-center"
          >
            <div class="spinner-border text-success" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div class="modal-footer" style="margin: auto">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              :style="{ color: coloroficialtres }"
              id="close"
            >
              Cancelar
            </button>
            <button
              v-if="msg_modal == 'Agregar Evaluación'"
              type="button"
              class="btn btn-success"
            >
              Agregar
            </button>
            <button
              v-else
              type="button"
              class="btn"
              @click="editarDiseno()"
              :style="{
                color: coloroficialtres,
                backgroundColor: coloroficialmenu,
              }"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- clean -->

    <div class="centrarcards">
      <div class="card zoom">
        <div class="card-body">
          <h5 class="card-title">Diseño curricular</h5>
          <p class="card-text">
            <a :href="linkD" target="_blank"
              ><img
                style="width: 40px; height: 40px; margin-right: 60%"
                src="../assets/descargar2.png"
                alt=""
            /></a>
            <img
              v-if="useUsuarios.rol === 'Gestor'.toLowerCase()"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              style="width: 40px; height: 40px"
              src="../assets/editar1.png"
              alt=""
            />
          </p>
        </div>
      </div>

      <router-link style="text-decoration: none" to="/desarrollo">
        <div class="card zoom">
          <div class="card-body">
            <h5 class="card-title">Desarrollo curricular.</h5>
          </div>
        </div>
      </router-link>

      <router-link style="text-decoration: none" to="/retroalimentacion">
        <div class="card zoom">
          <div class="card-body">
            <h5 class="card-title">Retroalimentación de Red</h5>
          </div>
        </div>
      </router-link>

      <router-link style="text-decoration: none" to="/ambientes">
        <div class="card zoom">
          <div class="card-body">
            <h5 class="card-title">Ambientes de formación</h5>
          </div>
        </div>
      </router-link>

      <router-link style="text-decoration: none" to="/proyectos">
        <div class="card zoom">
          <div class="card-body">
            <h5 class="card-title">Proyectos</h5>
          </div>
        </div>
      </router-link>

      <router-link style="text-decoration: none" to="/materialesprograma">
        <div class="card zoom">
          <div class="card-body">
            <h5 class="card-title">Materiales de Formación</h5>
          </div>
        </div>
      </router-link>

      <router-link style="text-decoration: none" to="/investigacion">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Investigación</h5>
          </div>
        </div>
      </router-link>

      <router-link style="text-decoration: none" to="/registros">
        <div
          v-if="usePrograma.idPrograma.registroCalificado"
          class="card zoom"
          style="width: 18rem; cursor: pointer"
        >
          <div class="card-body">
            <h5 class="card-title">Registro Calificado</h5>
          </div>
        </div>
      </router-link>

      <div
        v-if="
          usePrograma.idPrograma.nivel.denominacion === 'Tecnologo' &&
          !usePrograma.idPrograma.registroCalificado &&
          useUsuarios.rol === 'Gestor'
        "
        class="card"
        style="width: 18rem; cursor: pointer"
        data-bs-toggle="modal"
        data-bs-target="#modalRegistro"
      >
        <div class="card-body">
          <h5 class="card-title">Crear Registro Calificado</h5>
        </div>
      </div>
    </div>

    <!-- modal registro calificado -->
    <div
      class="modal fade"
      id="modalRegistro"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="modalRegistroLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="modalRegistroLabel">
              Crear Registro Calificado
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body d-flex flex-column">
            <span>Titulo que Otorga</span>
            <input type="text" v-model="titulo" />

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

          <div
            v-if="usePrograma.cargando === true"
            class="row d-flex justify-content-center"
          >
            <div class="spinner-border text-success" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <div class="modal-footer" style="margin: auto">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="close1"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="btn btn-success"
              @click="registrarRegistroCalificado()"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useProgramaStore } from "../stores/programa.js";
import { useUsuarioStore } from "../stores/usuario.js";
import { useRouteStore } from "../stores/store.js";

const router = useRouter();
const usePrograma = useProgramaStore();
const useUsuarios = useUsuarioStore();
const useRoute = useRouteStore();

let archivo = ref(null);
let errores = ref("");
let alert = ref(false);
let id = ref("");
let titulo = ref("");
let lugar = ref("");
let fecha = ref("");
let metodologia = ref("");
let creditos = ref("");
let snies = ref("");
let linkD = ref(usePrograma.idPrograma.disenoCurricular);
let rutas = ref([])
let hacia = ref("");

const setDocumentTitle = () => {
  document.title = `Legado Sena || Programa ${usePrograma.idPrograma.nombre}`;
};

function ruta (ruta){
  hacia.value= useRoute.setRoute(ruta);
  rutas.value.push(ruta);
  console.log(rutas.value);
}
// function ruta(){
//   rutas.value.push(router.currentRoute.value.path)
//   console.log(rutas.value);
// }

function programaId() {
  id.value = usePrograma.idPrograma._id;
}

function llevar(event) {
  archivo.value = event.target.files[0];
}

async function editarDiseno() {
  await usePrograma
    .editarDiseno(id.value, archivo.value)
    .then((res) => {
      linkD.value = res.data.diseno;
      closeModal();
      ok();
      console.log("Archivo editado con exito");
    })
    .catch((err) => {
      if (err.response.data.error) {
        alert.value = true;
        errores.value = "Falta el archivo";
        alerta();
      }
    });
}

async function buscarPro() {
  await usePrograma.buscarProgramaId(usePrograma.idPrograma._id);
}

async function registrarRegistroCalificado() {
  await usePrograma
    .registrarRegistroCalificado(id.value, {
      titulo: titulo.value.toLowerCase(),
      lugar: lugar.value.toLowerCase(),
      fecha: fecha.value.toLowerCase(),
      metodologia: metodologia.value.toLowerCase(),
      creditos: creditos.value.toLowerCase(),
      snies: snies.value.toLowerCase(),
    })
    .then(() => {
      buscarPro();
      document.getElementById("close1").click();
      ok();
    })
    .catch((err) => {
      if (err.response && err.response.data.errors) {
        alert.value = true;
        errores.value = err.response.data.errors[0].msg;
        alerta();
      } else if (err.response && err.response.data.msg) {
        alert.value = true;
        errores.value = err.response.data.msg;
        alerta();
      } else if (err.response.data.error) {
        alert.value = true;
        errores.value = "Falta el archivo";
        alerta();
      }
    });
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

function closeModal() {
  document.getElementById("close").click();
}

function alerta() {
  setTimeout(() => {
    alert.value = false;
    errores.value = "";
  }, 1600);
}

onMounted(async () => {
  setDocumentTitle(), await programaId(), await traigodatos();
});

import { useConfiguracionStore } from "../stores/configuracion.js";
const useConfiguracion = useConfiguracionStore();
let coloroficialmenu = ref();
let coloroficialletra = ref();
let coloroficialtres = ref();
let coloroficialcuatro = ref();
async function traigodatos() {
  await useConfiguracion
    .traerConfiguracion()
    .then((resultado) => {
      coloroficialmenu.value = resultado[0].colormenu;
      coloroficialletra.value = resultado[0].colorletra;
      coloroficialtres.value = resultado[0].colortres;
      coloroficialcuatro.value = resultado[0].colorcuatro;
    })
    .catch((error) => {
      console.error("Hubo un error:", error);
    });
}
</script>

<style scoped>
.zoom {
  transition: transform 0.3s;
}

.zoom:hover {
  transform: scale(1.1);
}

.titulo {
  margin-top: 10%;
  text-align: center;
  color: v-bind(coloroficialletra);
  font-weight: 1000;
  font-size: 45px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: 700;
}

.centrarcards {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(300px, 1fr)
  ); /* Esto hará que las cartas tengan un ancho mínimo de 300px y se expandan automáticamente */
  gap: 10px; /* Espacio entre las cartas */
  justify-content: center;
  align-items: center;
  margin-left: 200px;
  margin-right: 200px;
}

.card {
  margin: 30px;
  width: 18rem;
  height: 10rem;
  box-shadow: 3px 3px 3px v-bind(coloroficialmenu);
} 

.card-title {
  font-size: 30px;
  color: v-bind(coloroficialletra);
  font-weight: 1000;
} 

.modal-body span {
  display: block;
  /* text-align: center; */
  margin: 15px 0;
}

input[type="file"]#mi-archivo {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

label[for="mi-archivo"] {
  font-size: 14px;
  font-weight: 200;
  color: #fff;
  background-color: v-bind(coloroficialmenu);
  display: inline-block;
  transition: all 0.5s;
  cursor: pointer;
  padding: 5px 8px !important;
  text-transform: uppercase;
  width: fit-content;
  text-align: center;
  margin: auto;
  border-radius: 5px;
}

@media (max-width: 768px) {
  .titulo {
    margin-top: 20%;
    text-align: center;
    color: #16723b;
    font-weight: 1000;
    font-size: 35px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    font-weight: 700;
  }

  .centrarcards {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(300px, 1fr)
    ); /* Esto hará que las cartas tengan un ancho mínimo de 300px y se expandan automáticamente */
    gap: 10px; /* Espacio entre las cartas */
    justify-content: center;
    align-items: center;
    margin-left: 100px;
    margin-right: 100px;
    margin-bottom: 20%;
  }

  .card {
    width: 90%;
  }
}

@media (max-width: 391px) {
  .titulo {
    margin-top: 20%;
    text-align: center;
    color: #16723b;
    font-weight: 1000;
    font-size: 25px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    font-weight: 700;
  }

  .card {
    width: 90%;
  }

  .card-title {
    font-size: 25px;
    color: #16723b;
    font-weight: 1000;
  }

  .centrarcards {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(300px, 1fr)
    ); /* Esto hará que las cartas tengan un ancho mínimo de 300px y se expandan automáticamente */
    gap: 10px; /* Espacio entre las cartas */
    justify-content: center;
    align-items: center;
    margin-left: 100px;
    margin-right: 100px;
    margin-bottom: 30%;
  }
}
</style>
