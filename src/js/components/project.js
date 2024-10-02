import { addSubDocument, updateDocument } from "../firebase/firestore.js";
import { Task } from "./task.js";

export class Project {
  constructor(ref, id, title = "New Title", category = "private", tasks = []) {
    if (ref == null || ref == undefined) {
      throw new Error("The 'ref' parameter is required.");
    }
    if (id === null || id === undefined) {
      throw new Error("The 'id' parameter is required.");
    }
    {
      this.ref = ref;
      this.id = id;
      this.title = title;
      this.category = category;
      this.tasks = tasks;
      this.icon = "fa-regular fa-file";
    }
  }

  render() {
    const projectListDiv = document.querySelector(".project-list");
    const projectDiv = document.createElement("div");
    projectDiv.className = "project";
    projectDiv.innerHTML = `
      <i class="${this.icon}"></i>
      <input class="project-title" id=${this.id} type="text" value="${this.title}" disabled=true style="pointer-events: none;"></input>
    `;
    projectListDiv.appendChild(projectDiv);

    projectDiv.addEventListener("dblclick", async (event) =>
      this.rename(event)
    );
    projectDiv.addEventListener("mousedown", () =>
      projectDiv.classList.add("clicked")
    );
    projectDiv.addEventListener("click", () => {
      projectDiv.classList.remove("clicked");
      this.active(projectDiv);
    });
  }

  active(projectDiv) {
    const projectListDiv = document.querySelectorAll(".project");
    projectListDiv.forEach((project) => {
      if (project.classList.contains("active")) {
        project.classList.remove("active");
      }
    });
    projectDiv.classList.add("active");

    const projectId = document.querySelector(".project-id");
    const taskList = document.querySelector(".task-list");
    let addTaskButton = document.getElementById("add-task");

    projectId.textContent = `${this.title}`;

    if (addTaskButton) {
      addTaskButton.remove();
    }

    addTaskButton = document.createElement("button");
    addTaskButton.id = "add-task";
    addTaskButton.type = "button";
    addTaskButton.textContent = "Add Task";
    taskList.insertAdjacentElement("beforebegin", addTaskButton);

    taskList.innerHTML = ""; //clear previous tasks

    this.tasks.forEach((task) => task.render());

    document.getElementById("add-task").addEventListener("click", async () => {
      const taskId = this.tasks.length + 1;
      const newTask = new Task(taskId, this.ref);
      const newTaskData = {
        name: newTask.name,
        description: newTask.description,
        dueDate: newTask.dueDate,
        priority: newTask.priority,
        status: newTask.status,
      };
      try {
        const taskRef = await addSubDocument(
          "projects",
          this.ref,
          "tasks",
          newTaskData
        );
        if (taskRef) {
          this.tasks.push(newTask);
          newTask.render();
        }
      } catch (error) {
        console.log("Error adding a new task:", error);
      }
    });
  }

  rename() {
    const projectTitleInput = document.getElementById(this.id);
    projectTitleInput.style.pointerEvents = "auto";
    projectTitleInput.removeAttribute("disabled");
    projectTitleInput.focus();

    const length = projectTitleInput.value.length;
    projectTitleInput.setSelectionRange(0, length);

    projectTitleInput.addEventListener("input", () =>
      console.log(projectTitleInput.value)
    );

    const updateTitle = async () => {
      const newTitle = projectTitleInput.value.trim();
      if (newTitle) {
        const titleData = { title: newTitle };
        this.title = newTitle;
        try {
          await updateDocument("projects", this.ref, titleData);
        } catch (error) {
          console.log("Error updating title:", error);
        }
      }
      projectTitleInput.style.pointerEvents = "none";
      projectTitleInput.setAttribute("disabled", true);
      projectTitleInput.blur();

      // remove event listeners
      window.removeEventListener("keydown", onKeydown);
      projectTitleInput.removeEventListener("blur", onBlur);
    };

    // Keydown event listener for Enter key
    const onKeydown = async (event) => {
      if (event.key === "Enter") {
        await updateTitle();
      }
    };

    // Blur event listener for clicking outside the input
    const onBlur = async () => await updateTitle();

    window.addEventListener("keydown", onKeydown);
    projectTitleInput.addEventListener("blur", onBlur);
  }

  delete() {
    console.log("deleting");
  }
}
