import React from "react";
import { useBoard } from "../logic-containers/boardReducer";
import { Task } from "./Task";

export const Column = (props) => {
  const { column } = props;
  const { name, tasks } = column;
  //   console.log(column);
  const { currentBoard } = useBoard();

  return (
    <div className="border-4 border-black">
      {name}({tasks.length})
      {currentBoard.tasks.map((task) => {
        if (task.status === name) {
          return (
            <div key={task.id}>
              <Task task={task} column={column} />
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
