import React, { useEffect, useState } from "react";
import { useBoard } from "../../logic-containers/boardReducer";
import { NewBoardColumn } from "./NewBoardColumn";
import "./BoardModal.css";

export const EditBoardModal = (props) => {
  const { currentBoard, editBoard } = useBoard();
  const [newBoardName, setNewBoardName] = useState(currentBoard?.name);
  const [newBoardColumns, setNewBoardColumns] = useState([]);
  const updateNewBoardColumnArray = (newBoardColumnArray, id, value) => {
    const newBoardColumns = newBoardColumnArray.map((element) => {
      if (element.id !== id) return element;
      return {
        ...element,
        name: value,
      };
    });
    return newBoardColumns;
  };

  useEffect(() => {
    setNewBoardName(currentBoard?.name);
    setNewBoardColumns([...currentBoard?.columns]);
  }, [currentBoard?.name, currentBoard?.columns]);

  const deleteNewBoardColumn = (newBoardColumnArray, id) =>
    newBoardColumnArray.filter((element) => element.id !== id);

  return (
    <div
      onClick={() => props.setShowEditBoard(false)}
      className="modal-custom text-left"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="custom-modal-content p-5 py-7"
      >
        <h2 className="text-lg font-bold mb-5">Edit Board</h2>
        <div>
          <label
            htmlFor="Board-name-input"
            className="text-sm font-semibold text-slate-600"
          >
            Board Name
          </label>{" "}
          <br />
          <input
            id="board-name-input"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            className="min-w-full p-2 border-solid border-2 border-gray-400 rounded-lg  flex-1 bg-white body-lg w-full px-4 py-2 my-2 block rounded border text-black border-mediumGrey placeholder:opacity-60 focus:outline-none focus:border-mainPurple mb-4"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-600">
            Board columns
          </h3>
          {newBoardColumns.map((newBoardColumn) => (
            <NewBoardColumn
              key={newBoardColumn.id}
              newBoardColumns={newBoardColumns}
              newBoardColumn={newBoardColumn}
              value={newBoardColumn.name}
              setNewBoardColumns={setNewBoardColumns}
              updateNewBoardColumnArray={updateNewBoardColumnArray}
              deleteNewBoardColumn={deleteNewBoardColumn}
            />
          ))}
          <button
            className="bg-purple-200 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full min-w-full mb-3"
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
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full min-w-full"
          onClick={() => {
            props.setShowEditBoard(false);
            editBoard({
              name: newBoardName,
              columns: newBoardColumns,
            });
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};
