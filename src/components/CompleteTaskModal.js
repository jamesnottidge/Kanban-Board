import React from "react";
import { useBoard } from "../logic-containers/boardReducer";
import { Task } from "./Task";

export const CompleteTaskModal = (props) => {
  const { currentBoard } = useBoard();
  const { task } = props;
  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted === true
  );
  return (
    <div>
      <h2>{task.title}</h2>

      <p>
        Subtasks ({completedSubtasks.length} of {task.subtasks.length})
      </p>
      {task.subtasks.map((subtask) => (
        <div key={subtask.id}>{subtask.title}</div>
      ))}
    </div>
  );
};
