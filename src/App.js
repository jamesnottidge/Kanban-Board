import "./App.css";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Board } from "./components/Board";

function App() {
  return (
    <div className="App flex">
      <section className="desktop-view">
        <Sidebar />
      </section>

      <Board />
    </div>
  );
}

export default App;
