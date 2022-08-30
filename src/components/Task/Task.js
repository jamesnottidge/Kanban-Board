import React, { useState } from "react";
import { EditTaskModal } from "../AddTaskModal/EditTaskModal";
import { CompleteTaskModal } from "../AddTaskModal/CompleteTaskModal";
import { useBoard } from "../../logic-containers/boardReducer";

export const Task = (props) => {
  const { title, subtasks } = props.task;
  const { deleteTask } = useBoard();
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showCompleteTaskModal, setShowCompleteTaskModal] = useState(false);
  const completedSubtasks = subtasks.filter(
    (subtask) => subtask.isCompleted === true
  );
  return (
    <div className=" p-3">
      {" "}
      {showCompleteTaskModal ? (
        <CompleteTaskModal
          task={props.task}
          column={props.column}
          setShowCompleteTaskModal={setShowCompleteTaskModal}
          setShowEditTaskModal={setShowEditTaskModal}
        />
      ) : null}
      {showEditTaskModal ? (
        <EditTaskModal
          task={props.task}
          column={props.column}
          setShowEditTaskModal={setShowEditTaskModal}
        />
      ) : null}
      <div
        className=""
        onClick={() => setShowCompleteTaskModal(true)}
        {...props.dragHandle}
      >
        <span className="font-extrabold text-sm inline-block mb-3">
          {title}
        </span>
        <br />
        <span className="text-slate-600 font-semibold text-xs">
          {completedSubtasks.length} of {subtasks.length} subtasks
        </span>
      </div>
    </div>
  );
};
