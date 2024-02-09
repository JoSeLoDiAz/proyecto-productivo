<template>
  <div>
    <div class="row">
      <div
        style="
          margin-top: 70px;
          display: flex;
          background-color: rgb(243, 243, 247);
          text-align: center;
          justify-content: center;
          align-items: center;
          padding: 3rem;
        "
        class="col-12"
      >
        <router-link
          v-if="useUsuario.rol == 'Gestor' || useUsuario.rol == 'Instructor'"
          to="infoprograma"
        >
          <img
            src="../assets/volver.png"
            style="width: 45px; height: 45px; position: relative"
            alt=""
          />
        </router-link>
        <span class="titulo">Ambientes de Formación</span>
        <svg
          class="logo"
          xmlns:dc="http://purl.org/dc/elements/1.1/"
          xmlns:cc="http://creativecommons.org/ns#"
          xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
          xmlns:svg="http://www.w3.org/2000/svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
          xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
          width="100"
          height="98"
          viewBox="0 0 74.999997 73.5"
          version="1.1"
          id="svg12"
          sodipodi:docname="SENA logo.svg"
          inkscape:version="0.92.4 (5da689c313, 2019-01-14)"
        >
          <title id="title222">SENA Colombia logo</title>
          <metadata id="metadata18">
            <rdf:RDF>
              <cc:Work rdf:about="">
                <dc:format>image/svg+xml</dc:format>
                <dc:type
                  rdf:resource="http://purl.org/dc/dcmitype/StillImage"
                />
                <dc:title>SENA Colombia logo</dc:title>
              </cc:Work>
            </rdf:RDF>
          </metadata>
          <defs id="defs16">
            <pattern
              y="0"
              x="0"
              height="6"
              width="6"
              patternUnits="userSpaceOnUse"
              id="EMFhbasepattern"
            />
            <pattern
              y="0"
              x="0"
              height="6"
              width="6"
              patternUnits="userSpaceOnUse"
              id="EMFhbasepattern-0"
            />
          </defs>
          <sodipodi:namedview
            pagecolor="#ffffff"
            bordercolor="#666666"
            borderopacity="1"
            objecttolerance="1"
            gridtolerance="1"
            guidetolerance="1"
            inkscape:pageopacity="0"
            inkscape:pageshadow="2"
            inkscape:window-width="1366"
            inkscape:window-height="705"
            id="namedview14"
            showgrid="false"
            units="px"
            inkscape:showpageshadow="false"
            inkscape:zoom="1"
            inkscape:cx="96.265104"
            inkscape:cy="56.747294"
            inkscape:window-x="-8"
            inkscape:window-y="-8"
            inkscape:window-maximized="1"
            inkscape:current-layer="svg12"
          >
            <inkscape:grid type="xygrid" id="grid58" />
          </sodipodi:namedview>
          <g id="#ffffffff" transform="translate(0,-130.5)" />
          <path
            :style="{ fill: coloroficialcuatro }"
            d="M 37.729312,0.76709211 A 7.9671225,7.9671225 0 0 0 29.773371,8.741545 7.9671225,7.9671225 0 0 0 37.744605,16.701107 7.9671225,7.9671225 0 0 0 45.707788,8.733898 V 8.718608 A 7.9671225,7.9671225 0 0 0 37.729312,0.76709211 Z M 11.446982,19.169553 c -1.400062,0.0084 -2.8234862,0.08599 -4.1584857,0.42261 -0.8795905,0.222694 -1.7315449,0.589234 -2.2841086,1.159562 -0.6939573,0.71469 -0.7830516,1.683375 -0.4447463,2.510708 0.3027378,0.728932 1.116412,1.275934 2.0228936,1.588612 1.9500175,0.668079 4.117455,0.809612 6.168096,1.230399 0.378207,0.09257 0.796556,0.194498 1.030766,0.452796 0.242885,0.306852 0.09871,0.729986 -0.299446,0.922901 -0.666204,0.338572 -1.517067,0.341289 -2.29256,0.329636 -0.708709,-0.02913 -1.4860247,-0.08878 -2.0498634,-0.44354 -0.4146382,-0.255061 -0.487253,-0.689278 -0.3944343,-1.062161 l -4.5714374,4.13e-4 c -0.012144,0.695917 0.1230528,1.422157 0.6331108,2.019674 0.4259168,0.510124 1.1138561,0.869443 1.8546552,1.08631 1.1823274,0.347635 2.4633397,0.45247 3.7246061,0.484191 1.711468,0.02913 3.456086,-0.02172 5.099895,-0.410133 0.979349,-0.238231 1.942311,-0.624278 2.569473,-1.250927 1.113798,-1.117998 0.851643,-2.888599 -0.629086,-3.758011 -0.737329,-0.429203 -1.620362,-0.695805 -2.52077,-0.867357 -1.316781,-0.273188 -2.657724,-0.472977 -3.991855,-0.693081 -0.468421,-0.09127 -0.9637641,-0.17183 -1.3575867,-0.393229 -0.4120347,-0.221399 -0.4451988,-0.742521 -0.025355,-0.970393 0.5430207,-0.306203 1.2665147,-0.304035 1.9162377,-0.304681 0.68528,0.01165 1.430476,0.05483 1.994315,0.375921 0.31575,0.17673 0.442485,0.473443 0.445955,0.758283 l 4.344837,-0.01004 c -0.01734,-0.550925 -0.118731,-1.123123 -0.521227,-1.598289 -0.466686,-0.585218 -1.287477,-0.954052 -2.13237,-1.169625 -1.325457,-0.335334 -2.741002,-0.404061 -4.131515,-0.410535 z m 9.425817,0.328831 -0.0019,10.38132 12.670256,4.12e-4 -0.0011,-2.263178 H 25.518157 V 25.60169 h 7.154592 v -2.212465 h -7.154592 l -0.0016,-1.652607 7.734167,-0.002 -0.0044,-2.236213 z m 20.874932,0.0036 c 0,0 -3.91491,0.0012 -5.871868,0.0012 l -8.25e-4,10.382125 4.448274,4.12e-4 -0.0028,-6.986351 6.093235,6.980716 6.104905,0.0056 -0.0016,-10.382527 -4.451897,7.97e-4 0.0052,6.936443 z m 18.702713,0.01731 c 0,0 -4.795135,6.925757 -7.204899,10.383332 l 4.669239,4.12e-4 1.120118,-1.873169 h 7.21456 l 1.045256,1.873974 5.186434,-7.96e-4 -6.872848,-10.382125 z m 2.333214,2.478105 2.214074,3.76083 -4.576669,0.0065 z m -62.26819489,10.81881 0.0402459,5.651707 21.11883799,-0.07527 c 1.07706,0.231841 1.7024,0.932964 1.482355,2.526807 l -12.989427,22.73807 4.231335,3.955631 20.118662,-34.796918 z m 40.29930289,0.0483 19.784196,34.649208 4.372205,-3.930275 -13.14036,-22.678472 c -0.22011,-1.598763 0.405444,-2.307963 1.482759,-2.540491 l 21.123264,0.07527 -0.0056,-5.557928 z m -3.337814,5.733814 -18.552992,31.845491 4.928038,2.401635 12.380065,-20.924035 c 0.426522,-0.348923 0.858497,-0.534847 1.290772,-0.552212 0.455325,-0.01744 0.916655,0.151004 1.377709,0.511558 l 12.351487,20.988033 5.083398,-2.65158 z"
            id="path47-5"
            inkscape:connector-curvature="0"
          />
          <g
            id="#000000ff-2"
            transform="matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)"
            style="fill: #ff6719; fill-opacity: 1"
          />
        </svg>
      </div>

      <div class="row p-3">
        <div class="col-9 buscar">
          <input
            type="text"
            @input="ambiente_filtrado"
            class="input"
            placeholder="Buscar por codigo"
          />
          <img class="logoinput" src="../assets/buscar.png" alt="" />
          <div>{{ vacio }}</div>
        </div>
        <div class="col-3">
          <button
            v-if="useUsuario.rol == 'Administrador'.toLowerCase()"
            type="button"
            class="btn botonagregar"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            @click="cambio('Agregar')"
          >
            Agregar +
          </button>

          <button
            v-if="useUsuario.rol === 'Gestor'.toLowerCase()"
            type="button"
            class="btn botonguardar"
            data-bs-toggle="modal"
            data-bs-target="#modalAgregar"
            @click="cambio('AmbientePrograma')"
          >
            Agregar +
          </button>
        </div>
      </div>

      <div v-if="useAmbiente.cargando === false">
        <div
          v-if="ambientesEncontrados.length === 0"
          style="align-items: center; align-content: center; margin-left: 6rem"
        >
          <img
            class="noInfoxd"
            src="../assets/nointernet.svg"
            alt="no conexion"
          />
        </div>
        <div
          class="row"
          style="margin: 7px"
          v-else
          v-for="(a, index) in ambientesEncontrados"
          :key="a"
        >
          <div class="accordion" id="accordionFlushExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <div
                  class="accordion-button collapsed custom-focus"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#collapse-' + a._id"
                  :aria-expanded="index === 0 ? 'true' : 'false'"
                  :aria-controls="'collapse-' + a._id"
                >
                  <div class="tibu">
                    <div>
                      <strong>Ambiente:</strong>
                      {{ a.nombre }}
                    </div>
                  </div>
                </div>
              </h2>
              <div
                :id="'collapse-' + a._id"
                :class="
                  index === 0
                    ? 'accordion-collapse collapse show'
                    : 'accordion-collapse collapse'
                "
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  <div class="row" style="margin: 0">
                    <div class="col-10">
                      <strong>Tipo de ambiente: </strong>{{ a.tipo_ambiente }}
                      <br />
                      <strong>Sede: </strong>
                      {{ a.sede.nombre }} <br />
                      <strong>Capacidad: </strong> {{ a.capacidad }} <br />
                      <strong>Equipamiento: </strong>
                      {{ a.equipamiento }}
                      <br />
                    </div>
                    <div class="col-2">
                      <div class="sub">
                        <div
                          @click="cambiarEstado(a)"
                          v-if="useUsuario.rol !== 'Instructor'.toLowerCase()"
                        >
                          <strong
                            v-if="a.estado === true"
                            style="color: green; cursor: pointer"
                            >Activo</strong
                          >
                          <strong v-else style="color: red; cursor: pointer"
                            >Inactivo</strong
                          >
                        </div>
                        <div v-else>
                          <strong v-if="a.estado === true" style="color: green"
                            >Activo</strong
                          >
                          <strong v-else style="color: red; cursor: pointer"
                            >Inactivo</strong
                          >
                        </div>
                        <img
                          v-if="
                            useUsuario.rol === 'Administrador'.toLowerCase()
                          "
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          @click="cambio('Editar'), editar(a)"
                          src="../assets/editar1.png"
                          style="width: 30px; margin: 10px; cursor: pointer"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="row d-flex justify-content-center">
        <div class="spinner-border text-dark" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden=" "
    >
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              {{ msg_modal }}
            </h1>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="d-flex flex-row mb-2 flex-wrap">
              <span>Nombre</span>
              <input type="text" v-model="nombre" />

              <span>Capacidad</span>
              <input type="number" v-model="capacidad" />

              <span>Tipo Ambiente</span>
              <select v-model="tipo_ambiente">
                <option value="">Seleccione</option>
                <option value="ideal">Ideal</option>
                <option value="disponible">Disponible</option>
              </select>

              <span>equipamiento</span>
              <input type="text" v-model="equipamiento" />

              <span>Sede</span>
              <select name="" id="" v-model="sedeId">
                <option value="" disabled selected v-if="msg_modal === 'Agregar Ambiente'">
                  Seleccione
                </option>
                <!-- <option value="selected" v-else>{{ sedes.nombre }}</option> -->
                <option :value="s._id" v-for="s in sedes" :key="s">
                  {{ s.nombre }}
                </option>
              </select>
            </div>
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
            v-if="useAmbiente.cargando === true"
            class="row d-flex justify-content-center"
          >
            <div class="spinner-border text-success" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <div class="modal-footer" style="margin: auto">
            <button
              :style="{ color: coloroficialtres }"
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="close"
            >
              Cancelar
            </button>
            <button
              :style="{
                backgroundColor: coloroficialmenu,
                color: coloroficialtres,
              }"
              v-if="msg_modal == 'Agregar Ambiente'"
              type="button"
              class="btn"
              @click="registrarAmbiente()"
            >
              Agregar
            </button>
            <button
              :style="{
                backgroundColor: coloroficialmenu,
                color: coloroficialtres,
              }"
              v-else
              type="button"
              class="btn"
              @click="guardarEdision()"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- modal agregar ambiente al programa solo gestor -->
    <div
      class="modal fade"
      id="modalAgregar"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="modalAgregarLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title" id="modalAgregarLabel">
              Agregar ambiente al programa
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" style="margin: 20px">
            <span style="margin: 10px">Selecione el Programa</span>
            <select v-model="ambienteId">
              <option value="" disabled selected>Seleccione el ambiente</option>
              <option :value="a._id" v-for="a in ambientes" :key="a">
                {{ a.nombre }}
              </option>
            </select>
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
              id="close1"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="btn btn-success"
              @click="agregarAmbientePrograma()"
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
import { useAmbienteStore } from "../stores/ambiente.js";
import { useSedeStore } from "../stores/sede.js";
import { useUsuarioStore } from "../stores/usuario.js";
import { useProgramaStore } from "../stores/programa.js";

const useAmbiente = useAmbienteStore();
const useSede = useSedeStore();
const useUsuario = useUsuarioStore();
const usePrograma = useProgramaStore();

let msg_modal = ref("");
let ambientesEncontrados = ref([]);
let buscado_v = ref("");
let vacio = ref("");
let id = ref("");
let nombre = ref("");
let capacidad = ref("");
let tipo_ambiente = ref("");
let equipamiento = ref("");
let sedes = ref([]);
let sedeId = ref("");
let errores = ref("");
let alert = ref(false);
let ambientes = ref([]);
let ambienteId = ref("");
let sinInfo = ref(false);
let newAmbientes = ref([]);

const setDocumentTitle = () => {
  document.title = `COLMABE || Ambientes de Formacion`;
};

async function cambio(msg) {
  if (msg == "Agregar") {
    limpiar();
    buscarSedes();
    msg_modal.value = "Agregar Ambiente";
  } else if (msg == "AmbientePrograma") {
    await useAmbiente
      .buscarAmbiente()
      .then((res) => {
        ambientes.value = res;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    msg_modal.value = "Editar Ambiente";
  }
}

async function buscarSedes() {
  await useSede.buscarSede().then((res) => {
    sedes.value = res;
  });
}

async function ambientesPrograma() {
  if (useUsuario.rol === "Gestor".toLowerCase()) {
    ambientesEncontrados.value = usePrograma.idPrograma.ambiente;
    if (ambientesEncontrados.value == "") {
      sinInfo.value = true;
    }
  } else if (useUsuario.rol === "Instructor".toLowerCase()) {
    ambientesEncontrados.value = usePrograma.idPrograma.ambiente;
    if (ambientesEncontrados.value == "") {
      sinInfo.value = true;
    }
  } else {
    await useAmbiente
      .buscarAmbiente()
      .then((res) => {
        ambientesEncontrados.value = res;
        newAmbientes.value = [...ambientesEncontrados.value];
        if (ambientesEncontrados.value == "") {
          sinInfo.value = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

async function buscarProgramaId() {
  await usePrograma.buscarProgramaId(usePrograma.idPrograma._id);
  ambientesEncontrados.value = usePrograma.idPrograma.ambiente;
}

function validaciones() {
  if (nombre.value.trim() === "") {
    alert.value = true;
    errores.value = "Complete el campo Nombre";
    alerta();
  } else if (capacidad.value === "") {
    alert.value = true;
    errores.value = "Complete el campo Capacidad";
    alerta();
  } else if (tipo_ambiente.value.trim() === "") {
    alert.value = true;
    errores.value = "Complete el campo Tipo de Ambiente";
    alerta();
  } else if (equipamiento.value.trim() === "") {
    alert.value = true;
    errores.value = "Complete el campo Equipamiento";
    alerta();
  } else if (sedeId.value.trim() === "") {
    alert.value = true;
    errores.value = "Complete el campo Sede";
    alerta();
  } else {
    return true;
  }
}

async function agregarAmbientePrograma() {
  if(ambienteId.value.trim()===''){
    alert.value = true;
    errores.value = "Debe seleccionar un ambiente";
    alerta();
  }else{
    await usePrograma
    .agregarAmbiente(usePrograma.idPrograma._id, ambienteId.value)
    .then(() => {
      buscarProgramaId();
      document.getElementById("close1").click();
      ok();
      closeModal();
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
      }
    });
  }
}

async function ambiente_filtrado(event) {
  buscado_v.value = event.target.value;
  if (buscado_v.value === "") {
    ambientesPrograma();
    vacio.value = "";
  } else {
    ambientesEncontrados.value = newAmbientes.value;
    let filtrado = ambientesEncontrados.value.filter((g) =>
      g.nombre.includes(buscado_v.value.trim().toLowerCase())
    );
    if (filtrado.length === 0) {
      ambientesEncontrados.value = [];
      vacio.value = `Sin resultados para ${buscado_v.value}`;
    } else {
      vacio.value = "";
      ambientesEncontrados.value = filtrado;
    }
  }
}

async function registrarAmbiente() {
  if (validaciones() === true) {
    await useAmbiente
      .registrarAmbiente({
        nombre: nombre.value.toLowerCase(),
        capacidad: capacidad.value,
        tipo_ambiente: tipo_ambiente.value.toLowerCase(),
        equipamiento: equipamiento.value.toLowerCase(),
        estado: true,
        sede: sedeId.value,
      })
      .then(() => {
        closeModal();
        ok();
        limpiar();
        ambientesPrograma();
      })
      .catch((err) => {
        if (err.response.data.errors) {
          alert.value = true;
          errores.value = err.response.data.errors[0].msg;
          alerta();
        }
      });
  }
}

async function editar(a) {
  buscarSedes();
  id.value = a._id;
  (nombre.value = a.nombre),
    (capacidad.value = a.capacidad),
    (tipo_ambiente.value = a.tipo_ambiente),
    (equipamiento.value = a.equipamiento),
    (sedeId.value = a.sede._id);
}

async function guardarEdision() {
  if (validaciones() === true) {
    await useAmbiente
      .editarAmbiente(
        id.value,
        nombre.value.toLowerCase(),
        capacidad.value,
        tipo_ambiente.value.toLowerCase(),
        equipamiento.value.toLowerCase(),
        sedeId.value
      )
      .then(() => {
        ok();
        closeModal();
        limpiar();
        ambientesPrograma();
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
        }
      });
  }
}

function closeModal() {
  document.getElementById("close").click();
}

async function cambiarEstado(a) {
  if (a.estado === true) {
    a.estado = false;
  } else {
    a.estado = true;
  }
  await useAmbiente.cambiarEstado(a._id, a.estado).then(() => {
    console.log("Cambio de estado realizado correctamente");
  });
}

function limpiar() {
  (nombre.value = ""),
    (capacidad.value = ""),
    (tipo_ambiente.value = ""),
    (equipamiento.value = ""),
    (sedeId.value = "");
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

function alerta() {
  setTimeout(() => {
    alert.value = false;
    errores.value = "";
  }, 3000);
}

onMounted(async () => {
  setDocumentTitle(), await ambientesPrograma(), await traigodatos();
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
@import "./scss/_variables.scss";

.titulo {
  text-align: center;
  color: v-bind(coloroficialletra);
  font-weight: 1000;
  font-size: 45px;
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: 700;
  margin-right: 5%;
}

.botonagregar {
  font-size: 14px;
  width: 90px;
  height: 40px;
  margin-left: 60%;
  background-color: v-bind(coloroficialmenu);
  color: v-bind(coloroficialtres);
}

.botonguardar {
  background-color: v-bind(coloroficialmenu);
  color: v-bind(coloroficialtres);
}

.modal-header {
  background-color: v-bind(coloroficialmenu);
  color: v-bind(coloroficialtres);
  border-bottom: none;
  padding: 15px;
}

.modal-title {
  color: v-bind(coloroficialtres);
}

.logo {
  height: 70px;
  width: 70px;
}

.input {
  width: 20%;
  height: 40px;
  margin-left: 6%;
}

.buscar {
  position: relative;
  left: 50px;
}

.buscar img {
  width: 40px;
  margin-left: 1%;
  border-radius: 5px;
  background-color: rgb(227, 227, 227);
}

.noInfoxd {
  align-content: center;
  align-items: center;
  margin: -5rem 40%;
  /* position: absolute; */
  /* margin: -8rem 30rem; */
}

.modal {
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.modal-body span {
  font-weight: bold;
}

.modal-body input,
select {
  text-transform: capitalize;
  width: 100%;
  padding: 7px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.svg svg {
  width: 70px;
  position: relative;
  left: 30%;
}

.alerta svg {
  width: 20px;
  height: 20px;
}

.sub {
  justify-content: space-between;
  align-items: center;
}

.tibu strong {
  font-weight: 700;
  font-size: 15px;
}

.tibu div {
  font-weight: 400;
}

.accordion {
  text-transform: capitalize;
  width: 90%;
  margin-left: 100px;
  margin-right: 100px;
}

.accordion-button.collapsed:focus {
  background-color: v-bind(coloroficialmenu);
  border-color: rgb(14, 44, 191) !important;
  color: rgb(0, 0, 0) !important;
}

.accordion-button:focus {
  background-color: v-bind(coloroficialmenu);
  border-color: rgb(43, 21, 189) !important;
  color: rgb(0, 0, 0) !important;
}

.accordion-button {
  background-color: v-bind(coloroficialmenu);
  border-color: rgb(255, 255, 255) !important;
  color: rgb(0, 0, 0) !important;
}

/* Estilos para pantallas pequeñas (móviles) */

@media (max-width: 768px) {
  .titulo {
    text-align: center;
    color: v-bind(coloroficialletra);
    font-weight: 1000;
    font-size: 30px;
    text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
    font-weight: 700;
    margin-right: 5%;
  }
  .logo {
    height: 60px;
    width: 60px;
  }

  .botonagregar {
    font-size: 14px;
    width: 90px;
    height: 40px;
    margin-left: -10px;
  }

  .input {
    width: 200px;
    height: 40px;
    margin-left: 6%;
  }

  .buscar {
    position: relative;
    left: -10px;
  }

  .buscar img {
    width: 40px;
    margin-left: 1%;
    border-radius: 5px;
    background-color: rgb(227, 227, 227);
  }

  .accordion {
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
  }
}

@media (max-width: 391px) {
  .titulo {
    text-align: center;
    color: v-bind(coloroficialletra);
    font-weight: 1000;
    font-size: 25px;
    text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
    font-weight: 700;
    margin-right: 5%;
  }
  .logo {
    height: 50px;
    width: 50px;
  }

  .botonagregar {
    font-size: 14px;
    width: 90px;
    height: 40px;
    margin-left: -10px;
  }

  .input {
    width: 150px;
    height: 40px;
    margin-left: 6%;
  }

  .buscar {
    position: relative;
    left: -10px;
  }

  .buscar img {
    width: 40px;
    margin-left: 1%;
    border-radius: 5px;
    background-color: rgb(227, 227, 227);
  }

  .accordion {
    text-transform: capitalize;
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
  }
}
</style>
