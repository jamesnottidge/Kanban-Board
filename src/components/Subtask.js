import React, { useState } from "react";
import { ControlledInput } from "./ControlledInput";

export const Subtask = (props) => {
  const [value, setValue] = useState(props.value ? props.value : "");
  const { subtasks, subtask, setSubtasks, updateSubtaskArray, deleteSubtask } =
    props;

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    // console.log(subtasks);
    setSubtasks(updateSubtaskArray(subtasks, subtask.id, value));
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
          setSubtasks(deleteSubtask(subtasks, subtask.id));
        }}
      >
        Delete
      </button>
    </div>
  );
};
