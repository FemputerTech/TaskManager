import React from "react";
import "../../styles/Dashboard/Dashboard.css";

function Dashboard({ updateTitle, setUpdateTitle }) {
  const handleOnChange = (event) => {
    setUpdateTitle(event.target.value);
  };

  return (
    <div className="dashboard">
      <input type="text" value={updateTitle} onChange={handleOnChange}></input>
    </div>
  );
}

export default Dashboard;
