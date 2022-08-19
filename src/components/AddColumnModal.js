import React, { useState } from "react";
import { useBoard } from "../logic-containers/boardReducer";
import { ControlledInput } from "./ControlledInput";

export const AddColumnModal = (props) => {
  const [newColumn, setNewColumn] = useState("");
  const { addColumn } = useBoard();

  const handleInputChange = (e) => {
    setNewColumn(e.target.value);
  };

  return (
    <div>
      <ControlledInput value={newColumn} onChange={handleInputChange} />
      <button
        onClick={() =>
          addColumn({
            id: Date.now(),
            name: newColumn,
            color: "#49C4E5",
            tasks: [],
          })
        }
      >
        + New Column
      </button>
    </div>
  );
};
