import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDtIJrsxo60HetJVKwvHBGk71bps8Y3pPo",
    authDomain: "todoproject-e2e0a.firebaseapp.com",
    projectId: "todoproject-e2e0a",
    storageBucket: "todoproject-e2e0a.appspot.com",
    messagingSenderId: "434670208469",
    appId: "1:434670208469:web:f2fa07f5295215a2cce95c"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;