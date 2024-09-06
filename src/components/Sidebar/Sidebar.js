import React, { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SectionTitle from "./SectionTitle";
import ListItem from "./ListItem";
import ContextMenu from "../ContextMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/Sidebar.css";

function Sidebar({ isCollapsed, toggleSidebar }) {
  const [listItems, setListItems] = useState([]);
  const [contextMenu, setContextMenu] = useState({
    position: {
      x: 0,
      y: 0,
    },
    toggled: false,
  });

  const addListItem = () => {
    const newListItem = `Untitled list ${listItems.length + 1}`;
    setListItems([...listItems, newListItem]);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <SidebarHeader isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <section className="favorites">
        <SectionTitle
          text="Favorites"
          icon="fa-regular fa-star"
          isCollapsed={isCollapsed}
        />
      </section>
      <section className="private">
        <SectionTitle
          text="Private"
          icon="fa-solid fa-list-ul"
          isCollapsed={isCollapsed}
        />
        <ul className="section-list">
          {listItems.map((listItem, index) => (
            <ListItem
              key={index}
              listItem={listItem}
              isCollapsed={isCollapsed}
              setContextMenu={setContextMenu}
            />
          ))}
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
