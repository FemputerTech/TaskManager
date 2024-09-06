import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/Sidebar/ListItem.css";

function ListItem({
  listItem,
  isActive,
  isClicked,
  onClick,
  onMouseDown,
  onMouseUp,
  isCollapsed,
  setContextMenu,
}) {
  const optionRef = useRef(null);

  function handleOnContextMenu(event, rightClickListItem) {
    event.preventDefault();
    const listItemAttr = optionRef.current.getBoundingClientRect();
    console.log(listItemAttr);
    setContextMenu({
      position: {
        x: listItemAttr.right - 60,
        y: listItemAttr.top - 100,
      },
      toggled: true,
    });
  }
  return (
    <li
      className={`list-item  ${isCollapsed ? "collapsed" : ""} ${
        isActive ? "active" : ""
      } ${isClicked ? "clicked" : ""}`}
      ref={optionRef}
      onContextMenu={(event) => handleOnContextMenu(event, listItem)}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <FontAwesomeIcon className="item-icon" icon="fa-regular fa-file" />
      <span className={`item-title ${isCollapsed ? "collapsed" : ""}`}>
        {listItem}
      </span>
    </li>
  );
}

export default ListItem;
