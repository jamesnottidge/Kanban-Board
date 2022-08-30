import React, { useEffect, useState } from "react";
import { useBoard } from "../../logic-containers/boardReducer";
import { ControlledInput } from "../Controlled-Input/ControlledInput";

export const NewBoardColumn = (props) => {
  const [value, setValue] = useState(props.value ? props.value : "");
  const { editTaskStatus } = useBoard();
  const {
    newBoardColumns,
    newBoardColumn,
    setNewBoardColumns,
    updateNewBoardColumnArray,
    deleteNewBoardColumn,
  } = props;

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setNewBoardColumns(
      updateNewBoardColumnArray(newBoardColumns, newBoardColumn.id, value)
    );
    newBoardColumn.tasks.forEach((element) => {
      editTaskStatus({
        taskId: element,
        newStatus: value,
      });
    });
  };

  return (
    <div className="flex">
      <ControlledInput
        handleBlur={handleBlur}
        value={value}
        onChange={handleInputChange}
      />
      <button
        className="ml-auto"
        onClick={(e) => {
          e.preventDefault();
          setNewBoardColumns(
            deleteNewBoardColumn(newBoardColumns, newBoardColumn.id)
          );
        }}
      >
        <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
          <g fill="currentColor" fill-rule="evenodd">
            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"></path>
            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"></path>
          </g>
        </svg>
      </button>
    </div>
  );
};
