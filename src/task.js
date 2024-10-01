import { addDoc } from "firebase/firestore";
export class Task {
  constructor(
    id = null,
    projectId,
    name = "",
    description = "",
    dueDate = "",
    priority = "",
    status = "To Do"
  ) {
    this.id = id;
    this.projectId = projectId;
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status; // to do, in progress, completed, on hold
  }

  async add(tasksCollection) {
    try {
      const newDoc = await addDoc(tasksCollection, {
        name: this.name,
        description: this.description,
        dueDate: this.dueDate,
        priority: this.priority,
        status: this.status,
      });
      this.id = newDoc.id;
      this.render();
    } catch (error) {
      console.log("Error adding task:", error);
    }
  }

  render() {
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
