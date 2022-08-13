import logo from "./logo.svg";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { useState } from "react";
import { Board } from "./components/Board";
import { AddTaskModal } from "./components/AddTaskModal";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Board />
      <AddTaskModal />
    </div>
  );
}

export default App;
