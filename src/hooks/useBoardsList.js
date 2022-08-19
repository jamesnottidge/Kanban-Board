import { useState } from "react";
import dataJson from "../data.json";

console.log("Dera");

const updateBoardsList = 1;
export const useBoardsList = () => {
  const boardList = dataJson.data.map((board) => ({
    id: board.id,
    name: board.name,
  }));
  return [boardList, updateBoardsList];
};
