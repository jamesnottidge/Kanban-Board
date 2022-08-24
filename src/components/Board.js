import React from "react";
import { useBoard } from "../logic-containers/boardReducer";
import { EditBoardModal } from "./AddBoardModal/EditBoardModal";
import { AddColumnModal } from "./AddColumnModal";
import { Column } from "./Column";
export const Board = (props) => {
  const { currentBoard, deleteBoard } = useBoard();

  const { columns } = currentBoard;
  return (
    <div>
      {columns?.map((column) => (
        <Column column={column} key={column.id} />
      ))}
      <AddColumnModal />
      <EditBoardModal />
      <button onClick={() => deleteBoard()}>Delete Board</button>
    </div>
  );
};
