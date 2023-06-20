import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//Firebase settings
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA4dg1pOCfsc1nxn8ah-ZKapU9pSlHg-_8",
  authDomain: "react-blog-app-68781.firebaseapp.com",
  databaseURL: "https://react-blog-app-68781-default-rtdb.firebaseio.com",
  projectId: "react-blog-app-68781",
  storageBucket: "react-blog-app-68781.appspot.com",
  messagingSenderId: "591891763836",
  appId: "1:591891763836:web:3aa4e548856a925936aff9",
  measurementId: "G-9TT4FSXQKP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
