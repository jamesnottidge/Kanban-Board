import React, { useEffect, useState } from "react";
import { useBoard } from "../../logic-containers/boardReducer";
import { Subtask } from "../Subtask";
import { Dropdown } from "../Dropdown/Dropdown";

export const EditTaskModal = (props) => {
  const { task, column, setShowEditTaskModal } = props;
  const { currentBoard, editTask } = useBoard();
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

  useEffect(() => {
    setTitle(task.title);
    setSubtasks([...task.subtasks]);
  }, [task.title, task.subtasks]);

  const deleteSubtask = (subtaskArray, id) =>
    subtaskArray.filter((element) => element.id !== id);

  return (
    <div
      className="modal-custom text-left"
      onClick={() => setShowEditTaskModal(false)}
    >
      <div
        className="custom-modal-content p-5 py-7"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold">Edit Task</h2>
        <form>
          <div>
            <label className="font-semibold text-slate-600" htmlFor="title">
              Title
            </label>
            <br></br>
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
            <br></br>
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
              className="font-semibold text-sm text-slate-600"
              htmlFor="subtasks"
            >
              Subtasks
            </label>
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
        <p className="text-sm font-semibold mb-2">Status</p>

        <Dropdown
          placeHolder={status}
          setStatus={setStatus}
          menuItems={columns}
        />

        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full min-w-full"
          onClick={() => {
            setShowEditTaskModal(false);
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
    </div>
  );
};
