import React, { useState } from "react";
import { useBoard } from "../../logic-containers/boardReducer";
import { Subtask } from "../Subtask";
import "./TaskModal.css";

export const AddTaskModal = (props) => {
  const { currentBoard, addTask } = useBoard();
  const columns = currentBoard?.columns || [];
  const [status, setStatus] = useState(columns[0]?.name);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([]);

  const updateSubtaskArray = (subtaskArray, id, value) => {
    const subtasks = subtaskArray.map((element) => {
      if (element.id !== id) return element;
      return {
        ...element,
        title: value,
      };
    });
    return subtasks;
  };

  const deleteSubtask = (subtaskArray, id) =>
    subtaskArray.filter((element) => element.id !== id);

  return (
    <div
      className="modal-custom text-left"
      onClick={() => props.setShowAddTask(false)}
    >
      {" "}
      <div
        className="custom-modal-content p-5 py-7"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold">Add New Task</h2>
        <form>
          <div>
            <label htmlFor="title" className="font-semibold text-slate-600">
              Title
            </label>
            <br />
            <input
              name="title"
              type="text"
              placeholder="e.g Give James Money"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="min-w-full p-2 border-solid border-2 border-gray-400 rounded-lg  flex-1 bg-white body-lg w-full px-4 py-2 my-2 block rounded border text-black border-mediumGrey placeholder:opacity-60 focus:outline-none focus:border-mainPurple mb-4"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="font-semibold text-slate-600"
            >
              Description
            </label>
            <br />
            <textarea
              name="description"
              type="text"
              placeholder="e.g Sending James money is a good good good thing to do"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-w-full min-h-full h-20 min-w-full p-2 border-solid border-2 border-gray-400 rounded-lg  flex-1 bg-white body-lg w-full px-4 py-2 my-2 block rounded border text-black border-mediumGrey placeholder:opacity-60 focus:outline-none focus:border-mainPurple mb-4"
            />
          </div>
          <div>
            <label
              htmlFor="subtasks"
              className="font-semibold text-sm text-slate-600"
            >
              Subtasks
            </label>
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
          className="bg-purple-200 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full min-w-full mb-3"
          onClick={() =>
            setSubtasks([
              ...subtasks,
              { id: Date.now(), title: "", isCompleted: false },
            ])
          }
        >
          Add New Subtask
        </button>
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
                key={column.id + 1003}
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
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full min-w-full"
          onClick={() => {
            props.setShowAddTask(false);
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
    </div>
  );
};
