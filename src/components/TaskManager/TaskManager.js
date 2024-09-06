import React from "react";
import "../../styles/TaskManager/TaskManager.css";

function TaskManager({ list, updateListTitle }) {
  const handleOnChange = (event) => {
    updateListTitle(event.target.value);
  };
  return (
    <div className="task-manager">
      {list ? (
        <input
          className="task-manager-title"
          type="text"
          value={list.title}
          onChange={handleOnChange}
          placeholder="Untitled"
        />
      ) : (
        <p>Select a list from the sidebar or create a new one</p>
      )}
    </div>
  );
}

export default TaskManager;
