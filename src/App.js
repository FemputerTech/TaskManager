import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import TaskManager from "./components/TaskManager/TaskManager";
import { Helmet } from "react-helmet";
import "./App.css";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [activeListIndex, setActiveListIndex] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const addListItem = () => {
    const newListItem = { title: "Untitled" };
    setListItems([...listItems, newListItem]);
    setActiveListIndex(listItems.length);
  };

  const updateListTitle = (index, newTitle) => {
    const updatedListItems = [...listItems];
    updatedListItems[index] = { ...updatedListItems[index], title: newTitle };
    setListItems(updatedListItems);
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
        listItems={listItems}
        setListItems={setListItems}
        setActiveListIndex={setActiveListIndex}
        activeListIndex={activeListIndex}
        addListItem={addListItem}
      />
      <main>
        <TaskManager
          list={activeListIndex !== null ? listItems[activeListIndex] : null}
          updateListTitle={(newTitle) =>
            updateListTitle(activeListIndex, newTitle)
          }
        />
      </main>
    </div>
  );
}

export default App;
