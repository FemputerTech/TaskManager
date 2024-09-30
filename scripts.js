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
  constructor() {
    this.title = "New Title";
    this.category = "private";
    this.tasks = [];
  }
}

document
  .getElementById("add-project")
  .addEventListener("click", () => console.log("adding a new project"));
