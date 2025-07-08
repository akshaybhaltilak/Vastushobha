// src/Database/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, push, remove } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAUzR6Y1fUZ7s9b0eY00ZhXlXheKTCQjnA",
  authDomain: "vastushobha-15159.firebaseapp.com",
  databaseURL: "https://vastushobha-15159-default-rtdb.firebaseio.com",
  projectId: "vastushobha-15159",
  storageBucket: "vastushobha-15159.appspot.com",
  messagingSenderId: "839671307428",
  appId: "1:839671307428:web:08cb70a5320b282f611a31",
  measurementId: "G-3GLKVLLMS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

// Export database and all the functions you'll need in your components
export { 
  database, 
  ref, 
  onValue, 
  set, 
  push, 
  remove 
};