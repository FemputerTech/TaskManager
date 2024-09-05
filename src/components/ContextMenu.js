import React from "react";
import "../styles/ContextMenu.css";

const ContextMenu = ({ isToggled, contextMenuRef }) => {
  return (
    <menu
      ref={contextMenuRef}
      className={`context-menu ${isToggled ? "active" : ""}`}
    ></menu>
  );
};

export default ContextMenu;
