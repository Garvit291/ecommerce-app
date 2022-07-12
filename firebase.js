// For Firebase JS SDK v7.20.0 and later, measurementId is optional


import firebase  from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyBThFHDmk08X7bcSu7GefyoUzgyXSZLmt0",
  authDomain: "fir-80a83.firebaseapp.com",
  projectId: "fir-80a83",
  storageBucket: "fir-80a83.appspot.com",
  messagingSenderId: "1016605816039",
  appId: "1:1016605816039:web:ae4107a1d77ec4c33c1e42",
  measurementId: "G-63YMN0DB0V"
  };


const app = !firebase.apps.length ?  firebase.initializeApp(firebaseConfig): firebase.app();

const db = app.firestore();

export default db;