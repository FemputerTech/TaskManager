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
  isCollapsed,
  optionRef,
}) {
  return (
    <li
      className={`list-item  ${isCollapsed ? "collapsed" : ""} ${
        isActive ? "active" : ""
      } ${isClicked ? "clicked" : ""}`}
      ref={optionRef}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <FontAwesomeIcon className="list-item-icon" icon="fa-regular fa-file" />
      <span className={`list-item-title ${isCollapsed ? "collapsed" : ""}`}>
        {title}
      </span>
    </li>
  );
}

export default List;
