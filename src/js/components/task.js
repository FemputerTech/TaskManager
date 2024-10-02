import { addDoc } from "firebase/firestore";

export class Task {
  constructor(
    id,
    projectId,
    name = "Task",
    description = "",
    dueDate = "",
    priority = "",
    status = "To Do"
  ) {
    if (id === null || id === undefined) {
      throw new Error("The 'id' parameter is required.");
    }
    if (projectId === null || projectId === undefined) {
      throw new Error("The 'projectId' parameter is required.");
    }
    {
      this.id = id;
      this.projectId = projectId;
      this.name = name;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.status = status; // to do, in progress, completed, on hold
    }
  }

  render() {
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
