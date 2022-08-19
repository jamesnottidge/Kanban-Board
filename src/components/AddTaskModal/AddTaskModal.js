import React, { useState } from "react";
import { useBoard } from "../../logic-containers/boardReducer";
import { InputContext } from "../../logic-containers/InputContext";
import { ControlledInput } from "../ControlledInput";
import { Subtask } from "../Subtask";
import dataJson from "../../data.json";

export const AddTaskModal = (props) => {
  const { currentBoard, addTask } = useBoard();
  const columns = currentBoard?.columns || [];
  const [status, setStatus] = useState(columns[0]?.name);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([]);

  const updateSubtaskArray = (subtaskArray, id, value) => {
    const subtasks = subtaskArray;
    subtasks.forEach((element) => {
      if (element.id === id) {
        element.title = value;
      }
    });
    return subtasks;
  };

  const deleteSubtask = (subtaskArray, id) =>
    subtaskArray.filter((element) => element.id !== id);

  return (
    <div>
      <h2>Add New Task</h2>
      <form>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            placeholder="e.g Give James Money"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            name="description"
            type="text"
            placeholder="e.g Sending James money is a good good good thing to do"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="subtasks">Subtasks</label>
          {subtasks.map((subtask) => (
            <Subtask
              key={subtask.id}
              subtasks={subtasks}
              subtask={subtask}
              setSubtasks={setSubtasks}
              updateSubtaskArray={updateSubtaskArray}
              deleteSubtask={deleteSubtask}
            />
          ))}
        </div>
      </form>
      <button
        onClick={() =>
          setSubtasks([
            ...subtasks,
            { id: Date.now(), title: "", isCompleted: false },
          ])
        }
      >
        Add New Subtask
      </button>
      <div>{status}</div>
      <div>
        {columns.map((column) => (
          <p key={column.id + 1003} onClick={() => setStatus(column.name)}>
            {column.name}
          </p>
        ))}
      </div>
      <button
        onClick={() => {
          addTask({
            title: title,
            id: Date.now(),
            description,
            status,
            subtasks: [...subtasks],
          });
        }}
      >
        Add New Task
      </button>
    </div>
  );
};
