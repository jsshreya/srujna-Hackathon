
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_REAL_FIREBASE_API_KEY",
  authDomain: "finpath-web.firebaseapp.com",
  projectId: "finpath-web",
  storageBucket: "finpath-web.firebasestorage.app",
  messagingSenderId: "YOUR_REAL_SENDER_ID",
  appId: "YOUR_REAL_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
