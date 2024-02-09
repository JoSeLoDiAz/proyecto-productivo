import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {router} from './routes/routes.js'
import {createPinia} from 'pinia'
import {createPersistedState} from 'pinia-plugin-persistedstate'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const myapp = createApp(App)
const pinia = createPinia()
pinia.use(createPersistedState(createPersistedState({
    paths: ['token',
    'rol',
    'red',
    'idPrograma',
    'idDesarrollo',
    'idGuia',
    'faseAnalisis',
    'fasePlaneacion',
    'faseEjecucion',
    'FaseEvaluacion',
    'analisis',
    'planeacion',
    'ejecucion',
    'evaluacion',
    'idRol',
    'userId',
    'idRed',
    'idCentro'
  ],
  }),
  { storage: window.localStorage }));

myapp.use(router)
myapp.use(pinia)




myapp.mount('#app')

