import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import { Helmet } from "react-helmet";
import "./App.css";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeList, setActiveList] = useState("");
  const [updateTitle, setUpdateTitle] = useState(activeList.title || "");

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`App ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>To Do</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Sign Language AI App" />
      </Helmet>
      <header>{/* Header Content */}</header>
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        setActiveList={setActiveList}
        activeList={activeList}
      />
      <main>
        <Dashboard
          list={activeList}
          updateTitle={updateTitle}
          setUpdateTitle={setUpdateTitle}
        />
      </main>
    </div>
  );
}

export default App;
