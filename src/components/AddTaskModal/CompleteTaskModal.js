import React, { useEffect, useState } from "react";
import { useBoard } from "../../logic-containers/boardReducer";
import { Dropdown } from "../Dropdown/Dropdown";
import { Hamburger } from "../Dropdown/Hamburger";
import "./TaskModal.css";

export const CompleteTaskModal = (props) => {
  const { currentBoard, completeTask, deleteTask } = useBoard();
  const { task, column, setShowCompleteTaskModal } = props;
  const { columns } = currentBoard;
  const [status, setStatus] = useState("");
  const [subtasks, setSubtasks] = useState([...task.subtasks]);

  const completedSubtasks = subtasks.filter(
    (subtask) => subtask.isCompleted === true
  );

  const toggleIsCompleted = (id) =>
    subtasks.map((element) => {
      if (element.id !== id) return element;
      return { ...element, isCompleted: !element.isCompleted };
    });

  const onEditClick = () => {
    props.setShowEditTaskModal(true);
    props.setShowCompleteTaskModal(false);
  };

  const onDeleteClick = () => {
    deleteTask({
      task: props.task,
    });
  };

  useEffect(() => {
    setStatus(`${task.status}`);
  }, [task.status]);
  return (
    <div
      className="modal-custom"
      onClick={() => setShowCompleteTaskModal(false)}
    >
      {" "}
      <div
        onClick={(e) => e.stopPropagation()}
        className="custom-modal-content p-5"
      >
        <div className="mb-4 flex  align-items-center justify-between">
          <h2 className="text-left text-xl font-bold">{task.title}</h2>
          <Hamburger
            menuItems={[
              { id: 1, name: "Edit Task", clickEvent: onEditClick },
              { id: 2, name: "Delete Task", clickEvent: onDeleteClick },
            ]}
          />
        </div>
        <div className="flex justify-left font-semibold mb-2">
          Subtasks ({completedSubtasks.length} of {subtasks.length})
        </div>
        {subtasks.map((subtask) => (
          <div
            key={subtask.id}
            className="bg-gray-100 flex justify-left p-3 mb-2"
          >
            <input
              type="checkbox"
              id={subtask.id}
              defaultChecked={subtask.isCompleted}
              onChange={() => setSubtasks(toggleIsCompleted(subtask.id))}
              className="mr-2 accent-purple-500"
            ></input>
            <label htmlFor={subtask.id} className="text-left">
              {subtask.title}
            </label>
          </div>
        ))}

        <Dropdown
          placeHolder={status}
          setStatus={setStatus}
          menuItems={columns}
        />

        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => {
            completeTask({
              status,
              subtasks,
              id: task.id,
              column: column,
              task: task,
            });
            setShowCompleteTaskModal(false);
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};
