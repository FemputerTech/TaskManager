import React, { useState } from "react";
import "../../styles/Dashboard/Dashboard.css";

function Dashboard({ list }) {
  const [updateTitle, setUpdateTitle] = useState(list.title);

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
