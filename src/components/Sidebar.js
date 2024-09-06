import React, { useRef, useState } from "react";
import ContextMenu from "./ContextMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Sidebar.css";

function Sidebar({ isCollapsed, toggleSidebar }) {
  const [listItems, setListItems] = useState([]);
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  const [clickedItemIndex, setClickedItemIndex] = useState(null);
  const [contextMenu, setContextMenu] = useState({
    position: {
      x: 0,
      y: 0,
    },
    toggled: false,
  });
  const optionRef = useRef(null);

  const handleItemClick = (type, index) => {
    if (type === "click") {
      setActiveItemIndex(index);
    } else if (type === "mouseDown") {
      setClickedItemIndex(index);
    } else {
      setClickedItemIndex(null);
    }
  };

  const addListItem = () => {
    const newListItem = `Untitled list ${listItems.length + 1}`;
    setListItems([...listItems, newListItem]);
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
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
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
      <section className="favorites">
        <div className="section-title">
          <FontAwesomeIcon
            icon="fa-regular fa-star"
            color="var(--text-faint)"
            size="xs"
          />
          <span className={`section-text ${isCollapsed ? "collapsed" : ""}`}>
            Favorites
          </span>
        </div>
      </section>
      <section className="private">
        <div className="section-title">
          <FontAwesomeIcon
            icon="fa-solid fa-list-ul"
            color="var(--text-faint)"
            size="xs"
          />
          <span className={`section-text ${isCollapsed ? "collapsed" : ""} `}>
            Private
          </span>
        </div>
        <ul className="section-list">
          {listItems.map((listItem, index) => {
            return (
              <li
                className={`list-item ${isCollapsed ? "collapsed" : ""} ${
                  activeItemIndex === index ? "active" : ""
                } ${clickedItemIndex === index ? "clicked" : ""}`}
                ref={index === activeItemIndex ? optionRef : null}
                onContextMenu={(event) => handleOnContextMenu(event, listItem)}
                onClick={() => handleItemClick("click", index)}
                onMouseDown={() => handleItemClick("mouseDown", index)}
                onMouseUp={() => handleItemClick("mouseUp", index)}
                key={index}
              >
                {listItem}
              </li>
            );
          })}
        </ul>
        <button
          className={`new-item-button ${isCollapsed ? "collapsed" : ""}`}
          onClick={addListItem}
        >
          <FontAwesomeIcon icon="fa-solid fa-plus" color="var(--text-normal)" />
          <span className={`button-text ${isCollapsed ? "collapsed" : ""}`}>
            Create new list
          </span>
        </button>
        <ContextMenu
          isToggled={contextMenu.toggled}
          positionX={contextMenu.position.x}
          positionY={contextMenu.position.y}
          options={[
            {
              text: "Favorite",
              icon: "fa-solid fa-star",
              onClick: () => alert("rename"),
            },
            {
              text: "Rename",
              icon: "fa-solid fa-pen-to-square",
              onClick: () => alert("rename"),
            },
            {
              text: "Delete",
              icon: "fa-solid fa-trash-can",
              onClick: () => alert("delete"),
            },
          ]}
        />
      </section>
    </div>
  );
}

export default Sidebar;
