// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoe4P_u_hi9Bd1CmWFPa3MxsGJO3beMHc",
  authDomain: "pruebareact-9eb07.firebaseapp.com",
  projectId: "pruebareact-9eb07",
  storageBucket: "pruebareact-9eb07.appspot.com",
  messagingSenderId: "333807225121",
  appId: "1:333807225121:web:1a6ea384d42eef15e6d660",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db, app };
