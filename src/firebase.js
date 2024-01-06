// Used code below. Had some issues when loading data in postsEdit
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "@firebase/firestore/lite";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // export const db = getFirestore(app);
// export const db = app.firestore();

const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
