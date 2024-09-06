import React, { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SectionHeader from "./SectionHeader";
import Workspace from "./Workspace";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/Sidebar/Sidebar.css";

function Sidebar({
  isCollapsed,
  toggleSidebar,
  listItems,
  setListItems,
  setActiveListIndex,
  activeListIndex,
  addListItem,
}) {
  const [clickedListIndex, setClickedListIndex] = useState(null);

  const handleItemClick = (type, index) => {
    if (type === "click") {
      setActiveListIndex(index);
    } else if (type === "mousedown") {
      setClickedListIndex(index);
    } else {
      setClickedListIndex(null);
    }
  };

  const handleItemDelete = (index) => (event) => {
    event.stopPropagation();
    const newListItems = listItems.filter((_, i) => i !== index);
    setListItems(newListItems);
    if (activeListIndex === index) {
      setActiveListIndex(null);
    } else if (activeListIndex > index) {
      setActiveListIndex(activeListIndex - 1);
    }
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <SidebarHeader isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <section className="favorites">
        <SectionHeader
          text="Favorites"
          icon="fa-regular fa-star"
          isCollapsed={isCollapsed}
        />
      </section>
      <section className="private">
        <SectionHeader
          text="Private"
          icon="fa-solid fa-list-ul"
          isCollapsed={isCollapsed}
        />
        <ul className="lists">
          {listItems.map((listItem, index) => (
            <Workspace
              key={index}
              title={listItem.title}
              isActive={index === activeListIndex}
              isClicked={index === clickedListIndex}
              onClick={(event) => handleItemClick(event.type, index)}
              onMouseDown={(event) => handleItemClick(event.type, index)}
              onMouseUp={(event) => handleItemClick(event.type, index)}
              onDelete={handleItemDelete(index)}
              isCollapsed={isCollapsed}
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
      </section>
    </div>
  );
}

export default Sidebar;
