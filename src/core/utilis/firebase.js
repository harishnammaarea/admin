import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7LXBliP9xH-Y-Cj60iocPucVTa5dL4uo",
  authDomain: "namma-area-df32a.firebaseapp.com",
  projectId: "namma-area-df32a",
  storageBucket: "namma-area-df32a.appspot.com",
  messagingSenderId: "208040831431",
  appId: "1:208040831431:web:e2ffa72d1d2fe35fcd91e2",
  measurementId: "G-XLTSJFKL3L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
