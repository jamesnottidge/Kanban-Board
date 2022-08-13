import { useGlobalState } from "../StateContext";
import { combineReducers, createActionAndReducer } from "./utils";
import dataJson from "../data.json";
const [setCurrentBoardId, currentBoardIdReducer] = createActionAndReducer(
  "board/setcurrentBoardId",
  (state, payload) => {
    const currentBoard = dataJson.data.filter((board) => board.id === payload);
    return {
      ...state,
      currentBoardId: payload,
      currentBoard: currentBoard[0],
    };
  }
);

export const boardReducer = combineReducers(currentBoardIdReducer);

export const useBoard = () => {
  const { dispatch, state } = useGlobalState();
  const { currentBoardId, currentBoard } = state;

  return {
    setBoardId: (id) => dispatch(setCurrentBoardId(id)),
    currentBoardId,
    currentBoard,
  };
};
