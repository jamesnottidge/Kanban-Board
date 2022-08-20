import React from "react";
import { CompleteTaskModal } from "./CompleteTaskModal";

export const Task = (props) => {
  const { title, subtasks } = props.task;
  const completedSubtasks = subtasks.filter(
    (subtask) => subtask.isCompleted === true
  );
  return (
    <div className="border-4 border-black border-solid">
      {title}
      <br />
      <span>
        {completedSubtasks.length} of {subtasks.length} completed
      </span>
      <CompleteTaskModal task={props.task} />
    </div>
  );
};
