import React from "react";
import Task from "../Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/task_manager/TaskList.css";

export default function TaskList({ tasks = [], onAddTask }) {
  return (
    <div className="task-list">
      <button className="new-task-button" onClick={onAddTask}>
        <FontAwesomeIcon icon="fa-solid fa-plus" color="var(--text-normal)" />
        <span className="button-text">New task</span>
      </button>
      <div className="tasks">
        {tasks.map((task) => (
          <Task key={task.id} />
        ))}
      </div>
    </div>
  );
}
