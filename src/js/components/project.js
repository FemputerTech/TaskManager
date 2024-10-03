import {
  addSubDocument,
  updateDocument,
  deleteDocument,
} from "../firebase/firestore.js";
import { COLLECTION, SUBCOLLECTION, projects } from "../../index.js";
import { Task } from "./task.js";

export class Project {
  constructor(
    id,
    ref = null,
    title = "New Title",
    category = "private",
    tasks = []
  ) {
    if (id === null || id === undefined) {
      throw new Error("The 'id' parameter is required.");
    }
    {
      this.id = id;
      this.ref = ref;
      this.title = title;
      this.category = category;
      this.tasks = tasks;
      this.icon = "fa-regular fa-file";
    }
  }

  setRef(projectRef) {
    this.ref = projectRef;
  }

  render() {
    // Render the side bar
    const projectListDiv = document.querySelector(".project-list");
    const projectDiv = document.createElement("div");
    projectDiv.className = "project";
    projectDiv.innerHTML = `
      <i class="${this.icon}"></i>
      <input class="project-title" id='project-${this.id}' type="text" value="${this.title}" disabled=true style="pointer-events: none;"></input>
      <button class="delete-button" id="delete-${this.id}" type="button">X</button>
    `;
    projectListDiv.appendChild(projectDiv);

    // Render Details
    const mainDiv = document.querySelector("main");
    const detailsDiv = document.createElement("div");
    detailsDiv.className = "details";
    detailsDiv.innerHTML = `
      <h1 class="display-title">${this.title}</h1>
      <div class="task-content">
        <button class="add-task" id="add-task-${this.ref}" type="button">Add Task</button>
        <div class="task-list" id="task-list-${this.ref}"></div>
      </div>
    `;
    mainDiv.appendChild(detailsDiv);

    const taskListDiv = document.getElementById(`task-list-${this.ref}`);
    taskListDiv.innerHTML = ""; //clear previous tasks
    this.tasks.forEach((task) => {
      task.render();
    });

    // Click events
    const deleteButton = document.getElementById(`delete-${this.id}`);
    deleteButton.addEventListener("click", async () => {
      const index = this.id - 1;
      console.log(projects[index]);
      // projects.pop(index);
      // console.log(projects);
    });
    // projectDiv
    //   .getElementById(`delete-${this.id}`)
    //   .addEventListener("click", async () => {
    //     // await deleteDocument("projects", this.ref);
    //     console.log(projects[this.id]);
    //   });

    projectDiv.addEventListener("dblclick", async (event) =>
      this.rename(detailsDiv)
    );

    projectDiv.addEventListener("mousedown", () =>
      projectDiv.classList.add("clicked")
    );
    projectDiv.addEventListener("click", () => {
      projectDiv.classList.remove("clicked");
      this.active(detailsDiv, projectDiv);
    });

    document
      .getElementById(`add-task-${this.ref}`)
      .addEventListener("click", async () => {
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
            COLLECTION,
            this.ref,
            SUBCOLLECTION,
            newTaskData
          );
          if (taskRef) {
            this.tasks.push(newTask);
            newTask.render();
          }
        } catch (error) {
          console.error("Error adding a new task:", error);
        }
      });
  }

  active(detailsDiv, projectDiv) {
    const projectsList = document.querySelectorAll(".project");
    projectsList.forEach((project) => {
      if (project.classList.contains("active")) {
        project.classList.remove("active");
      }
    });
    const detailsListDiv = document.querySelectorAll(".details");
    detailsListDiv.forEach((details) => {
      if (details.classList.contains("active")) {
        details.classList.remove("active");
      }
    });
    projectDiv.classList.add("active");
    detailsDiv.classList.add("active");
  }

  rename(detailsDiv) {
    const projectTitleInput = document.getElementById(`project-${this.id}`);
    let displayTitle = detailsDiv.querySelector("h1");

    projectTitleInput.style.pointerEvents = "auto";
    projectTitleInput.removeAttribute("disabled");
    projectTitleInput.focus();

    const length = projectTitleInput.value.length;
    projectTitleInput.setSelectionRange(0, length);

    projectTitleInput.addEventListener("input", () => {
      if (projectTitleInput.value.length === 0) {
        displayTitle.textContent = "New Title";
        displayTitle.style.color = "gray";
      } else {
        displayTitle.textContent = projectTitleInput.value;
        displayTitle.style.color = "black";
      }
    });

    const updateTitle = async () => {
      const newTitle = projectTitleInput.value.trim();
      if (newTitle.length !== 0) {
        if (newTitle !== this.title) {
          const titleData = { title: newTitle };
          this.title = newTitle;
          try {
            await updateDocument(COLLECTION, this.ref, titleData);
          } catch (error) {
            console.error("Error updating title:", error);
          }
        }
        projectTitleInput.style.pointerEvents = "none";
        projectTitleInput.setAttribute("disabled", true);
        projectTitleInput.blur();

        // remove event listeners
        window.removeEventListener("keydown", onKeydown);
        projectTitleInput.removeEventListener("blur", onBlur);
      } else {
        // alert("Your project must have a title.");
        throw new Error("The 'title' parameter cannot be blank.");
      }
    };

    // Keydown event listener for Enter key
    const onKeydown = async (event) => {
      if (event.key === "Enter") {
        await updateTitle();
      }
    };

    // Blur event listener for clicking outside the input
    const onBlur = async () => {
      await updateTitle();
    };

    window.addEventListener("keydown", onKeydown);
    projectTitleInput.addEventListener("blur", onBlur);
  }
}
