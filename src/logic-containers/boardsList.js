import { createActionAndReducer, combineReducers } from "./utils";

const [updateBoardsList, updateBoardsListReducer] = createActionAndReducer(
  "boardsList/update",
  (state, payload) => {
    console.log("Fly");
    let projectsArray = [...state.boardsList];

    payload.forEach((record) => {
      projectsArray.push(record.fields.Projects);
    });

    let boards = [...new Set(projectsArray)];

    return {
      ...state,
      boardsList: boards,
    };
  }
);

export const boardsListReducer = combineReducers(updateBoardsListReducer);

// updateBoardsList is invoked
// it updates boardList
// this hook is called again
// a new function called updateBoardsList is created
// if updateBoardsList is part of a useEffects dep array
// the effect re-runs
// the effect calls updateBoardsList
// LOOP

// export const useBoardsList = () => {
//   const { dispatch, state } = useGlobalState();
//   const { boardsList } = state;

//   return {
//     updateBoardsList: (boardsListRaw) =>
//       dispatch(updateBoardsList(boardsListRaw)),
//     boardsList,
//   };
// };
