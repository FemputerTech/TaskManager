import React, { useState, useRef } from "react";

function ListItem({ listItem, isCollapsed, setContextMenu }) {
  const [isActive, setIsActive] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const optionRef = useRef(null);

  const handleItemClick = (type) => {
    if (type === "click") {
      setIsActive(true);
    } else if (type === "mouseDown") {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  };

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
      onClick={() => handleItemClick("click")}
      onMouseDown={() => handleItemClick("mouseDown")}
      onMouseUp={() => handleItemClick("mouseUp")}
    >
      {listItem}
    </li>
  );
}

export default ListItem;
