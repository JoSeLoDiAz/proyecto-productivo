<template>
  <div style="margin-top: 70px; text-transform: capitalize">
    <div class="row vista">
      <div class="col-12" style="margin-top: 10px">
        <div
          class="justify-content-md-center d-flex"
          style="width: 100%; padding-left: 2%"
        >
          <div
            style="width: 90%"
            id="carouselExampleDark"
            class="carousel carousel-dark slide"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active" data-bs-interval="3000">
                <img
                  style="filter: brightness(0.4); height: 400px"
                  src="https://sindesena.org/wp-content/uploads/2022/10/documento-02.jpg"
                  class="d-block w-100"
                  alt="..."
                />
                <div class="carousel-caption d-none d-md-block">
                  <h4 style="color: white">
                    Bienvenido al Repositorio - COLMABE
                    <b>
                      {{ useUsuario.usuarioId.nombre }}
                      {{ useUsuario.usuarioId.apellidos }}</b
                    >
                  </h4>
                  <p style="color: white; font-size: 18px">
                    Descubre y gestiona todas las funciones disponibles en tu
                    rol
                    <b>{{ token.rol }}.</b>
                  </p>
                  <p
                    v-if="
                      useUsuario.rol === 'Gestor'.toLowerCase() ||
                      useUsuario.rol === 'Instructor'.toLowerCase()
                    "
                    style="color: white; font-size: 18px"
                  >
                    Tu red de formacion es
                    <b>{{ red1 }}.</b>
                  </p>
                </div>
              </div>
              <div class="carousel-item" data-bs-interval="2000">
                <img
                  style="filter: brightness(0.6); height: 400px"
                  src="https://www.las2orillas.co/wp-content/uploads/2023/10/- COLMABE-2.jpg"
                  class="d-block w-100"
                  alt="..."
                />
                <div class="carousel-caption d-none d-md-block">
                  <h6 style="color: white; font-size: 18px">
                    Descubre el Repositorio - COLMABE
                  </h6>
                  <p style="color: white">
                    Explora y mantén la documentación esencial de la
                    <b>formación - COLMABE.</b><br />
                    Aquí encontrarás recursos valiosos para el desarrollo de la
                    Formacion.
                  </p>
                </div>
              </div>
              <div class="carousel-item" data-bs-interval="2000">
                <img
                  style="filter: brightness(0.6); height: 400px"
                  src="https://www.COLMABE-virtual.co/wp-content/uploads/2012/02/Estudiar-en-Sena-virtual.png"
                  class="d-block w-100"
                  alt="..."
                />
                <div class="carousel-caption d-none d-md-block">
                  <h6 style="color: white; font-size: 18px">
                    ¡Explora el Entorno Virtual del <b>COLMABE</b>!
                  </h6>

                  <p style="color: white">
                    Sumérgete en el <b>Entorno Virtual del COLMABE</b> y descubre
                    una experiencia única.<br />Gestiona herramientas, recursos
                    y contenido dados a tu rol <b>{{ token.rol }}</b
                    >.
                  </p>
                </div>
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div
          v-if="token.rol === 'Administrador'.toLowerCase()"
          class="row"
          style="margin-top: 70px"
        >
          <span class="titulo d-flex justify-content-center"
            >Administrador del Colegio Manela Beltran COLMABE</span
          >
        </div>

        <div
          v-if="
            token.rol === 'Gestor'.toLowerCase() ||
            token.rol === 'Instructor'.toLowerCase()
          "
          class="row"
          style="margin-top: 70px"
        >
          <span class="titulo d-flex justify-content-center"
            >Centro agroturistico</span
          >
        </div>

        <div
          class="row d-sm-flex justify-content-center responSive"
          style="margin-top: 50px"
        >
          <svg
            style="width: 220"
            class="logo"
            xmlns:dc="http://purl.org/dc/elements/1.1/"
            xmlns:cc="http://creativecommons.org/ns#"
            xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
            xmlns:svg="http://www.w3.org/2000/svg"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
            xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
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
            |
          </svg>
        </div>
      </div>
      <div class="col-md-1 d-none d-md-block"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUsuarioStore } from "../stores/usuario";
import VueJwtDecode from "vue-jwt-decode";
const useUsuario = useUsuarioStore();

let token = ref(null);
let red = ref("");
let red1 = ref("");
let perfil = ref();

const setDocumentTitle = () => {
  document.title = `COLMABE || Inicio`;
};

async function decoded() {
  token.value = VueJwtDecode.decode(useUsuario.token);
  await useUsuario
    .buscarUsuarioId(token.value.id)
    .then(() => {
      perfil.value = useUsuario.usuarioId;
      red.value = perfil.value.red;
      red1.value = red.value.nombre;
    })
    .catch((err) => {
      console.log(err);
    });
}

decoded();
// onMounted(async()=>{
//   await decoded();
// });

onMounted(async () => {
  setDocumentTitle(), await traigodatos();
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
.vista {
  box-shadow: 10px 50px 100px rgb(209, 209, 209);
  background: rgb(0, 0, 0);
  background: linear-gradient(
    190deg,
    rgb(237, 237, 237) 0%,
    rgb(244, 244, 244) 55%,
    rgb(243, 243, 243) 100%
  );
}

.titulo {
  font-size: 2em;
  color: v-bind(coloroficialletra);
  font-weight: 1000;
}

@media (max-width: 576px) {
  .card-text {
    font-size: 0.8rem;
  }

  .contenedor {
    margin-left: 0;
  }

  .titulo {
    font-size: 1em;
    font-weight: 700;
  }
}

.card-title {
  font-weight: 600;
  font-size: 20px;
}

.icoimg {
  width: 50%;
  height: 50%;
  color: #39a900;
}

@media only screen and (max-width: 600px) {
  /* cuando la pantalla se hace pequeña */
  .vista {
    left: -10px;
    height: 80vh;
  }
  .responSive {
    margin-bottom: 10rem;
  }
}

@media only screen and (min-width: 600px) {
  /* cuando la pantalla es grande */

  .vista {
    height: 120vh;
  }
  .responSive {
    margin-bottom: 10rem;
  }
}
</style>
