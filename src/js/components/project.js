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
    // Render the side bar
    const projectListDiv = document.querySelector(".project-list");
    const projectDiv = document.createElement("div");
    projectDiv.className = "project";
    projectDiv.innerHTML = `
      <i class="${this.icon}"></i>
      <input class="project-title" id='project-${this.id}' type="text" value="${this.title}" disabled=true style="pointer-events: none;"></input>
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
    let isUpdating = false;

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
      } else {
        // alert("Your project must have a title.");
        throw new Error("The 'title' parameter cannot be blank.");
      }
    };

    // Keydown event listener for Enter key
    const onKeydown = async (event) => {
      if (event.key === "Enter") {
        console.log("Enter");
        await updateTitle();
      }
    };

    // Blur event listener for clicking outside the input
    const onBlur = async () => {
      console.log("Clicked");
      await updateTitle();
    };

    window.addEventListener("keydown", onKeydown);
    projectTitleInput.addEventListener("blur", onBlur);
  }

  delete() {
    console.log("deleting");
  }
}
