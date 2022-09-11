import { Draggable } from "react-beautiful-dnd";
import { useBoard } from "../../logic-containers/boardReducer";
import { Task } from "../Task/Task";
import "./Column.css";

export const Column = (props) => {
  const { column } = props;
  const { name, tasks } = column;
  const { currentBoard } = useBoard();

  return (
    <div className="text-left">
      <span className="m-3 inline-block text-sm font-semibold text-slate-600">
        {name}({tasks.length})
      </span>
      <div className="overflow-y-scroll column py-5">
        {currentBoard.tasks.map((task, index) => {
          if (task.status === name) {
            return (
              <div key={task.id}>
                <Draggable draggableId={`${task.id}`} index={index}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        className="rounded-lg"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          userSelect: "none",
                          padding: 0,
                          margin: "0 0 16px 0",
                          backgroundColor: snapshot.isDragging
                            ? "#FFFFFF"
                            : "#FFFFFF",
                          ...provided.draggableProps.style,
                        }}
                      >
                        <Task
                          task={task}
                          column={column}
                          dragHandle={provided.dragHandleProps}
                        />
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
    </div>
  );
};
