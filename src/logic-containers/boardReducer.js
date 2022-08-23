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
    const { data } = state;
    let boardLocation;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === state.currentBoardId) {
        boardLocation = i;
      }
    }

    data[boardLocation] = {
      ...data[boardLocation],
      tasks: [
        ...data[boardLocation].tasks,
        {
          ...payload,
        },
      ],
    };

    for (let i = 0; i < data[boardLocation].columns.length; i++) {
      if (data[boardLocation].columns[i].name === payload.status) {
        data[boardLocation].columns[i].tasks.push(payload.id);
        console.log(data[boardLocation].columns[i]);
      }
    }

    return {
      ...state,
    };
  }
);
const [addColumn, addColumnReducer] = createActionAndReducer(
  "board/addColumn",
  (state, payload) => {
    const { data } = state;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === state.currentBoardId) {
        // dataJson.data[i].columns.push(payload);
        data[i] = {
          ...data[i],
          columns: [
            ...data[i].columns,
            {
              ...payload,
            },
          ],
        };
      }
    }
    return {
      ...state,
    };
  }
);

const [addBoard, addBoardReducer] = createActionAndReducer(
  "board/addBoard",
  (state, payload) => {
    const { data } = state;
    data.push(payload);
    return {
      ...state,
    };
  }
);

const [editBoard, editBoardReducer] = createActionAndReducer(
  "board/editBoard",
  (state, payload) => {
    const { data } = state;
    let boardLocation;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === state.currentBoardId) {
        boardLocation = i;
      }
    }

    data[boardLocation] = {
      ...data[boardLocation],
      name: payload.name,
      columns: [...payload.columns],
    };

    console.log(data[boardLocation].columns);

    return {
      ...state,
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
  completeTaskReducer
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
  };
};
