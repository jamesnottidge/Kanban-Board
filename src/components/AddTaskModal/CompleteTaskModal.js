import React, { useEffect, useState } from "react";
import { useBoard } from "../../logic-containers/boardReducer";
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
        <div className="mb-4 flex  align-items-center">
          <h2 className="text-left text-xl font-bold">{task.title}</h2>
          <div className="dropdown relative ml-auto ">
            <button
              className="
          dropdown-toggle
          px-6
          py-2.5
          bg-none
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="caret-down"
                className="w-2 ml-2"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="purple"
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                ></path>
              </svg>
            </button>
            <ul
              className="
              absolute
          dropdown-menu
          min-w-max
          absolute
          hidden
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          hidden
          m-0
          bg-clip-padding
          border-none
        "
              aria-labelledby="dropdownMenuButton1"
            >
              <li
                onClick={() => {
                  props.setShowEditTaskModal(true);
                  props.setShowCompleteTaskModal(false);
                }}
                className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100"
              >
                Edit Task
              </li>
              <li
                onClick={() =>
                  deleteTask({
                    task: props.task,
                  })
                }
                className=" 
             dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100"
              >
                Delete Task
              </li>
              <li
                className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100"
              >
                Something else here
              </li>
            </ul>
          </div>
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
        <div className="dropdown relative">
          <div
            className="flex justify-left align-items-center  dropdown-toggle border-solid border-2 border-sky-300
          px-6
          py-2.5
          bg-none
          mb-4
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span>{status}</span>
            <span className="ml-auto">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="caret-down"
                className="w-2 ml-2"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="purple"
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                ></path>
              </svg>
            </span>
          </div>
          <ul
            className="
          dropdown-menu
          absolute
          hidden
          min-w-full
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          hidden
          m-0
          bg-clip-padding
          border-none"
            aria-labelledby="dropdownMenuButton1"
          >
            {columns.map((column) => (
              <li
                key={column.id + 2003}
                onClick={() => setStatus(column.name)}
                className=" dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100"
              >
                {column.name}
              </li>
            ))}
          </ul>
        </div>

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
