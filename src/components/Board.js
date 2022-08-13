import React from "react";
import { useBoard } from "../logic-containers/boardReducer";
import { Column } from "./Column";
export const Board = (props) => {
  const { currentBoard } = useBoard();
  const columns = currentBoard?.columns;

  return (
    <div>
      {columns?.map((column) => (
        <Column column={column} />
      ))}
    </div>
  );
};
