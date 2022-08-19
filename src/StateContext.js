import { createContext, useContext, useReducer } from "react";

const StateContext = createContext();

const initializer = () => ({
  boardsList: [],
  requestState: {
    inFlight: false,
    error: null,
  },
  currentBoardId: 0,
});

export const StateProvider = ({ children, reducer }) => {
  const [state, dispatch] = useReducer(reducer, undefined, initializer);

  const stateManager = {
    state,
    dispatch,
  };

  return (
    <StateContext.Provider value={stateManager}>
      {children}
    </StateContext.Provider>
  );
};

export const useGlobalState = () => useContext(StateContext);
