import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9Sje9GiD6omufOku-AHl8HX6z0wDN_x4",
  authDomain: "pinia-store-281a0.firebaseapp.com",
  projectId: "pinia-store-281a0",
  storageBucket: "pinia-store-281a0.appspot.com",
  messagingSenderId: "565670427404",
  appId: "1:565670427404:web:056dbf6d2ff50d6842e729"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const auth = getAuth(app);

export {
  db,
  auth
}