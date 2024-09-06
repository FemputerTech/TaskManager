import React from "react";
import "../../styles/TaskManager/TaskManager.css";

function TaskManager({ workspace, updateWorkspaceTitle }) {
  const handleOnChange = (event) => {
    updateWorkspaceTitle(event.target.value);
  };
  return (
    <div className="task-manager">
      {workspace ? (
        <input
          className="task-manager-title"
          type="text"
          value={workspace.title}
          onChange={handleOnChange}
          placeholder="Untitled"
        />
      ) : (
        <p>Select a workspace from the sidebar or create a new one</p>
      )}
    </div>
  );
}

export default TaskManager;
