import React, { useState } from "react";
import Task from "./Task";
import "../../styles/task_manager/TaskManager.css";

function TaskManager({ workspace, updateWorkspaceTitle }) {
  const [tasks, setTasks] = useState([]);
  const handleOnChange = (event) => {
    updateWorkspaceTitle(event.target.value);
  };
  const addTask = () => {
    const newTask = { title: "Untitled" };
    setTasks([...tasks, newTask]);
  };
  return (
    <div className="task-manager">
      {workspace ? (
        <>
          <input
            className="task-manager-title"
            type="text"
            value={workspace.title}
            onChange={handleOnChange}
            placeholder="Untitled"
          />
          <button className="new-task-button" onClick={addTask}>
            <span className="button-text">Add new task</span>
          </button>
          <ul className="tasks">
            {tasks.map((task, index) => (
              <Task key={index} />
            ))}
          </ul>
        </>
      ) : (
        <p>Select a workspace from the sidebar or create a new one</p>
      )}
    </div>
  );
}

export default TaskManager;
