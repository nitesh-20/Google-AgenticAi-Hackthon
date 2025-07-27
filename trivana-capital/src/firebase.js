// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI0lssgqRXPWMccWH_KnDPdmh8xMCdaZg",
  authDomain: "trivana-capital.firebaseapp.com",
  projectId: "trivana-capital",
  storageBucket: "trivana-capital.appspot.com", // ✅ corrected `.app` to `.appspot.com`
  messagingSenderId: "549024772367",
  appId: "1:549024772367:web:0ac8841d7ba2215e8c4e7a",
  measurementId: "G-LRTQ0KSBTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Add this line to use Firebase Auth
export const auth = getAuth(app);

// (optional) If using Analytics
const analytics = getAnalytics(app);
