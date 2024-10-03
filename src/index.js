import {
  getDocuments,
  getSubDocuments,
  addDocument,
} from "./js/firebase/firestore.js";
import { Project } from "./js/components/project.js";
import { Task } from "./js/components/task.js";

export const COLLECTION = "projects";
export const SUBCOLLECTION = "tasks";
export const projects = [];

const loadTasks = async (projectId) => {
  try {
    const tasksCollection = await getSubDocuments(
      COLLECTION,
      projectId,
      SUBCOLLECTION
    );
    const tasks = [];
    tasksCollection.forEach((task) => {
      const newTask = new Task(
        tasks.length + 1,
        projectId,
        task.name,
        task.description,
        task.dueDate,
        task.priority,
        task.status
      );
      tasks.push(newTask);
    });
    return tasks;
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
};

const loadProjects = async () => {
  try {
    const projectsCollection = await getDocuments(COLLECTION);
    // projectsCollection.forEach(async (project) => {
    // We need to wait for the load tasks function to complete before continuing
    // to the next iteration. So instead of forEach, let's create an array of
    // promises for loading tasks for each project with Promise.all to wait for
    // all projects to be processed.
    const projectPromises = projectsCollection.map(async (project) => {
      const tasks = await loadTasks(project.ref);
      const newProject = new Project(
        projects.length + 1,
        project.ref,
        project.title,
        project.category,
        tasks
      );
      projects.push(newProject);
    });
    await Promise.all(projectPromises);
  } catch (error) {
    console.error("Error loading projects:", error);
  }
};

loadProjects().then(() => {
  projects.forEach((project) => project.render());
});

document.querySelector(".add-project").addEventListener("click", async () => {
  const projectId = projects.length + 1;
  const newProject = new Project(projectId);
  const newProjectData = {
    id: newProject.id,
    title: newProject.title,
    category: newProject.category,
    icon: newProject.icon,
  };
  const projectRef = await addDocument(COLLECTION, newProjectData);
  if (projectRef) {
    projects.push(newProject);
    newProject.setRef(projectRef);
    newProject.render();
  }
});
