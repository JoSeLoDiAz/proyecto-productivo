<template>
  <div style="margin-top: 70px; margin-left: 80px">
    <div>
      <img
        src="https://blogger.googleusercontent.com/img/a/AVvXsEj9PjvWPb8hvIp12oiMD8IkqK2RtMFT77QVHmeMfO4eee4zyYsGIb6RV64mlyt7KXnrWQA8yXpRhkwBKejlLJ5W76N4gnoX0s9PlMyfygkLzxe8jWkS1u7Ul7CUlSbtfSRw1l7VTRLAHYW8iLEhq2slnbbZicb_jlVncPQ4RRthlSVv6lczOdoz5JiR=s960"
        alt=""
        class="backdrop imagenRes"
      />
      <div
        :class="isFirefox ? 'firefox-background' : 'header-cover'"
        style="margin-top: 50px"
      ></div>
    </div>
    <div class="intro">
      <img
        :src="perfil.archivo"
        alt="imagen"
        class="avatar"
        style="cursor: pointer"
        @click="editarPhoto = true"
      />
      <div class="editarFoto" v-if="editarPhoto === true">
        <span style="margin-left: 30px"> Editar Foto de perfil</span>
        <span class="hoja-vida">
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            @change="llevarFoto"
            id="hoja-vida"
            name="hoja-vida"
          />
        </span>
        <label for="hoja-vida">
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
        </label>
        <button @click="editarPhoto = false" class="btn btn-secondary">
          Cancelar
        </button>
      </div>
      <div v-if="cambio === true" class="editarFoto">
        <div>
          <button @click="ArchivoNube()" class="btn btn-success">
            <span v-if="useUsuario.cargando == false">Cambiar Foto</span>
            <div
              v-else
              class="row d-flex justify-content-center"
              style="padding: 0 40px"
            >
              <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </button>
          <button
            @click="cambio = false"
            class="btn btn-secondary"
            style="margin-left: 10px"
          >
            Cancelar
          </button>
        </div>
      </div>

      <div class="title-wrapper" style="margin-top: 10px">
        <div class="title">
          <div class="titulo">
            <span class="tituloRol" style="text-transform: capitalize;"
              >{{ perfil.nombre }} {{ perfil.apellidos }}</span
            ><br />
            <span class="titulito" style="text-transform: capitalize;">{{ rol1 }}</span
            ><br />
            <a :href="perfil.email">{{ perfil.email }}</a>
          </div>
        </div>
        <div>
          <button
            type="button"
            :style="{
              backgroundColor: coloroficialmenu,
              color: coloroficialtres,
            }"
            class="btn editaUser"
            id="editando"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            @click="editar()"
          >
            Edita Tu Perfil
          </button>
        </div>
        <div class="logo">
          <svg
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
              d="M 37.729312,0.76709211 A 7.9671225,7.9671225 0 0 0 29.773371,8.741545 7.9671225,7.9671225 0 0 0 37.744605,16.701107 7.9671225,7.9671225 0 0 0 45.707788,8.733898 V 8.718608 A 7.9671225,7.9671225 0 0 0 37.729312,0.76709211 Z M 11.446982,19.169553 c -1.400062,0.0084 -2.8234862,0.01099 -4.1584857,0.42261 -0.8795905,0.222694 -1.7315449,0.589234 -2.2841086,1.159562 -0.6939573,0.71469 -0.7830516,1.683375 -0.4447463,2.510708 0.3027378,0.728932 1.116412,1.275934 2.0228936,1.588612 1.9500175,0.668079 4.117455,0.809612 6.168096,1.230399 0.378207,0.09257 0.796556,0.194498 1.030766,0.452796 0.242885,0.306852 0.09871,0.729986 -0.299446,0.922901 -0.666204,0.338572 -1.517067,0.341289 -2.29256,0.329636 -0.708709,-0.02913 -1.4860247,-0.08878 -2.0498634,-0.44354 -0.4146382,-0.255061 -0.487253,-0.689278 -0.3944343,-1.062161 l -4.5714374,4.13e-4 c -0.012144,0.695917 0.1230528,1.422157 0.6331108,2.019674 0.4259168,0.510124 1.1138561,0.869443 1.8546552,1.08631 1.1823274,0.347635 2.4633397,0.45247 3.7246061,0.484191 1.711468,0.02913 3.456086,-0.02172 5.099895,-0.410133 0.979349,-0.238231 1.942311,-0.624278 2.569473,-1.250927 1.113798,-1.117998 0.851643,-2.888599 -0.629086,-3.758011 -0.737329,-0.429203 -1.620362,-0.695805 -2.52077,-0.867357 -1.316781,-0.273188 -2.657724,-0.472977 -3.991855,-0.693081 -0.468421,-0.09127 -0.9637641,-0.17183 -1.3575867,-0.393229 -0.4120347,-0.221399 -0.4451988,-0.742521 -0.025355,-0.970393 0.5430207,-0.306203 1.2665147,-0.304035 1.9162377,-0.304681 0.68528,0.01165 1.430476,0.05483 1.994315,0.375921 0.31575,0.17673 0.442485,0.473443 0.445955,0.758283 l 4.344837,-0.01004 c -0.01734,-0.550925 -0.118731,-1.123123 -0.521227,-1.598289 -0.466686,-0.585218 -1.287477,-0.954052 -2.13237,-1.169625 -1.325457,-0.335334 -2.741002,-0.404061 -4.131515,-0.410535 z m 9.425817,0.328831 -0.0019,10.38132 12.670256,4.12e-4 -0.0011,-2.263178 H 25.518157 V 25.60169 h 7.154592 v -2.212465 h -7.154592 l -0.0016,-1.652607 7.734167,-0.002 -0.0044,-2.236213 z m 20.874932,0.0036 c 0,0 -3.91491,0.0012 -5.871868,0.0012 l -8.25e-4,10.382125 4.448274,4.12e-4 -0.0028,-6.986351 6.093235,6.980716 6.104905,0.0056 -0.0016,-10.382527 -4.451897,7.97e-4 0.0052,6.936443 z m 18.702713,0.01731 c 0,0 -4.795135,6.925757 -7.204899,10.383332 l 4.669239,4.12e-4 1.120118,-1.873169 h 7.21456 l 1.045256,1.873974 5.186434,-7.96e-4 -6.872848,-10.382125 z m 2.333214,2.478105 2.214074,3.76083 -4.576669,0.0065 z m -62.26819489,10.81881 0.0402459,5.651707 21.11883799,-0.07527 c 1.07706,0.231841 1.7024,0.932964 1.482355,2.526807 l -12.989427,22.73807 4.231335,3.955631 20.118662,-34.796918 z m 40.29930289,0.0483 19.784196,34.649208 4.372205,-3.930275 -13.14036,-22.678472 c -0.22011,-1.598763 0.405444,-2.307963 1.482759,-2.540491 l 21.123264,0.07527 -0.0056,-5.557928 z m -3.337814,5.733814 -18.552992,31.845491 4.928038,2.401635 12.380065,-20.924035 c 0.426522,-0.348923 0.858497,-0.534847 1.290772,-0.552212 0.455325,-0.01744 0.916655,0.151004 1.377709,0.511558 l 12.351487,20.988033 5.083398,-2.65158 z"
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
      </div>
    </div>
    <!-- cuerpo -->
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 5%;
      "
    >
      <p class="nombrePer">{{ perfil.nombre }} {{ perfil.apellidos }}</p>
    </div>
    <div v-if="useUsuario.cargando == false">
      <div class="contenedorDos">
        <div class="cuadrado">
          <p class="titulos">Tu Rol:</p>
          <p class="respuestas">{{ rol1 }}</p>

          <p
            class="titulos"
            v-if="useUsuario.rol !== 'Administrador'.toLowerCase()"
          >
            Tu Red:
          </p>
          <p style="text-transform: capitalize;"
            class="respuestas"
            v-if="useUsuario.rol !== 'Administrador'.toLowerCase()"
          >
            {{ useUsuario.usuarioId.red.nombre }}
          </p>

          <p class="titulos">Identificacion:</p>
          <p class="respuestas">{{ perfil.identificacion }}</p>

          <p class="titulos">Fecha de Nacimiento:</p>
          <p class="respuestas">{{ perfil.fecha_nacimiento }}</p>

          <p class="titulos">Genero:</p>
          <p class="respuestas">{{ perfil.genero }}</p>

          <p class="titulos">Direccion:</p>
          <p class="respuestas">{{ perfil.direccion }}</p>

          <p class="titulos">Telefono:</p>
          <p class="respuestas">{{ perfil.telefono }}</p>

          <p class="titulos">Email:</p>
          <p class="respuestas" style="text-transform: lowercase;">{{ perfil.email }}</p>

          <p class="titulos">Ocupacion:</p>
          <p class="respuestas">{{ perfil.ocupacion }}</p>

          <p class="titulos">Estado Civil:</p>
          <p class="respuestas">{{ perfil.estado_civil }}</p>

          <p class="titulos">Nacionalidad:</p>
          <p class="respuestas">{{ perfil.nacionalidad }}</p>

          <p class="titulos">Contacto de emergencia:</p>
          <p class="respuestas">{{ perfil.contacto_emergencia }}</p>

          <p class="titulos">Hoja de vida:</p>
          <a style="margin: 0 65px" :href="perfil.hoja_vida" target="_blank">
            <img style="width: 30px" src="../assets/descargar2.png" alt="" />
          </a>

          <div v-if="alert === true">{{ errores }}</div>
        </div>
      </div>
    </div>
    <div v-else class="row d-flex justify-content-center">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h3
              style="color: white"
              class="modal-title"
              id="staticBackdropLabel"
            >
              Edita tu Información
            </h3>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="d-flex flex-row mb-2 flex-wrap">
              <div class="p-2">
                <span>Nombres</span>
                <input type="text" v-model="nombre" />
              </div>

              <div class="p-2">
                <span>Apellidos</span>
                <input type="text" v-model="apellidos" />
              </div>

              <div class="p-2">
                <span>Identificación</span>
                <input type="text" v-model="identificacion" />
              </div>

              <div class="p-2">
                <span>Fecha de nacimiento</span>
                <input type="date" v-model="fecha_nacimiento" />
              </div>

              <div class="p-2">
                <span>Genero</span>
                <select v-model="genero">
                  <option value="Femeneino">Femenino</option>
                  <option value="Masculino">Masculino</option>
                </select>
              </div>

              <div class="p-2">
                <span>Direccion</span>
                <input type="text" v-model="direccion" />
              </div>

              <div class="p-2">
                <span>Telefono</span>
                <input type="text" v-model="telefono" />
              </div>

              <div class="p-2">
                <span>Correo Electronico</span>
                <input type="text" v-model="email" />
              </div>

              <div class="p-2">
                <span>Ocupacion</span>
                <input type="text" v-model="ocupacion" />
              </div>

              <div class="p-2">
                <span>Estado Civil</span>
                <input type="text" v-model="estado_civil" />
              </div>

              <div class="p-2">
                <span>Nacionalidad</span>
                <input type="text" v-model="nacionalidad" />
              </div>

              <div class="p-2">
                <span>Contacto de emergencia</span>
                <input type="text" v-model="contacto_emergencia" />
              </div>

              <div class="p-2">
                <span style="display: block">Hoja de vida</span>
                <span class="hoja-vida">
                  <input
                    type="file"
                    accept=".pdf, .doc, .docx"
                    @change="llevar1"
                    id="hoja-vida"
                    name="hoja-vida"
                  />
                </span>
                <label for="hoja-vida">
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
                  <span style="margin: 0 10px" v-if="hoja_vida === null"
                    >Hoja de vida</span
                  >
                  <span style="margin: 0 10px" v-else>{{
                    hoja_vida.name
                  }}</span>
                </label>
              </div>
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

          <div class="modal-footer" style="margin: auto">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              :style="{ color: coloroficialtres }"
              aria-label="Close"
              id="close"
            >
              Cancelar
            </button>
            <button
              v-if="msg_modal == 'Agregar Usuario'"
              type="button"
              class="btn btn-success"
              @click="registrarUsuario(), subirArchivo()"
            >
              Agregar
            </button>
            <button
              v-else
              type="button"
              :style="{
                color: coloroficialtres,
                backgroundColor: coloroficialmenu,
              }"
              class="btn"
              @click="guardarEdision()"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUsuarioStore } from "../stores/usuario";
import VueJwtDecode from "vue-jwt-decode";

const isFirefox = ref(false);
const useUsuario = useUsuarioStore();
let perfil = ref([]);
let editarPhoto = ref(false);
let cambio = ref(false);
let archivo = ref(null);
let archivo1 = ref("");
let errores = ref("");
let alert = ref(false);
let photo = ref(null);
let img = ref(null);
let id = ref("");
let nombre = ref("");
let apellidos = ref("");
let identificacion = ref("");
let fecha_nacimiento = ref("");
let genero = ref("");
let direccion = ref("");
let telefono = ref("");
let email = ref("");
let password = ref("");
let ocupacion = ref("");
let estado_civil = ref("");
let nacionalidad = ref("");
let contacto_emergencia = ref("");
let hoja_vida = ref(null);
let notas = ref("");
let red = ref("");
let rol = ref("");
let rol1 = ref("");
let HojaVida = ref("");
let pageTitle = ref("");

const setDocumentTitle = () => {
  pageTitle.value = "Tu Perfil"; // Título predeterminado aquí
  document.title = `Legado Sena || ${pageTitle.value}`;
  console.log(document.title);
};

// const capitalizeFirstLetter = (str) => {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// };

const detectBrowser = async () => {
  const userAgent = window.navigator.userAgent;
  const isFirefoxBrowser = userAgent.indexOf("Firefox") !== -1;
  isFirefox.value = isFirefoxBrowser;
};

async function buscarUsuario() {
  const token = useUsuario.token;
  rol1.value = useUsuario.rol;
  const decoded = VueJwtDecode.decode(token);

  await useUsuario
    .buscarUsuarioId(decoded.id)
    .then(() => {
      perfil.value = useUsuario.usuarioId;
      console.log(perfil.value);
      mostrarArchivo();
    })
    .catch((err) => {
      console.log(err);
    });
};

function llevar1(event) {
  hoja_vida.value = event.target.files[0];
};

function llevarFoto(event) {
  photo.value = event.target.files[0];
  editarPhoto.value = false;
  cambio.value = true;
  return cambio;
};

async function ArchivoNube() {
  if (photo.value === null) {
    alert.value = true;
    errores.value = "No hay archivo";
  } else {
    await useUsuario
      .archivoNube(perfil.value._id, photo.value)
      .then(() => {
        buscarUsuario();
        cambio.value = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

function llevar(event) {
  archivo.value = event.target.files[0];
};

async function subirArchivo() {
  if (archivo.value === null) {
    alert.value = true;
    errores.value = "No hay archivo";
  } else {
    await useUsuario.archivo(perfil.value._id, archivo.value).then(() => {
      buscarUsuario();
    });
  }
};

async function urlHojaVida() {
  await useUsuario
    .hoja_vidaPerfil(useUsuario.usuarioId._id)
    .then((res) => {
      HojaVida.value = res;
    })
    .catch((err) => {
      console.log(err);
    });
}

function editar() {
  id.value = perfil.value._id;
  nombre.value = perfil.value.nombre;
  apellidos.value = perfil.value.apellidos;
  identificacion.value = perfil.value.identificacion;
  fecha_nacimiento.value = perfil.value.fecha_nacimiento;
  genero.value = perfil.value.genero;
  direccion.value = perfil.value.direccion;
  telefono.value = perfil.value.telefono;
  email.value = perfil.value.email;
  password.value = perfil.value.password;
  ocupacion.value = perfil.value.ocupacion;
  estado_civil.value = perfil.value.estado_civil;
  nacionalidad.value = perfil.value.nacionalidad;
  contacto_emergencia.value = perfil.value.contacto_emergencia;
  hoja_vida.value = perfil.value.hoja_vida;
  archivo1.value = perfil.value.archivo;
  rol.value = perfil.value.rol._id;
  if (perfil.value.red) {
    red.value = perfil.value.red._id;
  }
}

async function guardarEdision() {
  await useUsuario
    .editarUsuario(
      id.value,
      nombre.value.toLowerCase(),
      apellidos.value.toLowerCase(),
      identificacion.value.toLowerCase(),
      fecha_nacimiento.value.toLowerCase(),
      genero.value.toLowerCase(),
      direccion.value.toLowerCase(),
      telefono.value,
      email.value.toLowerCase(),
      password.value,
      ocupacion.value.toLowerCase(),
      estado_civil.value.toLowerCase(),
      nacionalidad.value.toLowerCase(),
      contacto_emergencia.value.toLowerCase(),
      hoja_vida.value,
      archivo1.value,
      rol.value,
      red.value
    )
    .then(() => {
      buscarUsuario();
      console.log("Edisión exitosa");
      ok();
      closeModal();
      limpiar();
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
        errores.value = "Falta La hoja de vida";
        alerta();
      }
    });
}

function closeModal() {
  document.getElementById("close").click();
}

function limpiar() {
  nombre.value = "";
  apellidos.value = "";
  identificacion.value = "";
  fecha_nacimiento.value = "";
  genero.value = "";
  direccion.value = "";
  telefono.value = "";
  usuario.value = "";
  ocupacion.value = "";
  estado_civil.value = "";
  nacionalidad.value = "";
  contacto_emergencia.value = "";
  hoja_vida.value = "";
  archivo1.value = "";
  notas.value = "";
  red.value = "";
  rol.value = "";
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
  }, 2000);
}
buscarUsuario()
onMounted(async () => {
  setDocumentTitle(), await detectBrowser(), traigodatos();
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
/* @import "https://unpkg.com/normalize.css"; */
/* @import "https://unpkg.com/open-props/normalize.min.css"; */
@import "https://unpkg.com/open-props/open-props.min.css";
@import "./scss/_variables.scss";

.header__cover {
  position: absolute;
  inset: 0;
  background: hsl(0 0% 0% / 0.25);
  opacity: 0;
  backdrop-filter: blur(6px);
  animation: fade-in both linear;
  animation-timeline: scroll();
}

.backdrop {
  height: 100%;
  width: 100%;
}

.avatar {
  margin-top: 60px;
  width: var(--size-12);
  aspect-ratio: 1;
  border-radius: 50%;
  border: var(--size-2) solid var(--green-6);
  position: absolute;
  top: 0%;
  left: var(--size-4);
  translate: 0 -100%;
  transform-origin: 0% 50%;
  animation: scale-down both ease-out, look-down both steps(20);
  animation-timeline: scroll();
  z-index: 2;
  object-position: 0 0;
  object-fit: cover;
  background: var(-green-3);
}

.tituloRol {
  font-size: medium;
  font-weight: 800;
}

.titulito {
  font-size: medium;
}

.nombrePer {
  color: v-bind(coloroficialletra);
  font-size: 35px;
  font-weight: 1000;
}
.logo {
  position: relative;
  left: 140%;
  margin-top: -15%;
  padding-bottom: 2%;
}

#editando {
  position: relative;
  left: 100%;
  z-index: 10;
  margin-top: -15%;
  margin-bottom: 2%;
}

@keyframes scale-down {
  to {
    scale: 0.5;
    top: 50%;
    translate: 0 -50%;
  }
}

@keyframes look-down {
  to {
    object-position: 100% 0;
  }
}

.intro {
  max-width: 100vw;
  width: var(--size-md);
  position: sticky;
  top: 0;
  margin-top: calc(var(--size-12) * 0.5);
}

.title {
  width: var(--size-md);
  max-width: 100vw;
  height: var(--title-height);
  gap: var(--size-2);
  padding: var(--size-4);
  animation: slide both ease;
  animation-timeline: scroll();
}

@keyframes slide {
  0%,
  10% {
    color: var(--green);
  }
  to {
    color: var(--gray-1);
    translate: calc(var(--size-15) * 0.2) 0;
  }
}

.title-wrapper {
  top: 60px;
  padding-left: 5%;
  position: relative;
  width: 130vw;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  justify-content: center;
  animation: shadow both;
  animation-timeline: scroll();
}

@keyframes shadow {
  0%,
  10% {
    background-color: transparent;
  }
  to {
    background-color: v-bind(coloroficialmenu);
    box-shadow: var(--shadow-4);
  }
}
.title a {
  font-weight: bold;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  padding-top: var(--size-8);
  display: grid;
  gap: var(--size-4);
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

.editarFoto {
  position: absolute;
  width: 30%;
  margin-top: -5%;
  margin-left: 25%;
  /* top: 60%; */
}

.modal-header {
  background-color: v-bind(coloroficialmenu);
  /* Color de fondo del encabezado */
  color: #fff;
  border-bottom: none;
  padding: 15px;
}

.titulos {
  font-size: 20px;
  margin-left: 40px;
  font-weight: 1000;
}

.respuestas {
  font-size: 15px;
  margin-left: 40px;
}

.contenedorDos {
  margin-bottom: 3%;
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  margin-top: 2%;
}

p{
  text-transform: capitalize;
}

.cuadrado {
  border: solid v-bind(coloroficialmenu);
  border-radius: 10px;
  background-color: #ececec;
  padding-top: 2%;
  padding-left: 5%;
  padding-bottom: 2%;
  width: 80%;
  height: 10%;
}

/* ................................................... */

input[type="file"]#hoja-vida {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

label[for="hoja-vida"] {
  font-size: 14px;
  font-weight: 600;
  color: v-bind(coloroficialtres);
  background-color: v-bind(coloroficialmenu);
  display: inline-block;
  transition: all 0.5s;
  cursor: pointer;
  padding: 9px 40px !important;
  text-transform: uppercase;
  width: fit-content;
  text-align: center;
  margin: 0 10px;
  border-radius: 5px;
}

/* Estilos para tabletas y pantallas medianas */
@media screen and (min-width: 769px) and (max-width: 1200px) {
  .backButton {
    margin-left: -25rem;
  }
  .logo {
    display: none;
  }
  .editaUser {
    font-size: 12px;
    margin-left: -20px;
    top: -50px;
  }
  .title-wrapper {
    width: 90%;
    margin-left: -5%;
  }
  .avatar {
    margin-left: -30%;
  }
  .editarFoto {
    margin-top: 15px;
    margin-left: 40px;
    width: 60%;
  }
  .title {
    width: 100%;
    margin: -45% 0 0 -16%;
  }
  .titulo {
    width: 50%;
  }
  .intro {
    width: 70%;
    margin-left: 30%;
  }
  .nombrePer {
    margin-top: 15px;
  }
}

/* Estilos para dispositivos móviles anchos */
@media screen and (min-width: 563px) and (max-width: 768px) {
  .logo {
    display: none;
  }
  .avatar {
    width: 25%;
    margin-left: -50px;
    margin-top: 20px;
    border: solid 3px var(--green-6);
  }
  .titulo {
    width: 50%;
    margin-top: -57%;
    margin-left: -10px;
  }
  .intro {
    width: 100%;
  }
  .title {
    width: 100%;
  }
  .title-wrapper {
    width: 80%;
  }
  .editaUser {
    font-size: 12px;
    margin-left: -20px;
    top: -120px;
  }
  .editarFoto {
    margin-top: 15px;
    margin-left: 24%;
    width: 50%;
  }
  .contenedorDos {
    margin-left: -80px;
    margin-bottom: 30%;
  }

  .noInfoxd {
    margin-left: 25%;
  }
}

/* Estilos para dispositivos móviles mas pequeños */
@media screen and (max-width: 562px) {
  .imagenRes {
    /* margin-top: 25%; */
    margin-left: -90px;
    width: 140%;
  }
  .col-12 {
    display: none;
  }
  .avatar {
    margin-left: -40%;
    margin-top: -1%;
    width: 25%;
    border: solid 3px var(--green-6);
  }

  .titulo {
    margin-left: -70%;
    margin-top: 25%;
  }
  .title {
    width: 100px;
    padding: 0;
  }
  .tituloRol {
    font-size: 10px;
  }
  .titulito {
    font-size: 9px;
  }
  .intro {
    width: 195px;
  }
  .title-wrapper {
    top: -75px;
    height: 20px;
    width: 100px;
    margin-left: 10%;
    font-size: 8px;
    padding: 0;
  }
  .intro {
    margin: 0;
  }
  .nombrePer {
    font-size: 15px;
    margin-top: -10%;
    margin-left: -25%;
  }

  .editaUser {
    font-size: 8px;
    margin-left: -30px;
    top: -10px;
    /* display: none; */
  }
  .editarFoto {
    font-size: 10px;
    margin-top: 15px;
    margin-left: -40%;
    width: 50%;
  }
  label > .btn-secondary {
    height: 2px;
  }
  .iborrainputfile {
    width: 10px;
  }
  .logo {
    display: none;
  }
  .contenedorDos {
    margin-left: -90px;
    padding: 0;
    width: 130%;
    margin-bottom: 150px;
  }
  .cuadrado {
    margin-left: 25px;
    width: 125%;
  }
  .buscador {
    width: 100px;
  }
  .backButton {
    margin-left: -30rem;
  }

  .noInfoxd {
    margin-left: 20%;
  }
}
</style>
