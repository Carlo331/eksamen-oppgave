import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCr8aWu_Z_JSSEJ6ss_Fu45EzzF453wCAw",
    authDomain: "eksamen-backend-b14c0.firebaseapp.com",
    projectId: "eksamen-backend-b14c0",
    storageBucket: "eksamen-backend-b14c0.appspot.com",
    messagingSenderId: "9356339209",
    appId: "1:9356339209:web:e9cb01ded691dbbda230d8",
    measurementId: "G-5NB5GYZJX9"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
