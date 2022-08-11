import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDRamRyCH_VmXSHRGLEGWk5wFLFsJbZWQo",
  authDomain: "support-bfed7.firebaseapp.com",
  projectId: "support-bfed7",
  storageBucket: "support-bfed7.appspot.com",
  messagingSenderId: "844437503032",
  appId: "1:844437503032:web:4ee85234951b423646bacd",
  measurementId: "G-R6W69W5N7M"
};


const app = initializeApp(firebaseConfig);

export {
  app
}