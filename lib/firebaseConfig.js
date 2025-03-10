import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASu90s6iRzm9_QANLKbmwHgbqt9c64mug",
    authDomain: "gen-lang-client-0364460309.firebaseapp.com",
    projectId: "gen-lang-client-0364460309",
    storageBucket: "gen-lang-client-0364460309.firebasestorage.app",
    messagingSenderId: "1081650588999",
    appId: "1:1081650588999:web:491da165c2a030ef777062"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


