import { initializeApp } from "firebase/app";

// The Firebase configuration object is perfectly safe to include on the client side.
// You secure your Firebase projects by using security rules and App Check.
const firebaseConfig = {
  apiKey: "AIzaSyCUxx-tNWhNT26ibU9dUh2qyoQu_h5vb0E",
  authDomain: "task-manager-4842d.firebaseapp.com",
  projectId: "task-manager-4842d",
  storageBucket: "task-manager-4842d.appspot.com",
  messagingSenderId: "53393795874",
  appId: "1:53393795874:web:1e7ed391a100a740fc937b",
  measurementId: "G-2SJFBR3SH7",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
console.log("Firebase! It's aliiiiiiiiive");
export default firebaseApp;
