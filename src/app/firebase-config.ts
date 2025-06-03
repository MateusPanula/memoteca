import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyDjRVa0BYmHVGXSPa3TFFVCjLeOohCcpso",
    authDomain: "memoteca-1bbf1.firebaseapp.com",
    projectId: "memoteca-1bbf1",
    storageBucket: "https://memoteca-1bbf1-default-rtdb.firebaseio.com/",
    messagingSenderId: "7507773842",
    appId: "1:7507773842:web:0ade562f4b670ed64d194b",
    measurementId: "G-0SQWDMMQBF"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };