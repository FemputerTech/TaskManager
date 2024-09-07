import React, { useState } from "react";
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
          <TaskList workspaceId={workspace.id} />
        </>
      ) : (
        <p>Select a workspace from the sidebar or create a new one</p>
      )}
    </div>
  );
}

export default TaskManager;
