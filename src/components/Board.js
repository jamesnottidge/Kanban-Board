import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useBoard } from "../logic-containers/boardReducer";
import { EditBoardModal } from "./AddBoardModal/EditBoardModal";
import { AddColumnModal } from "./Column/AddColumnModal";
import { AddTaskModal } from "./AddTaskModal/AddTaskModal";
import { Column } from "./Column/Column";
import { SidebarModal } from "./Sidebar/SidebarModal";
export const Board = (props) => {
  const { currentBoard, deleteBoard, onDragEnd } = useBoard();
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditBoard, setShowEditBoard] = useState(false);
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [showSidebarModal, setShowSidebarModal] = useState(false);
  const { columns } = currentBoard;

  const dragEnd = (result) => {
    if (!result.destination) return;
    onDragEnd({
      source: result.source,
      destination: result.destination,
    });
  };
  return (
    <div className="overflow-x-hidden overflow-y-hidden main">
      <header className="p-4 flex">
        <div className="font-bold text-xl inline-block flex items-center desktop-view">
          {currentBoard.name}
        </div>
        <div
          className="font-bold text-xl inline-block flex items-center mobile-view"
          onClick={() => setShowSidebarModal(true)}
        >
          {currentBoard.name}
        </div>
        <div className="flex ml-auto">
          <button
            onClick={() => setShowAddTask(true)}
            className="color rounded-full py-3 px-4 text-white font-extrabold "
          >
            + <span className="hidden md:inline ">Add New Task</span>
          </button>

          <div className="dropdown relative">
            <button
              className="
          dropdown-toggle
          py-2.5
          px-3
          bg-none
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="caret-down"
                className="w-2 ml-2"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="purple"
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                ></path>
              </svg>
            </button>
            <ul
              className="
              absolute
          dropdown-menu
          min-w-max
          absolute
          right-2
          hidden
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          
          mt-4
          hidden
          m-0
          bg-clip-padding
          border-none
        "
              aria-labelledby="dropdownMenuButton1"
            >
              <li
                onClick={() => setShowEditBoard(true)}
                className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100"
              >
                Edit Board
              </li>
              <li
                onClick={() => deleteBoard()}
                className=" 
             dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100"
              >
                Delete Task
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div className="">
        {showAddColumn ? (
          <AddColumnModal setShowAddColumn={setShowAddColumn} />
        ) : null}
        {showSidebarModal ? (
          <SidebarModal setShowSidebarModal={setShowSidebarModal} />
        ) : null}
        {showAddTask ? <AddTaskModal setShowAddTask={setShowAddTask} /> : null}
        {showEditBoard ? (
          <EditBoardModal setShowEditBoard={setShowEditBoard} />
        ) : null}
        <div className="flex main-board overflow-x-scroll px-4">
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
                          : "#f2f2f2",
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
          <div
            onClick={() => setShowAddColumn(true)}
            className="w-80 border-2 border-black p-4"
          >
            {" "}
            <section className="">Add Column</section>
            {/* <Column column={null} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
