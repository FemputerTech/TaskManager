import { Task } from "./task.js";

export class Project {
  constructor(id) {
    this.id = id;
    this.title = `New Title ${this.id}`;
    this.category = "private";
    this.tasks = [];
  }

  add() {
    const projectListDiv = document.querySelector(".project-list");
    const projectDiv = document.createElement("div");
    projectDiv.className = "project";
    projectDiv.innerHTML = `
          <p>${this.title}</p>
      `;
    projectListDiv.appendChild(projectDiv);
    projectDiv.addEventListener("click", () => this.display());
  }

  delete() {
    console.log("deleting");
  }

  display() {
    const projectId = document.querySelector(".project-id");
    const taskContent = document.querySelector(".task-content");

    projectId.textContent = `${this.title}`;
    taskContent.innerHTML = "";
    taskContent.innerHTML = `
          <button id="add-task" type="button">Add Task</button>
          <div class="task-list"></div>
      `;

    document.getElementById("add-task").addEventListener("click", () => {
      const taskId = this.tasks.length + 1;
      const newTask = new Task(taskId);
      newTask.add();
      this.tasks.push(newTask);
    });
  }
}
