import React from "react";
import { EditTaskModal } from "./AddTaskModal/EditTaskModal";
import { CompleteTaskModal } from "./AddTaskModal/CompleteTaskModal";

export const Task = (props) => {
  const { title, subtasks } = props.task;
  //   console.log("flyer");
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
      <CompleteTaskModal task={props.task} column={props.column} />
      {/* <EditTaskModal task={props.task} column={props.column} /> */}
    </div>
  );
};
