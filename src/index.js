import { initializeApp } from "firebase/app";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
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

// const auth = getAuth(firebaseApp);

const db = getFirestore(firebaseApp);

const projectsCollection = collection(db, "projects");

// Load projects from Firestore
async function loadProjects() {
  try {
    const mySnapshot = await getDocs(projectsCollection);
    mySnapshot.forEach((doc) => {
      const projectData = doc.data();
      const project = new Project(
        doc.id,
        projectData.title,
        projectData.category
      );
      project.render();
    });
  } catch (error) {
    console.log(error);
  }
}

loadProjects();

document.getElementById("add-project").addEventListener("click", async () => {
  const newProject = new Project();
  await newProject.add(projectsCollection);
});
