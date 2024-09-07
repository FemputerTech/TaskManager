import React, { useState } from "react";
import Task from "../Task";

export default function TaskList({ workspaceId }) {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length,
      title: "Untitled",
      workspaceId: workspaceId,
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="task-list">
      <button className="new-task-button" onClick={handleAddTask}>
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
