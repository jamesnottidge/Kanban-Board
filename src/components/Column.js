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
            <p>
              <Task task={task} />
              <br />
            </p>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};
