import React from "react";
import { useBoard } from "../logic-containers/boardReducer";
import { EditBoardModal } from "./AddBoardModal/EditBoardModal";
import { AddColumnModal } from "./AddColumnModal";
import { Column } from "./Column";
export const Board = (props) => {
  const { currentBoard, addColumn } = useBoard();
  const columns = currentBoard?.columns;

  return (
    <div>
      {columns?.map((column) => (
        <Column column={column} key={column.id} />
      ))}
      <AddColumnModal />
      <EditBoardModal />
    </div>
  );
};
