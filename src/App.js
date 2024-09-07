import React, { useState } from "react";
import Sidebar from "./components/sidebars/Sidebar";
import TaskManager from "./components/task_manager/TaskManager";
import { Helmet } from "react-helmet";
import "./App.css";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [activeWorkspaceIndex, setActiveWorkspaceIndex] = useState(null);

  const updateWorkspaceTitle = (index, newTitle) => {
    const updatedWorkspaces = [...workspaces];
    updatedWorkspaces[index] = { ...updatedWorkspaces[index], title: newTitle };
    setWorkspaces(updatedWorkspaces);
  };

  const updateWorkspaceTasks = (index, tasks) => {
    const updatedWorkspaces = [...workspaces];
    updatedWorkspaces[index] = { ...updatedWorkspaces[index], tasks: tasks };
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
        setIsCollapsed={setIsSidebarCollapsed}
        workspaces={workspaces}
        setWorkspaces={setWorkspaces}
        activeWorkspaceIndex={activeWorkspaceIndex}
        setActiveWorkspaceIndex={setActiveWorkspaceIndex}
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
          updateWorkspaceTasks={(tasks) =>
            updateWorkspaceTasks(activeWorkspaceIndex, tasks)
          }
        />
      </main>
    </div>
  );
}

export default App;
