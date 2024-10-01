import { addDoc, getDocs, collection, doc } from "firebase/firestore";
import { Task } from "./task.js";

export class Project {
  constructor(db, id = null, title = "New Title", category = "private") {
    this.db = db;
    this.id = id;
    this.title = title;
    this.category = category;
    this.tasks = [];
  }

  async loadTasks() {
    try {
      const tasksCollection = collection(this.db, "projects", this.id, "tasks");
      const taskSnapshot = await getDocs(tasksCollection);
      this.tasks = []; // Clear previous tasks to avoid duplicates
      taskSnapshot.forEach((doc) => {
        const taskData = doc.data();
        const task = new Task(
          doc.id,
          this.id,
          taskData.name,
          taskData.description,
          taskData.dueDate,
          taskData.priority,
          taskData.status
        );
        task.render();
        this.tasks.push(task);
      });
    } catch (error) {
      console.error("Error loading tasks: ", error);
    }
  }

  async add() {
    try {
      const projectsCollection = collection(this.db, "projects");
      const newDoc = await addDoc(projectsCollection, {
        title: this.title,
        category: this.category,
      });
      this.id = newDoc.id;
      this.render();
    } catch (error) {
      console.log("Error adding project:", error);
    }
  }

  delete() {
    console.log("deleting");
  }

  active(projectDiv) {
    const projectListDiv = document.querySelectorAll(".project");
    projectListDiv.forEach((project) => {
      if (project.classList.contains("active")) {
        project.classList.remove("active");
      }
    });
    projectDiv.classList.add("active");
  }

  render() {
    const projectListDiv = document.querySelector(".project-list");
    const projectDiv = document.createElement("div");
    projectDiv.className = "project";
    projectDiv.innerHTML = `<p>${this.title}</p>`;
    projectListDiv.appendChild(projectDiv);

    projectDiv.addEventListener("mousedown", () => {
      projectDiv.classList.add("clicked");
    });

    projectDiv.addEventListener("click", async () => {
      projectDiv.classList.remove("clicked");
      this.active(projectDiv);
      const projectId = document.querySelector(".project-id");
      const taskList = document.querySelector(".task-list");
      let addTaskButton = document.getElementById("add-task");

      projectId.textContent = `${this.title}`;

      if (!addTaskButton) {
        addTaskButton = document.createElement("button");
        addTaskButton.id = "add-task";
        addTaskButton.type = "button";
        addTaskButton.textContent = "Add Task";
        taskList.insertAdjacentElement("beforebegin", addTaskButton);
      }

      taskList.innerHTML = ""; //clear previous tasks

      await this.loadTasks();

      document
        .getElementById("add-task")
        .addEventListener("click", async () => {
          const tasksCollection = collection(
            this.db,
            "projects",
            this.id,
            "tasks"
          );
          const newTask = new Task(this.id);
          await newTask.add(tasksCollection);
          this.tasks.push(newTask);
        });
    });
  }
}
