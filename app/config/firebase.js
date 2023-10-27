// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { firebaseApiKey } = require("./index");
const { getStorage } = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "filkom-apps-project.firebaseapp.com",
  projectId: "filkom-apps-project",
  storageBucket: "filkom-apps-project.appspot.com",
  messagingSenderId: "670509053023",
  appId: "1:670509053023:web:795541d5728a469032d7ea",
  measurementId: "G-NC1BDEBPNR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = {
  storage,
};
