const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const dotenv = require("dotenv");

// CONFIG
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

let firebaseApp;
let db;

try {
  firebaseApp = initializeApp(firebaseConfig);
  console.log("Firebase has been initialized");

  db = getFirestore(firebaseApp);
} catch (error) {
  console.error("Error initializing Firebase: ", error);
}

module.exports = { firebaseApp, db };
