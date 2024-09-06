import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
            <FontAwesomeIcon
              icon={option.icon}
              color="var(--text-faint)"
              size="lg"
            />
          </button>
        );
      })}
    </menu>
  );
};

export default ContextMenu;
