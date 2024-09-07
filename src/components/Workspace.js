import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Workspace.css";

function WorkSpace({
  title,
  isActive,
  isClicked,
  onClick,
  onMouseDown,
  onMouseUp,
  onDelete,
  isCollapsed,
}) {
  return (
    <li
      className={`workspace  ${isCollapsed ? "collapsed" : ""} ${
        isActive ? "active" : ""
      } ${isClicked ? "clicked" : ""}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <div className="workspace-title">
        <FontAwesomeIcon
          className="workspace-icon"
          icon="fa-regular fa-file"
          color="var(--text-faint)"
        />
        <span className={`workspace-text ${isCollapsed ? "collapsed" : ""}`}>
          {title}
        </span>
      </div>
      <button
        className={`workspace-delete ${isCollapsed ? "collapsed" : ""}`}
        onClick={onDelete}
      >
        <FontAwesomeIcon
          icon="fa-solid fa-trash-can"
          color="var(--text-faint)"
        />
      </button>
    </li>
  );
}

export default WorkSpace;
