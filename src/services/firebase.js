import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3TTEd92HHIQH27UVtT2rLpA8Otqwvzh0",
  authDomain: "agenda-pro-12.firebaseapp.com",
  projectId: "agenda-pro-12",
  storageBucket: "agenda-pro-12.appspot.com",
  messagingSenderId: "927754551708",
  appId: "1:927754551708:web:2b7a71164882097bb94859"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
