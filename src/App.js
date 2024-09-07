import React, { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import TaskManager from "./components/task_manager/TaskManager";
import { Helmet } from "react-helmet";
import "./App.css";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [activeWorkspaceIndex, setActiveWorkspaceIndex] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const addWorkspace = () => {
    const newWorkspace = { title: "Untitled" };
    setWorkspaces([...workspaces, newWorkspace]);
    setActiveWorkspaceIndex(workspaces.length);
  };

  const updateWorkspaceTitle = (index, newTitle) => {
    const updatedWorkspaces = [...workspaces];
    updatedWorkspaces[index] = { ...updatedWorkspaces[index], title: newTitle };
    setWorkspaces(updatedWorkspaces);
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
        workspaces={workspaces}
        setWorkspaces={setWorkspaces}
        activeWorkspaceIndex={activeWorkspaceIndex}
        setActiveWorkspaceIndex={setActiveWorkspaceIndex}
        addWorkspace={addWorkspace}
      />
      <main>
        <TaskManager
          workspace={
            activeWorkspaceIndex !== null
              ? workspaces[activeWorkspaceIndex]
              : null
          }
          updateWorkspaceTitle={(newTitle) =>
            updateWorkspaceTitle(activeWorkspaceIndex, newTitle)
          }
        />
      </main>
    </div>
  );
}

export default App;
