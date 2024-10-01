import { initializeApp } from "firebase/app";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore } from "firebase/firestore";
import { Project } from "./project.js";

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

console.log("Firebase! It's aliiiiiiiiive");
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const projects = [];

document.getElementById("add-project").addEventListener("click", () => {
  const projectId = projects.length + 1;
  const newProject = new Project(projectId);
  newProject.add();
  projects.push(newProject);
});
