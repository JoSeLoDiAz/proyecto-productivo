import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../components/Login.vue";
import Contenedor from "../components/Contenedor.vue";
import Inicio from "../components/Inicio.vue";
import Ambientes from "../components/Ambientes.vue";
import Centros from "../components/Centros.vue";
import Ciudades from "../components/Ciudades.vue";
import Desarrollo from "../components/Desarrollo.vue";
import Evaluacion from "../components/Evaluacion.vue";
import Guia from "../components/Guias.vue";
import Investigacion from "../components/Investigacion.vue";
import Infoprogram from "../components/Infoprogram.vue";
import Materiales from "../components/Materiales.vue";
import MaterialesPrograma from "../components/MaterialesPrograma.vue";
import MaterialFormacion from "../components/MaterialFormacion.vue";
import Nivel from "../components/Nivel.vue";
import Programas from "../components/programas.vue";
import Proyecto from "../components/Proyectos.vue";
import Redes from "../components/Redes.vue";
import Registro from "../components/Registros.vue";
import Retroalimentacion from "../components/retroalimentacion.vue";
import Rol from "../components/Roles.vue";
import Sedes from "../components/Sedes.vue";
import Usuarios from "../components/Usuarios.vue";
import Instructor from "../components/Instructor.vue";
 import Configuracion from "../components/Configuracion.vue"

import Perfil from "../components/Perfil.vue";
import Password from "../components/Password.vue"

import { useUsuarioStore } from "../stores/usuario.js";

const checkAuth = () => {
  const useUsuario = useUsuarioStore();
  const token = useUsuario.token;

  if (useUsuario.inicio == "" || useUsuario.inicio == undefined) return false;
  if (!token) return false;
  return true;
};

const auth = (to, from, next) => {
  if (checkAuth()) {
    const userStore = useUsuarioStore();
    const userRol = userStore.rol;

    if (!to.meta.rol.includes(userRol)) {
      return next({ name: "login" });
    };

    next();
  } else {
    next({ name: "login" });
  }
};

const routes = [
  {path:"/forgot/password", component: Password},
  { path: "/", name: "login", component: Login },
  {
    path: "/contenedor",
    component: Contenedor,

    children: [
      {
        path: "/inicio",
        name: "inicio",
        component: Inicio,
        meta: {
          rol: ["Administrador".toLowerCase(), "Gestor".toLowerCase(), "Instructor".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },
      {
        path: "/ambientes",
        name: "ambientes",
        component: Ambientes,
        meta: {
          rol: ["Administrador".toLowerCase(), "Gestor".toLowerCase(), "Instructor".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },
      {
        path: "/configuracion",
        name: "configuracion",
        component: Configuracion,
        meta: {
          rol: ["Administrador".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },

      {
        path: "/centros",
        name: "centros",
        component: Centros,
        meta: {
          rol: ["Administrador".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },

      {
        path: "/ciudades",
        name: "ciudades",
        component: Ciudades,
        meta: {
          rol: ["Administrador".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },

      {
        path: "/desarrollo",
        name: "desarrollo",
        component: Desarrollo,
        meta: {
          rol: ["Gestor".toLowerCase(), "Instructor".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },

      {
        path: "/evaluacion",
        name: "evaluacion",
        component: Evaluacion,
        meta: {
          rol: ["Gestor".toLowerCase(), "Instructor".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },

      {
        path: "/guia",
        name: "guia",
        component: Guia,
        meta: {
          rol: ["Gestor".toLowerCase(), "Instructor".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },

      {
        path: "/investigacion",
        name: "investigacion",
        component: Investigacion,
        meta: {
          rol: ["Gestor".toLowerCase(), "Instructor".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },

      {
        path: "/infoprograma",
        name: "infoprograma",
        component: Infoprogram,
        meta: {
          rol: ["Gestor".toLowerCase(), "Instructor".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },

      {
        path: "/materiales",
        name: "materiales",
        component: Materiales,
        meta: {
          rol: ["Administrador".toLowerCase(), "Gestor".toLowerCase(), "Instructor".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },

      {
        path: "/materialesprograma",
        name: "materialesprograma",
        component: MaterialesPrograma,
        meta: {
          rol: ["Gestor".toLowerCase(), "Instructor".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },

      {
        path: "/materialformacion",
        name: "materialformacion",
        component: MaterialFormacion,
        meta: { rol: ["Administrador".toLowerCase(), "Mega".toLowerCase()] },
        beforeEnter: auth,
      },

      {
        path: "/niveles",
        name: "niveles",
        component: Nivel,
        meta: {
          rol: ["Administrador".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },

      {
        path: "/programas",
        name: "programas",
        component: Programas,
        meta: {
          rol: ["Gestor".toLowerCase(), "Instructor".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },

      {
        path: "/proyectos",
        name: "proyectos",
        component: Proyecto,
        meta: {
          rol: ["Gestor".toLowerCase(), "Instructor".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },

      {
        path: "/redes",
        name: "redes",
        component: Redes,
        meta: {
          rol: ["Administrador".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },

      {
        path: "/registros",
        name: "registros",
        component: Registro,
        meta: {
          rol: ["Gestor".toLowerCase(), "Instructor".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },

      {
        path: "/retroalimentacion",
        name: "retroalimentacion",
        component: Retroalimentacion,
        meta: {
          rol: ["Gestor".toLowerCase(), "Instructor".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },

      {
        path: "/roles",
        name: "roles",
        component: Rol,
        meta: {
          rol: ["Administrador".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },

      {
        path: "/sedes",
        name: "sedes",
        component: Sedes,
        meta: {
          rol: ["Administrador".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },

      {
        path: "/usuarios",
        name: "usuarios",
        component: Usuarios,
        meta: {
          rol: ["Administrador".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },

      {
        path: "/instructor",
        name: "instructor",
        component: Instructor,
        meta: {
          rol: ["Gestor".toLowerCase(), "Instructor".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },

      {
        path: "/perfil",
        name: "perfil",
        component: Perfil,
        meta: {
          rol: ["Administrador".toLowerCase(), "Gestor".toLowerCase(), "Instructor".toLowerCase(), "Mega".toLowerCase()],
        },
        beforeEnter: auth,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
