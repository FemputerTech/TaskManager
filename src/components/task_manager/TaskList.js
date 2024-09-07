import React from "react";
import Task from "../Task";

export default function TaskList({ tasks = [], onAddTask }) {
  return (
    <div className="task-list">
      <button className="new-task-button" onClick={onAddTask}>
        <span className="button-text">Add new task</span>
      </button>
      <div className="tasks">
        {tasks.map((task) => (
          <Task key={task.id} />
        ))}
      </div>
    </div>
  );
}
