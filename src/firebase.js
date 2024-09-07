// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyCzT9ik0WKN4BRpfQ9xwF8UnP2ifb-YB00",
    authDomain: "chatify-7358b.firebaseapp.com",
    projectId: "chatify-7358b",
    storageBucket: "chatify-7358b.appspot.com",
    messagingSenderId: "732553029844",
    appId: "1:732553029844:web:8118ea23b54870d329f341",
    measurementId: "G-LF5JZTXREC"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore

const db = getFirestore(firebaseApp);

export default db;