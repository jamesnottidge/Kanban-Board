import React, { useState } from "react";
import { useBoard } from "../../logic-containers/boardReducer";
import { NewBoardColumn } from "./NewBoardColumn";

export const AddBoardModal = (props) => {
  const [newBoardName, setNewBoardName] = useState("");
  const [newBoardColumns, setNewBoardColumns] = useState([]);
  const { addBoard } = useBoard();

  const updateNewBoardColumnArray = (newBoardColumnArray, id, value) => {
    const newBoardColumns = newBoardColumnArray;
    newBoardColumnArray.forEach((element) => {
      if (element.id === id) {
        element.title = value;
      }
    });
    return newBoardColumns;
  };

  const deleteNewBoardColumn = (newBoardColumnArray, id) =>
    newBoardColumnArray.filter((element) => element.id !== id);

  return (
    <div>
      <h2>Add New Board</h2>
      <div>
        <label htmlFor="Board-name-input">Board Name</label>
        <input
          id="board-name-input"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
        />
      </div>
      <div>
        <h3>Board columns</h3>
        {newBoardColumns.map((newBoardColumn) => (
          <NewBoardColumn
            key={newBoardColumn.id}
            newBoardColumns={newBoardColumns}
            newBoardColumn={newBoardColumn}
            setNewBoardColumns={setNewBoardColumns}
            updateNewBoardColumnArray={updateNewBoardColumnArray}
            deleteNewBoardColumn={deleteNewBoardColumn}
          />
        ))}
        <button
          onClick={() =>
            setNewBoardColumns([
              ...newBoardColumns,
              { id: Date.now(), name: "", color: "#67E2AE", tasks: [] },
            ])
          }
        >
          + Add New Column
        </button>
      </div>
      <button
        onClick={() => {
          addBoard({
            id: Date.now(),
            name: newBoardName,
            tasks: [],
            columns: [],
          });
          props.setState(1);
        }}
      >
        Save Changes
      </button>
    </div>
  );
};
