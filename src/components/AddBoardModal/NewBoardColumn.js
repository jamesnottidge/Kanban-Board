import React, { useEffect, useState } from "react";
import { useBoard } from "../../logic-containers/boardReducer";
import { ControlledInput } from "../ControlledInput";

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
    <div>
      <ControlledInput
        handleBlur={handleBlur}
        value={value}
        onChange={handleInputChange}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setNewBoardColumns(
            deleteNewBoardColumn(newBoardColumns, newBoardColumn.id)
          );
        }}
      >
        Delete
      </button>
    </div>
  );
};
