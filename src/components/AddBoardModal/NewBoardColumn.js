import React, { useEffect, useState } from "react";
import { ControlledInput } from "../ControlledInput";

export const NewBoardColumn = (props) => {
  const [value, setValue] = useState(props.value ? props.value : "");
  const {
    newBoardColumns,
    newBoardColumn,
    setNewBoardColumns,
    updateNewBoardColumnArray,
    deleteNewBoardColumn,
  } = props;

  useEffect(() => {
    setValue(newBoardColumn.name);
  }, [newBoardColumn.name]);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setNewBoardColumns(
      updateNewBoardColumnArray(newBoardColumns, newBoardColumn.id, value)
    );
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
