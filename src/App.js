import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <div className="sidebar"></div>
      <main></main>
    </div>
  );
}

export default App;
