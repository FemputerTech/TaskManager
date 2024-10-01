class Task {
  constructor(id) {
    this.id = id;
    this.name = "";
    this.description = "";
    this.dueDate = "";
    this.priority = "";
    this.status = "To Do"; // to do, in progress, completed, on hold
  }

  add() {
    const taskListDiv = document.querySelector(".task-list");
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.innerHTML = `
        <p>${this.id}</p>
        <p>${this.name}</p>
        <p>${this.description}</p>
        <p>${this.dueDate}</p>
        <p>${this.priority}</p>
        <p>${this.status}</p>
    `;
    taskListDiv.appendChild(taskDiv);
  }
}

class Project {
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

const projects = [];

document.getElementById("add-project").addEventListener("click", () => {
  const projectId = projects.length + 1;
  const newProject = new Project(projectId);
  newProject.add();
  projects.push(newProject);
});
