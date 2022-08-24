import React, { useEffect, useState } from "react";
import { useBoard } from "../../logic-containers/boardReducer";
import { InputContext } from "../../logic-containers/InputContext";
import { ControlledInput } from "../ControlledInput";
import { Subtask } from "../Subtask";
import dataJson from "../../data.json";

export const EditTaskModal = (props) => {
  const { task, column } = props;
  const { currentBoard, editTask } = useBoard();
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

  useEffect(() => {
    setTitle(task.title);
    setSubtasks([...task.subtasks]);
  }, [task.title, task.subtasks]);

  const deleteSubtask = (subtaskArray, id) =>
    subtaskArray.filter((element) => element.id !== id);

  return (
    <div>
      <h2>Edit Task</h2>
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
              value={subtask.title}
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
          editTask({
            title: title,
            id: task.id,
            task,
            column,
            description,
            status,
            subtasks: [...subtasks],
          });
        }}
      >
        Save Changes
      </button>
    </div>
  );
};
