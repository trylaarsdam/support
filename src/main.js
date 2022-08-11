import { createApp } from "vue";
import { createPinia } from "pinia";

import firebase from 'firebase/compat/app';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);

const firebaseConfig = {
  apiKey: "AIzaSyDRamRyCH_VmXSHRGLEGWk5wFLFsJbZWQo",
  authDomain: "support-bfed7.firebaseapp.com",
  projectId: "support-bfed7",
  storageBucket: "support-bfed7.appspot.com",
  messagingSenderId: "844437503032",
  appId: "1:844437503032:web:4ee85234951b423646bacd",
  measurementId: "G-R6W69W5N7M"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// const analytics = firebase.analytics(firebaseApp);

app.use(createPinia());

import { useFirebaseAppStore } from '@/stores/firebase'
const firebaseStore = useFirebaseAppStore()
firebaseStore.firebase = firebaseApp

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";


app.use(router);
app.use(ElementPlus)
app.mount("#app");
