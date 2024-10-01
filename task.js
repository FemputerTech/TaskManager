export class Task {
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
