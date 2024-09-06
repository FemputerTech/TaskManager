import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { Helmet } from "react-helmet";
import "./App.css";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <main>{/* Main Content */}</main>
    </div>
  );
}

export default App;
