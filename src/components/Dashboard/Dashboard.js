import React from "react";
import "../../styles/Dashboard/Dashboard.css";

function Dashboard({ list, updateListTitle }) {
  const handleOnChange = (event) => {
    updateListTitle(event.target.value);
  };

  return (
    <div className="dashboard">
      {list ? (
        <input
          className="dashboard-title"
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

export default Dashboard;
