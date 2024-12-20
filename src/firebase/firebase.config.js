// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBocMNCBGYUvatdzmRTNBAcHSiDYuBeGbA",
  authDomain: "muslim-telecom-2024.firebaseapp.com",
  databaseURL: "https://muslim-telecom-2024-default-rtdb.firebaseio.com",
  projectId: "muslim-telecom-2024",
  storageBucket: "muslim-telecom-2024.appspot.com",
  messagingSenderId: "625872739220",
  appId: "1:625872739220:web:4594202c97220d6e37cd81",
  measurementId: "G-92CD51R58P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);