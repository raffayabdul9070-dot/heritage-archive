import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Add this line

const firebaseConfig = {
  apiKey: "AIzaSyAV3CbdG9rinDBDg6fIpDE3krGTD6W0MqU",
  authDomain: "linguistic-portal-45bc9.firebaseapp.com",
  projectId: "linguistic-portal-45bc9",
  storageBucket: "linguistic-portal-45bc9.firebasestorage.app",
  messagingSenderId: "395361534928",
  appId: "1:395361534928:web:398490b12c10a7cffd2fd5",
  measurementId: "G-95ZQJCY29V"
};

const app = initializeApp(firebaseConfig);

// Export both Auth and the Database
export const auth = getAuth(app);
export const db = getFirestore(app); // This is the "db" for your survey data