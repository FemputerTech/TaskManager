import React from "react";
import "../styles/ContextMenu.css";

const ContextMenu = ({
  rightClickListItem,
  isToggled,
  positionX,
  positionY,
  options,
}) => {
  return (
    <menu
      className={`context-menu ${isToggled ? "active" : ""}`}
      style={{
        top: positionY + 2 + "px",
        left: positionX + 2 + "px",
      }}
    >
      {options.map((option, index) => {
        function handleClick(event) {
          event.stopPropagation();
          option.onClick(event, rightClickListItem);
        }

        return (
          <button className="option" onClick={handleClick} key={index}>
            <span>{option.text}</span>
            <box-icon name={option.icon} type="solid"></box-icon>
          </button>
        );
      })}
    </menu>
  );
};

export default ContextMenu;
