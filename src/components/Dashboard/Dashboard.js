import React from "react";
import "../../styles/Dashboard/Dashboard.css";

function Dashboard({ list }) {
  return (
    <div className="dashboard">
      <input class="dashboard-title" type="text" value={list.title}></input>
    </div>
  );
}

export default Dashboard;
