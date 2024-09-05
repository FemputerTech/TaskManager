import React from "react";
import "../styles/ContextMenu.css";

const ContextMenu = ({
  contextMenuRef,
  isToggled,
  options,
  positionX,
  positionY,
}) => {
  return (
    <menu
      ref={contextMenuRef}
      className={`context-menu ${isToggled ? "active" : ""}`}
      style={{
        top: positionY + 2 + "px",
        left: positionX + 2 + "px",
      }}
    >
      {options.map((option, index) => (
        <button className="option" key={index}>
          <span>{option.title}</span>
          <box-icon name={option.icon} type="solid"></box-icon>
        </button>
      ))}
    </menu>
  );
};

export default ContextMenu;
