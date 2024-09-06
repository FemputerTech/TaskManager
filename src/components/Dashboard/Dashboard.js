import React from "react";
import "../../styles/Dashboard/Dashboard.css";

function Dashboard({ list }) {
  return (
    <div className="dashboard">
      <h1>{list.title}</h1>
    </div>
  );
}

export default Dashboard;
