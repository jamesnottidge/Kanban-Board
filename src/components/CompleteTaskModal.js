import React, { useEffect, useState } from "react";
import { useBoard } from "../logic-containers/boardReducer";
import { Task } from "./Task";

export const CompleteTaskModal = (props) => {
  const { currentBoard, completeTask } = useBoard();
  const { task, column } = props;
  const { columns } = currentBoard;
  const [status, setStatus] = useState("");
  const [subtasks, setSubtasks] = useState([...task.subtasks]);
  //   console.log("test>>>", subtasks);

  const completedSubtasks = subtasks.filter(
    (subtask) => subtask.isCompleted === true
  );

  const toggleIsCompleted = (id) =>
    subtasks.map((element) => {
      if (element.id !== id) return element;
      return { ...element, isCompleted: !element.isCompleted };
    });

  useEffect(() => {
    setStatus(`${task.status}`);
    // setSubtasks([...task.subtasks]);
  }, []);
  return (
    <div>
      <h2>{task.title}</h2>

      <p>
        Subtasks ({completedSubtasks.length} of {subtasks.length})
      </p>
      {subtasks.map((subtask) => (
        <div key={subtask.id}>
          <input
            type="checkbox"
            id={subtask.id}
            defaultChecked={subtask.isCompleted}
            onChange={() => setSubtasks(toggleIsCompleted(subtask.id))}
          ></input>
          <label htmlFor={subtask.id}>{subtask.title}</label>
        </div>
      ))}
      <div>{status}</div>
      <div>
        {columns.map((column) => (
          <p key={column.id + 2003} onClick={() => setStatus(column.name)}>
            {column.name}
          </p>
        ))}
      </div>
      <button
        onClick={() =>
          completeTask({
            status,
            subtasks,
            id: task.id,
            column: column,
            task: task,
          })
        }
      >
        Close
      </button>
    </div>
  );
};
