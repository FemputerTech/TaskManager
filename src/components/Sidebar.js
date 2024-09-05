import React from "react";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="toggle">
        <box-icon name="chevrons-left"></box-icon>
      </div>
      <div className="logo">
        <span class="logo-text">ToDo</span>
      </div>
    </div>
  );
}

export default Sidebar;
