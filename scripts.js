import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { Project } from "./project.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALh46YN8N_tXcfDsnTwFWz0TscTdvAA9Y",
  authDomain: "task-manager-2356c.firebaseapp.com",
  projectId: "task-manager-2356c",
  storageBucket: "task-manager-2356c.appspot.com",
  messagingSenderId: "237347571268",
  appId: "1:237347571268:web:965146cd8de7edc423de11",
  measurementId: "G-6X688LECJL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();

const projects = [];

document.getElementById("add-project").addEventListener("click", () => {
  const projectId = projects.length + 1;
  const newProject = new Project(projectId);
  newProject.add();
  projects.push(newProject);
});
