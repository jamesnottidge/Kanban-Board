import { useGlobalState } from "../StateContext";

export const useBoardsList = () => {
  const { state } = useGlobalState();
  const { data } = state;

  const boardList = data.map((board) => ({
    id: board.id,
    name: board.name,
  }));
  return [boardList];
};
