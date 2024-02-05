import { defineStore } from "pinia";

export const useFaseStore = defineStore("fase", {
  state: () => ({
    fase: localStorage.getItem("fase") || "",
  }),
  getters: {
    getFase: (state) => state.fase,
  },
  actions: {
    setFase(newValue) {
      this.fase = newValue;
      localStorage.setItem("fase", newValue);
    },
  },
});
// hhhhh

export const useRouteStore = defineStore("route", {
  state: () => ({
    route: localStorage.getItem("route") || "",
  }),
  getters: {
    getRoute: (state) => state.route,
  },
  actions: {
    setRoute(newRoute) {
      this.route = newRoute;
      localStorage.setItem("route", newRoute);
    },
  },
});
