import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCXSe5Fk_KtQplOu2RcpKPkGnVKgLiVd1w",
    authDomain: "outgrow-eb1d5.firebaseapp.com",
    projectId: "outgrow-eb1d5",
    storageBucket: "outgrow-eb1d5.appspot.com",
    messagingSenderId: "303749833471",
    appId: "1:303749833471:web:ddab46b0aa47aa026ee2ca",
    measurementId: "G-60JD83QHNV"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();
export const auth = firebase.auth();
export const fb_auth = firebase.auth;
export const storage = app.storage();
export const serverTime = firebase.firestore.FieldValue.serverTimestamp();