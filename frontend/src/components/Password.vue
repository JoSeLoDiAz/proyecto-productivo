<template>
  <div>
    <div class="row" style="height: 50px;">
      <div class="col-12 d-flex justify-content-center align-items-center titulo">
        <div >Cambio de contraseña</div>
      </div>

    </div>
    <div class="row" style="height: 90vh;margin-top: 30px;">
      <div class="col-2"></div>
      <div class="col-8 ">
        <center>
        <div style="margin-top: 20px;">
          <strong  style="margin-right: 20px;">Nueva contraseña</strong>
          <input v-model="password" type="password" />
        </div>
        <div style="margin-top: 20px;">
          <strong style="margin-right: 20px;">Confimar contraseña</strong>
          <input v-model="password2" type="password" />
        </div>
        <div  style="height:60px; margin-top: 10px;">
          <div v-if="errores != ''" class="alert alert-warning" role="alert">{{ errores }}</div>
        </div>
        <div>
          <button @click="newPassword()" class="button" type="button">
            <span :style="{color: coloroficialtresl}" class="button__text">Cambiar contraseña</span>
            <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="48" viewBox="0 0 48 48" height="48"
                class="svg">
                <path
                  d="M35.3 12.7c-2.89-2.9-6.88-4.7-11.3-4.7-8.84 0-15.98 7.16-15.98 16s7.14 16 15.98 16c7.45 0 13.69-5.1 15.46-12h-4.16c-1.65 4.66-6.07 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.31 0 6.28 1.38 8.45 3.55l-6.45 6.45h14v-14l-4.7 4.7z">
                </path>
                <path fill="none" d="M0 0h48v48h-48z"></path>
              </svg></span>
          </button>
        </div>
      </center>
      </div>
      <div class="col-2"></div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUsuarioStore } from "../stores/usuario.js";

const useUsuario = useUsuarioStore();
const router = useRouter();
const password = ref("");
const password2 = ref("");
let errores = ref("");
let ok = ref("");

async function newPassword() {
  const resetToken = router.currentRoute.value.query.reset;
  if (
    password.value == ''||
    password2.value == ''
  ) {
    errores.value = "Por favor llene los campos";
    setTimeout(() => {
      errores.value=""
    }, 4000);
  }
  if (
    password.value !== password2.value ||
    password2.value !== password.value
  ) {
    errores.value = "Las contraseñas no coinciden";
    setTimeout(() => {
      errores.value=""
    }, 4000);
  } else {
    try {
      if (!resetToken) {
        console.log("Token de restablecimiento no disponible ");
        return;
      }

      let cambio = await useUsuario.newPassword(resetToken, password.value);
      if (cambio.status == 200) {
        ok.value = cambio.data.msg;
        alertaok();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

function alertaok() {
  Swal.fire({
    icon: "success",
    confirmButtonColor: "#16723b",
    title: ok.value,
    text: "Legado SENA",
    timer: 3000,
  });
}

onMounted(async () => {
 await traigodatos();
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

.titulo {
background-color: v-bind(coloroficialmenu);
color: v-bind(coloroficialletra);
font-size: 25px;
font-family:Georgia, 'Times New Roman', Times, serif;
padding: 15px;
}
.button {
  position: relative;
  width: 170px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid v-bind(coloroficialmenu);
  background-color:v-bind(coloroficialmenu) ;
  overflow: hidden;
  margin-top: 20px;
}

.button, .button__icon, .button__text {
  transition: all 0.3s;

}

.button .button__text {
  transform: translateX(5px);
  color: #fff;
  font-weight: 400;
  font-size: 13px;
}

.button .button__icon {
  position: absolute;
  transform: translateX(109px);
  height: 100%;
  width: 40px;
  background-color: v-bind(coloroficialmenu);
  display: flex;
  align-items: center;
  justify-content: center;
  left: 20px;
}

.button .svg {
  width: 20px;
  fill: #fff;
}

.button:hover {
  background: v-bind(coloroficialmenu);
}

.button:hover .button__text {
  color: transparent;
}

.button:hover .button__icon {
  width: 170px;
  transform: translateX(-20px);
}

.button:active .button__icon {
  background-color: v-bind(coloroficialmenu);
  color: v-bind(coloroficialletra);
}

.button:active {
  border: 1px solid v-bind(coloroficialmenu);
}

.button:hover .svg {
  transform:rotate(200deg);
  transition: 1s;
}
</style>