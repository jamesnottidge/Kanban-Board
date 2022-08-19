import React from "react";
import { useBoard } from "../logic-containers/boardReducer";
import { Task } from "./Task";

export const Column = (props) => {
  const { name, id, tasks } = props.column;
  const { currentBoard } = useBoard();

  return (
    <div key={id}>
      {name}({tasks.length})
      {currentBoard.tasks.map((task) => {
        if (task.status === name) {
          return (
            <div key={task.id}>
              <Task task={task} />
              <br />
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};
