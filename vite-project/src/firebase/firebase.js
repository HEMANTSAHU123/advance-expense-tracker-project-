
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBko4QXtVsWVUjkRwu7uQwPurKd29VJYg4",
  authDomain: "expense-tracker-d6a25.firebaseapp.com",
  databaseURL: "https://expense-tracker-d6a25-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "expense-tracker-d6a25",
  storageBucket: "expense-tracker-d6a25.firebasestorage.app",
  messagingSenderId: "210698710803",
  appId: "1:210698710803:web:6354bcfa256d9f4776b4e6"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
