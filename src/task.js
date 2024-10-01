export class Task {
  constructor(projectId) {
    this.id = null;
    this.projectId = projectId;
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
        <p>${this.projectId}</p>
        <p>${this.name}</p>
        <p>${this.description}</p>
        <p>${this.dueDate}</p>
        <p>${this.priority}</p>
        <p>${this.status}</p>
    `;
    taskListDiv.appendChild(taskDiv);
  }
}
