import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/Sidebar/SidebarHeader.css";

function SidebarHeader({ isCollapsed, toggleSidebar }) {
  return (
    <div className={`sidebar-header ${isCollapsed ? "collapsed" : ""}`}>
      <div className="logo">
        <FontAwesomeIcon
          className="logo-icon"
          icon="fa-solid fa-note-sticky"
          color="var(--text-normal)"
          size="2x"
        />
        <span className={`logo-text ${isCollapsed ? "collapsed" : ""}`}>
          ToDo
        </span>
      </div>
      <button
        className="toggle"
        onClick={toggleSidebar}
        aria-label="collapse sidebar"
      >
        <FontAwesomeIcon
          icon={`fa-solid ${
            isCollapsed ? "fa-angles-right" : "fa-angles-left"
          }`}
          color="var(--text-faint)"
        />
      </button>
    </div>
  );
}

export default SidebarHeader;
