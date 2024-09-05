import React, { useState } from "react";
import "../styles/sidebar.css";

function Sidebar({ isCollapsed, toggleSidebar }) {
  const [listItems, setListItems] = useState([]);

  const addListItem = () => {
    const newListItem = `Untitled list ${listItems.length + 1}`;
    setListItems([...listItems, newListItem]);
  };
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
          {listItems.map((listItem, index) => (
            <li key={index}>
              <box-icon color="gray" name="grid-vertical"></box-icon>
              {listItem}
            </li>
          ))}
          <button className="new-item-button" onClick={addListItem}>
            <box-icon name="plus"></box-icon>
            <span className={`section-text ${isCollapsed ? "collapsed" : ""}`}>
              Create new list
            </span>
          </button>
        </ul>
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
