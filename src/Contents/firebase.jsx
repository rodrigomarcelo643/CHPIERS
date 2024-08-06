import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdnkJ0cp6q_3EsYSRNzhA37lH6FTVkCZA",
  authDomain: "chpiers-56d54.firebaseapp.com",
  projectId: "chpiers-56d54",
  storageBucket: "chpiers-56d54.appspot.com",
  messagingSenderId: "148495867567",
  appId: "1:148495867567:web:b3cdba7622173ca7b7be5a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
