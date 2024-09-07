import React from "react";
import SidebarHeader from "./SidebarHeader";
import SectionHeader from "./SectionHeader";
import WorkspaceList from "./WorkspaceList";
import "../../styles/sidebar/Sidebar.css";

function Sidebar({
  isCollapsed,
  setIsCollapsed,
  workspaces,
  setWorkspaces,
  activeWorkspaceIndex,
  setActiveWorkspaceIndex,
}) {
  const toggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <SidebarHeader isCollapsed={isCollapsed} toggleSidebar={toggle} />
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
        <WorkspaceList
          isCollapsed={isCollapsed}
          workspaces={workspaces}
          setWorkspaces={setWorkspaces}
          activeWorkspaceIndex={activeWorkspaceIndex}
          setActiveWorkspaceIndex={setActiveWorkspaceIndex}
        />
      </section>
    </div>
  );
}

export default Sidebar;
