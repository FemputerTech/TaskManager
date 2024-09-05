import { Helmet } from "react-helmet";
import Sidebar from "./components/Sidebar";
import "boxicons";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>To Do</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Sign Language AI App" />
      </Helmet>
      <header>{/* Header Content */}</header>
      <Sidebar />
      <main>{/* Main Content */}</main>
    </div>
  );
}

export default App;
