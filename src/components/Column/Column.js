import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useBoard } from "../../logic-containers/boardReducer";
import { Task } from "../Task/Task";
import { CompleteTaskModal } from "../AddTaskModal/CompleteTaskModal";
import { EditTaskModal } from "../AddTaskModal/EditTaskModal";

export const Column = (props) => {
  const { column } = props;
  const { name, tasks } = column;
  //   console.log(column);
  const { currentBoard } = useBoard();

  return (
    <div className="border-4 border-black">
      {name}({tasks.length})
      {currentBoard.tasks.map((task, index) => {
        // if (column.tasks.find((id) => id === task.id)) {
        if (task.status === name) {
          return (
            <div key={task.id}>
              <Draggable draggableId={`${task.id}`} index={index}>
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={{
                        userSelect: "none",
                        padding: 16,
                        margin: "0 0 8px 0",
                        backgroundColor: snapshot.isDragging ? "#263B4A" : null,
                        ...provided.draggableProps.style,
                      }}
                    >
                      <Task
                        task={task}
                        column={column}
                        dragHandle={provided.dragHandleProps}
                      />
                      <br />
                    </div>
                  );
                }}
              </Draggable>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};
