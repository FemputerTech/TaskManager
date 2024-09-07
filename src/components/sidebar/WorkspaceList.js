import React, { useState } from "react";
import Workspace from "../Workspace";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/sidebar/WorkspaceList.css";

function WorkspaceList({
  isCollapsed,
  workspaces,
  setWorkspaces,
  activeWorkspaceIndex,
  setActiveWorkspaceIndex,
}) {
  const [clickedWorkspaceIndex, setClickedWorkspaceIndex] = useState(null);

  const handleAddWorkspace = () => {
    const newWorkspace = { id: workspaces.length, title: "Untitled" };
    setWorkspaces([...workspaces, newWorkspace]);
  };

  const handleDeleteWorkspace = (workspaceId) => {
    setWorkspaces(
      workspaces.filter((workspace) => workspace.id !== workspaceId)
    );
  };

  const handleWorkspaceActive = (workspaceId) => {
    setActiveWorkspaceIndex(workspaceId);
  };

  const handleWorkspaceMousedown = (workspaceId) => {
    setClickedWorkspaceIndex(workspaceId);
  };

  const handleWorkspaceMouseup = () => {
    setClickedWorkspaceIndex(null);
  };

  return (
    <div className="workspace-list">
      <div className="workspaces">
        {workspaces.map((workspace) => (
          <Workspace
            key={workspace.id}
            title={workspace.title}
            onDelete={() => handleDeleteWorkspace(workspace.id)}
            isActive={activeWorkspaceIndex === workspace.id}
            isClicked={clickedWorkspaceIndex === workspace.id}
            onClick={() => handleWorkspaceActive(workspace.id)}
            onMouseDown={() => handleWorkspaceMousedown(workspace.id)}
            onMouseUp={() => handleWorkspaceMouseup(workspace.id)}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>
      <button
        className={`new-workspace-button ${isCollapsed ? "collapsed" : ""}`}
        onClick={handleAddWorkspace}
      >
        <FontAwesomeIcon icon="fa-solid fa-plus" color="var(--text-normal)" />
        <span className={`button-text ${isCollapsed ? "collapsed" : ""}`}>
          Add new workspace
        </span>
      </button>
    </div>
  );
}

export default WorkspaceList;
