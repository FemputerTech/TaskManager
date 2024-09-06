import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/Sidebar/List.css";

function List({
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
      className={`list-item  ${isCollapsed ? "collapsed" : ""} ${
        isActive ? "active" : ""
      } ${isClicked ? "clicked" : ""}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <div className="list-title-container">
        <FontAwesomeIcon
          className="list-item-icon"
          icon="fa-regular fa-file"
          color="var(--text-faint)"
        />
        <span className={`list-item-title ${isCollapsed ? "collapsed" : ""}`}>
          {title}
        </span>
      </div>
      <button
        className={`list-delete ${isCollapsed ? "collapsed" : ""}`}
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

export default List;
