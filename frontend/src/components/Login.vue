<template>
  <div class="container">
    <img class="imagenfondosena" src="../assets/iconosena.jpg" alt="fondo" />

    <div class="box">
      <!-- Login Box -->
      <div class="box-login" :style="{ left: loginLeft }">
        <div class="top-header">
          <p class="titulo" style="font-size: 20px;"><b>Colegio Manuela Beltran</b><br>
          Inicion de sesion</p>
          <img src="../assets/colmabe.jpg" style="width: 40px; height: 40px" alt="">
        </div>

        <div class="input-group">
          <div class="input-field">
            <input
              type="text"
              class="input-box"
              id="logEmail"
              required
              v-model="loginEmail"
              @keyup.enter="inicioAdmin()"
            />
            <label for="logEmail">N° Identificación</label>
          </div>

          <div class="input-field">
            <input
              :type="showLogPassword ? 'text' : 'password'"
              class="input-box"
              id="logPassword"
              required
              v-model="loginPassword"
              @keyup.enter="inicioAdmin"
            />
            <label for="logPassword">Contraseña</label>

            <div class="password-toggle">
              <img
                style="height: 35px; width: 35px; padding: 5px"
                @click="toggleLogPasswordVisibility"
                v-if="showLogPassword"
                src="../assets/ver.png"
                alt=""
              />
              <img
                style="height: 35px; width: 35px; padding: 5px"
                @click="toggleLogPasswordVisibility"
                v-else
                src="../assets/nover.png"
                alt=""
              />
            </div>
          </div>

          <div class="input-field">
            <router-link
              @click="inicioAdmin()"
              :to="inicio"
              id="liveToastBtn"
              class="btn"
              :style="{
                backgroundColor: coloroficialmenu,
                color: coloroficialtres,
              }"
              v-if="useUsuario.cargando == false"
            >
              Iniciar sesión
            </router-link>

            <div v-else class="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>

            <br />
            <br />
          </div>
        </div>

        <div class="switch">
          <a href="#" class="login" @click="switchToLogin">Iniciar sesion</a>
          <a href="#" class="register" @click="switchToRegister"
            >Recuperar contra</a
          >
        </div>
      </div>
      <!-- Register -->
      <div class="box-register" :style="{ right: registerRight }">
        <div class="top-header">
          <p class="titulo2">Recupera tu contraseña</p>
        </div>
        <div class="input-group">
          <div class="input-field">
            <input
              type="text"
              class="input-box"
              id="regUser"
              required
              v-model="regUser"
            />
            <label for="regUser">Ingresa tu correo electronico</label>
          </div>

          <div class="input-field">
            <div
            v-if="useUsuario.cargando === true"
            class="row d-flex justify-content-center"
          >
            <div class="spinner-border" :style="{
                color: coloroficialtres,
              }" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <button v-else
              :style="{
                backgroundColor: coloroficialmenu,
                color: coloroficialtres,
              }"
              class="btn"
              @click="envioEmail()"
            >
              Recuperar contraseña
            </button>
          </div>

          <div class="switch2">
            <a href="#" class="login" @click="switchToLogin">Iniciar sesion</a>
            <a href="#" class="register" @click="switchToRegister"
              >Recuperar contraseña</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

let loginEmail = ref("");
let loginPassword = ref("");
const rememberMe = ref(false);
let regUser = ref("");
const regEmail = ref("");
const regPassword = ref("");
const rememberMeReg = ref(false);
const showLogPassword = ref(false);
const showRegPassword = ref(false);
const loginLeft = ref("27px");
const registerRight = ref("-350px");
const switchBtnLeft = ref("0px");
import { useRouter } from "vue-router";
import { useUsuarioStore } from "../stores/usuario.js";
let alert = ref(false);
let inicio = ref("");
let errores = ref("");
const useUsuario = useUsuarioStore();
const router = useRouter();
let ok = ref("");
let pageTitle = ref("");

const setDocumentTitle = () => {
  pageTitle.value = "Login"; // Título predeterminado aquí
  document.title = `COLMABE || ${pageTitle.value}`;
  console.log(document.title);
};

const toggleLogPasswordVisibility = () => {
  showLogPassword.value = !showLogPassword.value;
};

const switchToLogin = () => {
  loginLeft.value = "27px";
  registerRight.value = "-350px";
  switchBtnLeft.value = "0px";
};

const switchToRegister = () => {
  loginLeft.value = "-350px";
  registerRight.value = "25px";
  switchBtnLeft.value = "150px";
};

async function inicioAdmin() {
  await useUsuario
    .inicio(loginEmail.value, loginPassword.value)
    .then(() => {
      alertaok();
      // sessionStorage.setItem("token", token);
      // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      inicio.value = "/inicio";
      router.push(inicio.value);
      limpiar();
    })
    .catch((error) => {
      console.log(error);
      if (error.response.data.errors) {
        errores.value = "";
        errores.value = error.response.data.errors[0].msg;
        alertaerror();
      } else if (error.response.data.msg) {
        errores.value = "";
        errores.value = error.response.data.msg;
        alertaerror();
      }
    });
}

async function envioEmail() {
  await useUsuario
    .recuperaPassword(regUser.value)
    .then((res) => {
      ok.value = res.data.msg;
      alertaokok();
    })
    .catch((err) => {
      if (err.response.data.errors) {
        errores.value = "";
        errores.value = err.response.data.errors[0].msg;
        alertaerror();
      } else if (err.response.data.msg) {
        errores.value = "";
        errores.value = err.response.data.msg;
        alertaerror();
      }
    });
}

function limpiar() {
  loginEmail.value = "";
  loginPassword.value = "";
  errores.value = "";
}

function alertaok() {
  Swal.fire({
    icon: "success",
    confirmButtonColor: coloroficialmenu.value,
    title: "Inicio de sesion exitoso.",
    text: "Bienvenido al sistema de Colegio Manuela Beltran!",
    timer: 2000,
  });
}

function alertaokok() {
  Swal.fire({
    icon: "success",
    confirmButtonColor: coloroficialmenu.value,
    title: ok.value,
    text: "software sena!",
    timer: 4000,
  });
}

function alertaerror() {
  Swal.fire({
    icon: "error",
    confirmButtonColor: coloroficialmenu.value,
    color: coloroficialmenu.value,
    title: "Oops...",
    text: errores.value,
  });
}

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
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap");
.lds-facebook {
  display: inline-block;
  position: relative;
  width: 50px;
  height: 30px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #fff;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}

.container {
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  height: 100vh;
  width: 100vw;
}

.imagenfondosena {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  filter: blur(2px);
  z-index: -1;
}
.titulo {
  font-size: 35px;
  font-weight: 600;
  margin-right: 10px;
}

.titulo2 {
  font-size: 30px;
  font-weight: 600;
}

.box {
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 60px 20px 30px 20px;
  height: 520px;
  width: 400px;
  background-color: rgba(221, 234, 228, 0.4);
  border-radius: 30px;
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  border: 3px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}
.box-login {
  position: absolute;
  width: 85%;
  left: 27px;
  transition: 0.5s ease-in-out;
}
.box-register {
  position: absolute;
  width: 85%;
  right: -350px;
  transition: 0.5s ease-in-out;
}
.top-header {
  text-align: center;
  margin: 30px 0;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}
.top-header h3 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 8px;
}
.input-group {
  width: 100%;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.input-field {
  margin: 12px 0;
  position: relative;
}
.input-box {
  width: 20rem;
  margin-right: 10px;
  margin-left: 10px;
  height: 50px;
  font-size: 15px;
  color: #040404;
  border: none;
  border-radius: 10px;
  padding: 7px 45px 0 20px;
  background: rgba(224, 223, 223, 0.6);
  backdrop-filter: blur(2px);
  outline: none;
}
.input-field label {
  position: absolute;
  left: 20px;
  top: 15px;
  font-size: 15px;
  transition: 0.3s ease-in-out;
}
.input-box:focus ~ label,
.input-box:valid ~ label {
  top: 2px;
  font-size: 10px;
  color: #000000;
  font-weight: 500;
}
.eye-area {
  position: absolute;
  top: 20px;
  right: 40px;
}
.eye-box {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
i {
  position: absolute;
  color: #444444;
  cursor: pointer;
}
#eye,
#eye-2 {
  opacity: 1;
}
#eye-slash,
#eye-slash-2 {
  opacity: 0;
}

.switch {
  display: flex;
  width: 85%;
  height: 50px;
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 10%;
  margin-right: 20px;
  position: fixed;
}

.password-toggle {
  position: absolute;
  right: 10px; /* Ajusta el espaciado a tu preferencia */
  top: 50%; /* Centra verticalmente */
  transform: translateY(-50%);
}

.switch2 {
  display: flex;
  width: 85%;
  height: 50px;
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 120%;
  position: fixed;
}

.switch a {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #000;
  text-decoration: none;
  width: 50%;
  border-radius: 10px;
  z-index: 10;
}
.switch2 a {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #000;
  text-decoration: none;
  width: 50%;
  border-radius: 10px;
  z-index: 10;
}
</style>
