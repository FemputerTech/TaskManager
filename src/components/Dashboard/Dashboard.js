import React from "react";
import "../../styles/Dashboard/Dashboard.css";

function Dashboard({ list, updateTitle, setUpdateTitle }) {
  const handleOnChange = (event) => {
    setUpdateTitle(event.target.value);
    list.title = event.target.value;
  };

  return (
    <div className="dashboard">
      <input
        type="text"
        value={list.title || ""}
        onChange={handleOnChange}
      ></input>
    </div>
  );
}

export default Dashboard;
