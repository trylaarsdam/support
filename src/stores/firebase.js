import { defineStore } from "pinia";

export const useFirebaseAppStore = defineStore({
  id: "firebaseApp",
  state: () => ({
    firebase: null,
  }),
  getters: {
    app: (state) => state.firebase
  },
  actions: {
    set(app) {
      this.firebase = app;
    },
  },
});
