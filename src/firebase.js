import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore
import { getStorage } from 'firebase/storage'; // Import Storage

const firebaseConfig = {
  apiKey: "AIzaSyAPHqGUx8kbvm8Hp0SdbuB-7Vvbhcwjvb4",
  authDomain: "fir-reg-auth-time-machine.firebaseapp.com",
  projectId: "fir-reg-auth-time-machine",
  storageBucket: "fir-reg-auth-time-machine.appspot.com",
  messagingSenderId: "435606597865",
  appId: "1:435606597865:web:ebc4a10799f71f3b0b8078",
  measurementId: "G-FL1NPXS8CY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);       // Firebase Authentication
const db = getFirestore(app);    // Firestore database
const storage = getStorage(app); // Firebase Storage

export { auth, db, storage };
