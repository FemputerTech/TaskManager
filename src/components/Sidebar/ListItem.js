import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      className={`list-item ${isCollapsed ? "collapsed" : ""} ${
        isActive ? "active" : ""
      } ${isClicked ? "clicked" : ""}`}
      ref={optionRef}
      onContextMenu={(event) => handleOnContextMenu(event, listItem)}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <FontAwesomeIcon icon="fa-regular fa-file" />
      {listItem}
    </li>
  );
}

export default ListItem;
