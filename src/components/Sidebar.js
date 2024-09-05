import React, { useRef, useState } from "react";
import ContextMenu from "./ContextMenu";
import "../styles/Sidebar.css";

function Sidebar({ isCollapsed, toggleSidebar }) {
  const [listItems, setListItems] = useState([]);
  const [contextMenu, setContextMenu] = useState({
    position: {
      x: 0,
      y: 0,
    },
    toggled: false,
  });
  const optionRef = useRef(null);

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
          <box-icon className="logo-icon" name="note"></box-icon>
          <span className={`logo-text ${isCollapsed ? "collapsed" : ""}`}>
            ToDo
          </span>
        </div>
        <button
          className="toggle"
          onClick={toggleSidebar}
          aria-label="collapse sidebar"
        >
          <box-icon
            name={isCollapsed ? "chevrons-right" : "chevrons-left"}
          ></box-icon>
        </button>
      </div>
      <section className="lists">
        <div className="section-title">
          <box-icon color="gray" name="list-ul"></box-icon>
          <span className={`section-text ${isCollapsed ? "collapsed" : ""}`}>
            Lists
          </span>
        </div>
        <ul className="section-list">
          {listItems.map((listItem, index) => {
            return (
              <li
                ref={optionRef}
                onContextMenu={(event) => handleOnContextMenu(event, listItem)}
                key={index}
              >
                <box-icon color="gray" name="grid-vertical"></box-icon>
                {listItem}
              </li>
            );
          })}
          <button className="new-item-button" onClick={addListItem}>
            <box-icon name="plus"></box-icon>
            <span className={`section-text ${isCollapsed ? "collapsed" : ""}`}>
              Create new list
            </span>
          </button>
        </ul>
        <ContextMenu
          isToggled={contextMenu.toggled}
          positionX={contextMenu.position.x}
          positionY={contextMenu.position.y}
          options={[
            {
              title: "Delete",
              description: "Delete from list",
              icon: "message-square-x",
              onClick: () => alert("delete"),
            },
            {
              title: "Rename",
              icon: "message-square-edit",
              description: "Rename list item",
              onClick: () => alert("rename"),
            },
          ]}
        />
      </section>
      <section className="settings">
        <div className="section-title">
          <box-icon color="gray" name="cog" type="regular"></box-icon>
          <span className={`section-text ${isCollapsed ? "collapsed" : ""}`}>
            Settings
          </span>
        </div>
      </section>
    </div>
  );
}

export default Sidebar;
