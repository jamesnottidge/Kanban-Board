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
          if (column.name === payload.column.name) {
            console.log("fly away");
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

export const boardReducer = combineReducers(
  currentBoardIdReducer,
  addTaskReducer,
  addColumnReducer,
  addBoardReducer,
  editBoardReducer,
  completeTaskReducer,
  editTaskStatusReducer,
  editTaskReducer
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
  };
};
