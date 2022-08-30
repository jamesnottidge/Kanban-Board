import { useGlobalState } from "../StateContext";
import { combineReducers, createActionAndReducer } from "./utils";
const [setCurrentBoardId, currentBoardIdReducer] = createActionAndReducer(
  "board/setcurrentBoardId",
  (state, payload) => {
    return {
      ...state,
      currentBoardId: payload,
    };
  }
);

const [addTask, addTaskReducer] = createActionAndReducer(
  "board/addTask",
  (state, payload) => {
    const { data, currentBoardId } = state;

    const updatedData = data.map((board) => {
      if (board.id !== currentBoardId) return board;
      const { tasks, columns } = board;

      return {
        ...board,
        tasks: tasks.concat([payload]),
        columns: columns.map((column) => {
          if (column.name !== payload.status) return column;
          return {
            ...column,
            tasks: [...column.tasks, payload.id],
          };
        }),
      };
    });

    return {
      ...state,
      data: updatedData,
    };
  }
);

const [editTask, editTaskReducer] = createActionAndReducer(
  "board/editTask",
  (state, payload) => {
    const { data, currentBoardId } = state;

    const updatedData = data.map((board) => {
      if (board.id !== currentBoardId) return board;
      const { tasks, columns } = board;
      console.log("flyer");
      return {
        ...board,
        tasks: tasks.map((task) => {
          if (task.id !== payload.id) return task;
          return {
            ...task,
            title: payload.title,
            description: payload.description,
            subtasks: payload.subtasks,
            status: payload.status,
          };
        }),
        columns: columns.map((column) => {
          if (
            column.name === payload.column.name &&
            column.name !== payload.status
          )
            return {
              ...column,
              tasks: column.tasks.filter((taskID) => taskID !== payload.id),
            };
          else if (
            column.name === payload.status &&
            payload.status != payload.task.status
          )
            return {
              ...column,
              tasks: [...column.tasks, payload.id],
            };
          else
            return {
              ...column,
            };
        }),
      };
    });

    return {
      ...state,
      data: updatedData,
    };
  }
);

const [addColumn, addColumnReducer] = createActionAndReducer(
  "board/addColumn",
  (state, payload) => {
    const { data, currentBoardId } = state;
    const updatedData = data.map((board) => {
      if (board.id !== currentBoardId) return board;
      const { columns } = board;

      return {
        ...board,
        columns: [...columns, payload],
      };
    });

    return {
      ...state,
      data: updatedData,
    };
  }
);

const [addBoard, addBoardReducer] = createActionAndReducer(
  "board/addBoard",
  (state, payload) => {
    const { data } = state;
    const updatedData = [
      ...data,
      {
        id: payload.id,
        name: payload.name,
        tasks: payload.tasks,
        columns: payload.columns,
      },
    ];

    return {
      ...state,
      data: updatedData,
    };
  }
);

const [editBoard, editBoardReducer] = createActionAndReducer(
  "board/editBoard",
  (state, payload) => {
    const { data, currentBoardId } = state;

    const updatedData = data.map((board) => {
      if (board.id !== currentBoardId) return board;
      return {
        ...board,
        name: payload.name,
        columns: [...payload.columns],
      };
    });

    return {
      ...state,
      data: updatedData,
    };
  }
);

const [editTaskStatus, editTaskStatusReducer] = createActionAndReducer(
  "board/editTaskStatus",
  (state, payload) => {
    const { data, currentBoardId } = state;

    const updatedData = data.map((board) => {
      if (board.id !== currentBoardId) return board;
      const { tasks } = board;
      return {
        ...board,
        tasks: tasks.map((task) => {
          if (task.id !== payload.taskId) return task;
          return {
            ...task,
            status: payload.newStatus,
          };
        }),
      };
    });

    return {
      ...state,
      data: updatedData,
    };
  }
);

const [completeTask, completeTaskReducer] = createActionAndReducer(
  "board/completeTask",
  (state, payload) => {
    const { data, currentBoardId } = state;
    const updatedData = data.map((board) => {
      if (board.id !== currentBoardId) return board;
      const { tasks, columns } = board;

      return {
        ...board,
        tasks: tasks.map((task) => {
          if (task.id !== payload.id) return task;

          return {
            ...task,
            subtasks: payload.subtasks,
            status: payload.status,
          };
        }),
        columns: columns.map((column) => {
          if (
            column.name === payload.column.name &&
            column.name !== payload.status
          ) {
            return {
              ...column,
              tasks: column.tasks.filter((taskID) => taskID !== payload.id),
            };
          } else if (
            column.name === payload.status &&
            payload.status != payload.task.status
          ) {
            return {
              ...column,
              tasks: [...column.tasks, payload.id],
            };
          } else
            return {
              ...column,
            };
        }),
      };
    });
    return {
      ...state,
      data: updatedData,
    };
  }
);

const [deleteBoard, deleteBoardReducer] = createActionAndReducer(
  "board/deleteBoard",
  (state, payload) => {
    const { data, currentBoardId } = state;

    const updatedData = data.filter((board) => {
      if (data.length <= 1) return board.id;
      if (data.length > 1) return board.id !== currentBoardId;
    });

    return {
      ...state,
      data: updatedData,
      currentBoardId: updatedData[0].id,
    };
  }
);

const [deleteTask, deleteTaskReducer] = createActionAndReducer(
  "board/deleteTask",
  (state, payload) => {
    const { data, currentBoardId } = state;

    const updatedData = data.map((board) => {
      if (board.id !== currentBoardId) return board;
      const { tasks, columns } = board;

      return {
        ...board,
        tasks: tasks.filter((task) => task.id !== payload.task.id),
        columns: columns.map((column) => {
          if (column.name !== payload.task.status) return column;
          return {
            ...column,
            tasks: column.tasks.filter((taskID) => taskID !== payload.task.id),
          };
        }),
      };
    });

    return {
      ...state,
      data: updatedData,
    };
  }
);

const [onDragEnd, onDragEndReducer] = createActionAndReducer(
  "board/onDragEnd",
  (state, payload) => {
    const { data, currentBoardId } = state;

    const updatedData = data.map((board) => {
      if (board.id !== currentBoardId) return board;
      const { tasks, columns } = board;
      const copiedTasks = [...tasks];
      const [removed] = copiedTasks.splice(payload.source.index, 1);

      if (payload.source.droppableId !== payload.destination.droppableId) {
        let updatedTask;
        const updatedColumns = columns.map((column) => {
          if (column.id == payload.source.droppableId) {
            const updatedColumnTasks = column.tasks.filter(
              (id) => id !== removed.id
            );
            return {
              ...column,
              tasks: updatedColumnTasks,
            };
          } else if (column.id == payload.destination.droppableId) {
            updatedTask = {
              ...removed,
              status: column.name,
            };
            return {
              ...column,
              tasks: [...column.tasks, removed.id],
            };
          } else return column;
        });

        copiedTasks.splice(payload.destination.index, 0, updatedTask);
        return {
          ...board,
          tasks: copiedTasks,
          columns: updatedColumns,
        };
      } else {
        copiedTasks.splice(payload.destination.index, 0, removed);
        return {
          ...board,
          tasks: copiedTasks,
        };
      }
    });

    return {
      ...state,
      data: updatedData,
    };
  }
);

export const boardReducer = combineReducers(
  currentBoardIdReducer,
  addTaskReducer,
  addColumnReducer,
  addBoardReducer,
  editBoardReducer,
  completeTaskReducer,
  editTaskStatusReducer,
  editTaskReducer,
  deleteBoardReducer,
  deleteTaskReducer,
  onDragEndReducer
);

export const useBoard = () => {
  const { dispatch, state } = useGlobalState();
  const { currentBoardId, data } = state;

  const currentBoard = data.find((board) => board.id === currentBoardId);

  return {
    setBoardId: (id) => dispatch(setCurrentBoardId(id)),
    currentBoardId,
    currentBoard,
    addTask: (newTask) => dispatch(addTask(newTask)),
    addColumn: (newColumn) => dispatch(addColumn(newColumn)),
    addBoard: (newBoard) => dispatch(addBoard(newBoard)),
    editBoard: (editedBoard) => dispatch(editBoard(editedBoard)),
    completeTask: (completedTask) => dispatch(completeTask(completedTask)),
    editTaskStatus: (newTaskStatus) => dispatch(editTaskStatus(newTaskStatus)),
    editTask: (editedTask) => dispatch(editTask(editedTask)),
    deleteBoard: () => dispatch(deleteBoard()),
    deleteTask: (task) => dispatch(deleteTask(task)),
    onDragEnd: (result) => dispatch(onDragEnd(result)),
  };
};
