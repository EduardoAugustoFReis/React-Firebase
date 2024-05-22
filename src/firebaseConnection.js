import {initializeApp} from  "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACVt4PPzb6iAYJVh1cr6nLE-RF2LV6JRQ",
  authDomain: "udemy-5d07c.firebaseapp.com",
  projectId: "udemy-5d07c",
  storageBucket: "udemy-5d07c.appspot.com",
  messagingSenderId: "137993591237",
  appId: "1:137993591237:web:337cd76e472ffaf0d693ac",
  measurementId: "G-QGM1WCLF1K"
};

// inicializar o firebase com as configurações feitas
const firebaseApp = initializeApp(firebaseConfig);

// inicializou o getFirestore 
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export  {db, auth};
