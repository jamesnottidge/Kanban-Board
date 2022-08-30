import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useBoard } from "../logic-containers/boardReducer";
import { EditBoardModal } from "./AddBoardModal/EditBoardModal";
import { AddColumnModal } from "./Column/AddColumnModal";
import { AddTaskModal } from "./AddTaskModal/AddTaskModal";
import { Column } from "./Column/Column";
export const Board = (props) => {
  const { currentBoard, deleteBoard, onDragEnd } = useBoard();
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditBoard, setShowEditBoard] = useState(false);
  const [showAddColumn, setShowAddColumn] = useState(false);
  const { columns } = currentBoard;

  const dragEnd = (result) => {
    if (!result.destination) return;
    onDragEnd({
      source: result.source,
      destination: result.destination,
    });
  };
  return (
    <div>
      <header>
        <button onClick={() => setShowAddTask(true)}>Add New Task</button>
        <button onClick={() => setShowEditBoard(true)}>Edit Board</button>
        <button onClick={() => deleteBoard()}>Delete Board</button>
      </header>
      {showAddColumn ? (
        <AddColumnModal setShowAddColumn={setShowAddColumn} />
      ) : null}
      {showAddTask ? <AddTaskModal setShowAddTask={setShowAddTask} /> : null}
      {showEditBoard ? (
        <EditBoardModal setShowEditBoard={setShowEditBoard} />
      ) : null}
      <div className="flex">
        <DragDropContext onDragEnd={(result) => dragEnd(result)}>
          {columns?.map((column) => (
            <Droppable droppableId={`${column.id}`} key={column.id}>
              {(provided, snapshot) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver
                        ? "lightblue"
                        : "lightgrey",
                      padding: 4,
                    }}
                  >
                    <Column column={column} />
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          ))}
        </DragDropContext>
        <div onClick={() => setShowAddColumn(true)}> Add Column</div>
      </div>
    </div>
  );
};
