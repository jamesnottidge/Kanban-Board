import React from "react";

export const Task = (props) => {
  const { title, subtasks } = props.task;
  const completedSubtasks = subtasks.filter(
    (subtask) => subtask.isCompleted === true
  );
  return (
    <div>
      {title}
      <br />
      <span>
        {completedSubtasks.length} of {subtasks.length} completed
      </span>
    </div>
  );
};
