import React from "react";
import TaskList from "./TaskList";
import "../../styles/task_manager/TaskManager.css";

function TaskManager({
  workspace,
  updateWorkspaceTitle,
  updateWorkspaceTasks,
}) {
  const handleOnChange = (event) => {
    updateWorkspaceTitle(event.target.value);
  };

  const handleAddTask = () => {
    if (workspace) {
      const tasks = workspace.tasks || [];
      const newTask = {
        id: tasks.length,
        title: "Untitled",
        workspaceId: workspace.id,
      };
      const updatedTasks = [...tasks, newTask];
      updateWorkspaceTasks(updatedTasks);
    }
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
          <span className="today">Today's Date placeholder</span>
          <TaskList tasks={workspace.tasks} onAddTask={handleAddTask} />
        </>
      ) : (
        <p>Select a workspace from the sidebar or create a new one</p>
      )}
    </div>
  );
}

export default TaskManager;
