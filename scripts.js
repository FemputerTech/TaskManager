class Task {
  constructor() {
    this.name = "";
    this.description = "";
    this.dueDate = "";
    this.priority = "";
    this.status = "To Do"; // to do, in progress, completed, on hold
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
    console.log(projectListDiv);

    projectDiv.addEventListener("click", () => this.display());
  }

  delete() {
    console.log("deleting");
  }

  display() {
    const projectId = document.querySelector(".project-id");
    const taskContent = document.querySelector(".task-content");
    const addTaskButton = document.createElement("button");
    projectId.textContent = `${this.title}`;
    taskContent.innerHTML = "";
    addTaskButton.id = "add-task";
    addTaskButton.type = "button";
    addTaskButton.textContent = "Add Task";

    taskContent.appendChild(addTaskButton);

    for (let i = 0; i < this.tasks.length; i++) {
      console.log("task:", this.tasks[i]);
    }

    console.log(taskContent);

    addTaskButton.addEventListener("click", () =>
      console.log("clicked:", this.id)
    );
  }
}

const projects = [];

document.getElementById("add-project").addEventListener("click", () => {
  const projectId = projects.length + 1;
  const newProject = new Project(projectId);
  newProject.add();
  projects.push(newProject);
});
