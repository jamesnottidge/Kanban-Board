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
    <div>
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
        className="border-4 border-black border-solid"
        onClick={() => setShowCompleteTaskModal(true)}
        {...props.dragHandle}
      >
        {title}
        <br />
        <span>
          {completedSubtasks.length} of {subtasks.length} completed
        </span>
      </div>
    </div>
  );
};
