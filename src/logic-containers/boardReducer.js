import { useGlobalState } from "../StateContext";
import { combineReducers, createActionAndReducer } from "./utils";
import dataJson from "../data.json";
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
    let boardLocation;
    for (let i = 0; i < dataJson.data.length; i++) {
      if (dataJson.data[i].id === state.currentBoardId) {
        boardLocation = i;
      }
    }

    dataJson.data[boardLocation] = {
      ...dataJson.data[boardLocation],
      tasks: [
        ...dataJson.data[boardLocation].tasks,
        {
          ...payload,
        },
      ],
    };

    for (let i = 0; i < dataJson.data[boardLocation].columns.length; i++) {
      if (dataJson.data[boardLocation].columns[i].name === payload.status) {
        dataJson.data[boardLocation].columns[i].tasks.push(payload.id);
        console.log(dataJson.data[boardLocation].columns[i]);
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
    for (let i = 0; i < dataJson.data.length; i++) {
      if (dataJson.data[i].id === state.currentBoardId) {
        // dataJson.data[i].columns.push(payload);
        dataJson.data[i] = {
          ...dataJson.data[i],
          columns: [
            ...dataJson.data[i].columns,
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
    dataJson.data.push(payload);
    console.log(dataJson.data);
    return {
      ...state,
    };
  }
);

const [editBoard, editBoardReducer] = createActionAndReducer(
  "board/editBoard",
  (state, payload) => {
    let boardLocation;
    for (let i = 0; i < dataJson.data.length; i++) {
      if (dataJson.data[i].id === state.currentBoardId) {
        boardLocation = i;
      }
    }

    dataJson.data[boardLocation] = {
      ...dataJson.data[boardLocation],
      name: payload.name,
      columns: [...payload.columns],
    };

    console.log(dataJson.data[boardLocation].columns);

    return {
      ...state,
    };
  }
);

export const boardReducer = combineReducers(
  currentBoardIdReducer,
  addTaskReducer,
  addColumnReducer,
  addBoardReducer,
  editBoardReducer
);

export const useBoard = () => {
  const { dispatch, state } = useGlobalState();
  const { currentBoardId } = state;

  const currentBoard = dataJson.data.find(
    (board) => board.id === currentBoardId
  );

  return {
    setBoardId: (id) => dispatch(setCurrentBoardId(id)),
    currentBoardId,
    currentBoard,
    addTask: (newTask) => dispatch(addTask(newTask)),
    addColumn: (newColumn) => dispatch(addColumn(newColumn)),
    addBoard: (newBoard) => dispatch(addBoard(newBoard)),
    editBoard: (editedBoard) => dispatch(editBoard(editedBoard)),
  };
};
