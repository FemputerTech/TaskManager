import { addDoc, getDocs, collection } from "firebase/firestore";
import { Task } from "./task.js";

export class Project {
  constructor(id = null, title = "New Title", category = "private") {
    this.id = id;
    this.title = title;
    this.category = category;
    this.tasks = [];
  }

  async add(projectsCollection) {
    try {
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

  render() {
    const projectListDiv = document.querySelector(".project-list");
    const projectDiv = document.createElement("div");
    projectDiv.className = "project";
    projectDiv.innerHTML = `<p>${this.title}</p>`;
    projectListDiv.appendChild(projectDiv);

    projectDiv.addEventListener("click", () => {
      const projectId = document.querySelector(".project-id");
      const taskContent = document.querySelector(".task-content");

      projectId.textContent = `${this.title}`;

      // clear previous tasks
      taskContent.innerHTML = "";

      taskContent.innerHTML = `
            <button id="add-task" type="button">Add Task</button>
            <div class="task-list"></div>
        `;

      document.getElementById("add-task").addEventListener("click", () => {
        const newTask = new Task(this.id);
        newTask.add();
        this.tasks.push(newTask);
      });
    });
  }
}
