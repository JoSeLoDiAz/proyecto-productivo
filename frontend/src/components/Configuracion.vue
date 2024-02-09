<template>
  <div>
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 70px;
        margin-bottom: 40px;
      "
    >
      <p :style="{ color: coloroficialletra }" class="titulo">
        Configuracion de personalización - COLMABE
      </p>
      <img class="herramienta" src="../assets/herramienta.png" alt="" />
    </div>

    <div class="card-container">
      <div class="card">
        <div class="card-body">
          <div style="display: flex; justify-content: center">
            <h5 class="card-title">
              Color <span :style="{ color: coloroficialletra }">#1</span>
            </h5>
          </div>
          <ul>
            <li>Títulos de cada componente.</li>
          </ul>

          <div style="margin-top: 180px">
            <div style="display: flex">
              <img
                style="height: 35px; width: 35px; margin-right: 5px"
                src="../assets/brocha.png"
                alt=""
              />
              <input v-model="extraigocolorletra" type="color" />
            </div>
            <br />
            <button @click="editarcolor()" class="btn btn-dark">
              Cambiar a color seleccionado.
            </button>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <div style="display: flex; justify-content: center">
            <h5 class="card-title">
              Color <span :style="{ color: coloroficialmenu }">#2</span>
            </h5>
          </div>
          <ul style="margin-top: 30px">
            <li>Fondo de los botones agregar</li>
            <li>Fondo encabezado de modales</li>
            <li>Fondo encabezado de tablas</li>
            <li>Fondo al pasar el puntero por la navegacion</li>
            <li>Barra principal de la pagina.</li>
          </ul>

          <div style="display: flex; margin-top: 35px">
            <img
              style="height: 35px; width: 35px; margin-right: 5px"
              src="../assets/brocha.png"
              alt=""
            />
            <input v-model="extraigocolormenu" type="color" />
          </div>
          <br />
          <button @click="editarcolor()" class="btn btn-dark">
            Cambiar a color seleccionado.
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <div style="display: flex; justify-content: center">
            <h5 class="card-title">
              Color <span :style="{ color: coloroficialtres }">#3</span>
            </h5>
          </div>

          <ul style="margin-top: 30px">
            <li>Letra del boton agregar</li>
            <li>Letra de la barra de navegacion</li>
            <li>Letra de titulos de las tablas</li>
            <li>Letra de titulos de modales</li>
            <li>Letra de boton modales.</li>
          </ul>

          <div style="display: flex; margin-top: 60px">
            <img
              style="height: 35px; width: 35px; margin-right: 5px"
              src="../assets/brocha.png"
              alt=""
            />
            <input v-model="extraigocolortres" type="color" />
          </div>

          <br />
          <button @click="editarcolor()" class="btn btn-dark">
            Cambiar a color seleccionado.
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <div style="display: flex; justify-content: center">
            <h5 class="card-title">
              Color <span :style="{ color: coloroficialcuatro }">#4</span>
            </h5>
          </div>

          <ul style="margin-top: 30px">
            <li>Se aplica al logo del sena.</li>
          </ul>

          <br />
          <div style="display: flex; margin-top: 140px">
            <img
              style="height: 35px; width: 35px; margin-right: 5px"
              src="../assets/brocha.png"
              alt=""
            />
            <input v-model="extraigocolorcuatro" type="color" />
          </div>
          <br />
          <button @click="editarcolor()" class="btn btn-dark">
            Cambiar a color seleccionado.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useConfiguracionStore } from "../stores/configuracion.js";
const useConfiguracion = useConfiguracionStore();

let infobasedatos = ref();
let coloroficialletra = ref();
let coloroficialmenu = ref();
let coloroficialtres = ref();
let coloroficialcuatro = ref();
let pageTitle = ref("");

const setDocumentTitle = () => {
  pageTitle.value = "Configuracion General"; // Título predeterminado aquí
  document.title = `COLMABE || ${pageTitle.value}`;
  console.log(document.title);
};

async function traigodatos() {
  await useConfiguracion
    .traerConfiguracion()
    .then((resultado) => {
      infobasedatos.value = resultado[0]._id;
      console.log(infobasedatos.value);
      coloroficialletra.value = resultado[0].colorletra;
      coloroficialmenu.value = resultado[0].colormenu;
      coloroficialtres.value = resultado[0].colortres;
      coloroficialcuatro.value = resultado[0].colorcuatro;
    })
    .catch((error) => {
      console.error("Hubo un error:", error);
    });
}

let extraigocolorletra = ref();
let extraigocolormenu = ref();
let extraigocolortres = ref();
let extraigocolorcuatro = ref();

async function editarcolor() {
  console.log(extraigocolorletra.value);
  console.log(extraigocolormenu.value);
  await useConfiguracion.editarConfiguracion(
    infobasedatos.value,
    extraigocolorletra.value,
    extraigocolormenu.value,
    extraigocolortres.value,
    extraigocolorcuatro.value
  );

  traigodatos();
  window.location.reload();
}

onMounted(setDocumentTitle(), traigodatos());
</script>

<style scoped>
.titulo {
  text-align: center;
  font-weight: 1000;
  font-size: 45px;
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: 700;
  margin-right: 1%;
}

.herramienta {
  height: 60px;
  width: 60px;
}

body {
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-left: 130px;
  margin-right: 70px;
}

.card {
  background-color: rgb(236, 238, 238);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  height: 26rem;
  width: 19rem;
}

.card-title {
  font-size: 30px;
  font-weight: 1000;
}

.card-body {
  padding: 20px;
}

.btn {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
}

.btn-dark {
  color: #fff;
  background-color: #343a40;
  border-color: #343a40;
}

.btn-dark:hover {
  background-color: #23272b;
}

@media (max-width: 768px) {
  .titulo {
    text-align: center;
    font-weight: 1000;
    font-size: 25px;
    text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
    font-weight: 700;
    margin-right: 1%;
  }

  .herramienta {
    height: 40px;
    width: 40px;
  }

  body {
    font-family: "Arial", sans-serif;
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-right: 70px;
    margin-left: 70px;
  }

  .card {
    background-color: rgb(236, 238, 238);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    height: 35rem;
    width: 40rem;
  }

  .card-title {
    font-size: 30px;
    font-weight: 1000;
  }

  .card-body {
    padding: 20px;
  }

  .btn {
    display: inline-block;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: background-color 0.3s ease;
  }

  .btn-dark {
    color: #fff;
    background-color: #343a40;
    border-color: #343a40;
  }

  .btn-dark:hover {
    background-color: #23272b;
  }
}

@media (max-width: 391px) {
  .titulo {
    text-align: center;
    font-weight: 1000;
    font-size: 25px;
    text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
    font-weight: 700;
    margin-right: 1%;
  }

  .herramienta {
    height: 40px;
    width: 40px;
  }

  body {
    font-family: "Arial", sans-serif;
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-left: 0px;
    margin-right: 0px;
  }

  .card {
    background-color: rgb(236, 238, 238);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    height: 30rem;
    width: 40rem;
    margin-bottom: 20%;
  }

  .card-title {
    font-size: 30px;
    font-weight: 1000;
  }

  .card-body {
    padding: 20px;
  }

  .btn {
    display: inline-block;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: background-color 0.3s ease;
  }

  .btn-dark {
    color: #fff;
    background-color: #343a40;
    border-color: #343a40;
  }

  .btn-dark:hover {
    background-color: #23272b;
  }
}
</style>
