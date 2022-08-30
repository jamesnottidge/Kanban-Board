import React, { useState } from "react";
import { useBoard } from "../../logic-containers/boardReducer";
import { ControlledInput } from "../Controlled-Input/ControlledInput";

export const AddColumnModal = (props) => {
  const [newColumn, setNewColumn] = useState("");
  const { addColumn } = useBoard();

  const handleInputChange = (e) => {
    setNewColumn(e.target.value);
  };

  return (
    <div
      className="modal-custom text-left"
      onClick={() => props.setShowAddColumn(false)}
    >
      <div
        className="custom-modal-content p-5 py-7"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold">Add New Column</h2>
        <form>
          <label className="font-semibold text-slate-600" htmlFor="name">
            Name
          </label>
          <br></br>
          <input
            name="name"
            type="text"
            placeholder="e.g Archive"
            value={newColumn}
            onChange={(e) => handleInputChange(e)}
            className="min-w-full p-2 border-solid border-2 border-gray-400 rounded-lg  flex-1 bg-white body-lg w-full px-4 py-2 my-2 block rounded border text-black border-mediumGrey placeholder:opacity-60 focus:outline-none focus:border-mainPurple mb-4"
          />
        </form>

        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full min-w-full"
          onClick={() => {
            props.setShowAddColumn(false);
            addColumn({
              id: Date.now(),
              name: newColumn,
              color: "#49C4E5",
              tasks: [],
            });
          }}
        >
          + Add New Column
        </button>
      </div>
    </div>
  );
};
