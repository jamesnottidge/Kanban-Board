import dataJson from "../data.json";

const boardList = dataJson.data.map((board) => ({
  id: board.id,
  name: board.name,
}));

const updateBoardsList = 1;
export const useBoardsList = () => {
  return [boardList, updateBoardsList];
};
