import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
console.log("Firebase! It's aliiiiiiiiive");

const db = getFirestore(firebaseApp);

const projectsCollection = collection(db, "projects");

// Load projects from Firestore
async function loadProjects() {
  try {
    const projectSnapshot = await getDocs(projectsCollection);
    projectSnapshot.forEach(async (doc) => {
      const projectData = doc.data();
      const project = new Project(
        db,
        doc.id,
        projectData.title,
        projectData.category
      );
      project.render();
    });
  } catch (error) {
    console.log("Error loading projects: ", error);
  }
}

loadProjects();

document.getElementById("add-project").addEventListener("click", async () => {
  const newProject = new Project(db);
  await newProject.add();
});

// const testButton = document.getElementById("test-button");
// testButton.addEventListener("click", () => console.log("clicked!"));

// testButton.addEventListener("dblclick", () => console.log("double clicked!"));

// testButton.addEventListener("contextmenu", (event) => {
//   event.preventDefault();
//   console.log("right clicked!");
// });
