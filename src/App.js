import logo from "./logo.svg";
import "./App.css";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { useState } from "react";
import { Board } from "./components/Board";
import { AddTaskModal } from "./components/AddTaskModal/AddTaskModal";

function App() {
  return (
    <div className="App flex">
      <Sidebar />
      <Board />
    </div>
  );
}

export default App;
