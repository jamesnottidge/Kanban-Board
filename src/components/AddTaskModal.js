import React, { useState } from "react";
import { useBoard } from "../logic-containers/boardReducer";

export const AddTaskModal = (props) => {
  const { currentBoard } = useBoard();
  const columns = currentBoard?.columns;
  const [status, setStatus] = useState(columns[0].name);
  const [subtasks, setSubtasks] = useState([]);
  return (
    <div>
      <h2>Add New Task</h2>
      <form>
        <div>
          <label for="title">Title</label>
          <input name="title" type="text" placeholder="e.g Give James Money" />
        </div>
        <div>
          <label for="description">Description</label>
          <input
            name="description"
            type="text"
            placeholder="e.g Sending James money is a good good good thing to do"
          />
        </div>
        <div>
          <label for="subtasks">Subtasks</label>
          <input
            name="subtasks"
            type="text"
            placeholder="e.g Ask for his account number"
            // value={subtasks[]}
          />
        </div>
      </form>
      <button>Add New Subtask</button>
      <div>{status}</div>
      <div>
        {columns.map((column) => (
          <p onClick={() => setStatus(column.name)}>{column.name}</p>
        ))}
      </div>
    </div>
  );
};
