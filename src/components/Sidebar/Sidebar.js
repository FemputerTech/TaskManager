import React, { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SectionHeader from "./SectionHeader";
import Workspace from "./Workspace";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/Sidebar/Sidebar.css";

function Sidebar({
  isCollapsed,
  toggleSidebar,
  workspaces,
  setWorkspaces,
  activeWorkspaceIndex,
  setActiveWorkspaceIndex,
  addWorkspace,
}) {
  const [clickedWorkspaceIndex, setClickedWorkspaceIndex] = useState(null);

  const handleItemClick = (type, index) => {
    if (type === "click") {
      setActiveWorkspaceIndex(index);
    } else if (type === "mousedown") {
      setClickedWorkspaceIndex(index);
    } else {
      setClickedWorkspaceIndex(null);
    }
  };

  const handleItemDelete = (index) => (event) => {
    event.stopPropagation();
    const newWorkspaces = workspaces.filter((_, i) => i !== index);
    setWorkspaces(newWorkspaces);
    if (activeWorkspaceIndex === index) {
      setActiveWorkspaceIndex(null);
    } else if (activeWorkspaceIndex > index) {
      setActiveWorkspaceIndex(activeWorkspaceIndex - 1);
    }
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <SidebarHeader isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <section className="favorites">
        <SectionHeader
          text="Favorites"
          icon="fa-regular fa-star"
          isCollapsed={isCollapsed}
        />
      </section>
      <section className="private">
        <SectionHeader
          text="Private"
          icon="fa-solid fa-list-ul"
          isCollapsed={isCollapsed}
        />
        <ul className="workspaces">
          {workspaces.map((workspace, index) => (
            <Workspace
              key={index}
              title={workspace.title}
              isActive={index === activeWorkspaceIndex}
              isClicked={index === clickedWorkspaceIndex}
              onClick={(event) => handleItemClick(event.type, index)}
              onMouseDown={(event) => handleItemClick(event.type, index)}
              onMouseUp={(event) => handleItemClick(event.type, index)}
              onDelete={handleItemDelete(index)}
              isCollapsed={isCollapsed}
            />
          ))}
        </ul>
        <button
          className={`new-workspace-button ${isCollapsed ? "collapsed" : ""}`}
          onClick={addWorkspace}
        >
          <FontAwesomeIcon icon="fa-solid fa-plus" color="var(--text-normal)" />
          <span className={`button-text ${isCollapsed ? "collapsed" : ""}`}>
            Add new workspace
          </span>
        </button>
      </section>
    </div>
  );
}

export default Sidebar;
