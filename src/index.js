import { initializeApp } from "firebase/app";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore } from "firebase/firestore";
import { Project } from "./project.js";

// The Firebase configuration object is perfectly safe to include on the client side.
// You secure your Firebase projects by using security rules and App Check.
const firebaseConfig = {
  apiKey: "AIzaSyALh46YN8N_tXcfDsnTwFWz0TscTdvAA9Y",
  authDomain: "task-manager-2356c.firebaseapp.com",
  projectId: "task-manager-2356c",
  storageBucket: "task-manager-2356c.appspot.com",
  messagingSenderId: "237347571268",
  appId: "1:237347571268:web:965146cd8de7edc423de11",
  measurementId: "G-6X688LECJL",
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
