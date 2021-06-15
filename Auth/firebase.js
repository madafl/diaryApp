import firebase from "firebase";
//import "firebase/auth";
//import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDLpZRw5g1YqeJD3uToX1-UH_12nCckcVE",
    authDomain: "journalapp-3e0b6.firebaseapp.com",
    projectId: "journalapp-3e0b6",
    storageBucket: "journalapp-3e0b6.appspot.com",
    messagingSenderId: "36885302086",
    appId: "1:36885302086:web:0d1fac45bc53a2e21a3347",
    measurementId: "G-3KL97EBC01"
  };
  // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export default firebase;