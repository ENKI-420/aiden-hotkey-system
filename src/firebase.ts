import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBFGS5HWS6YjyknmuGP85DNJmlTubkYjqM",
  authDomain: "noh-456b7.firebaseapp.com",
  databaseURL: "https://noh-456b7-default-rtdb.firebaseio.com",
  projectId: "noh-456b7",
  storageBucket: "noh-456b7.firebasestorage.app",
  messagingSenderId: "194446408566",
  appId: "1:194446408566:web:dc96110ee58f9561611857",
  measurementId: "G-0WNC6N24DC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { db, auth };