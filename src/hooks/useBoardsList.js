import { useState } from "react";
import dataJson from "../data.json";
import { useGlobalState } from "../StateContext";

export const useBoardsList = () => {
  const { dispatch, state } = useGlobalState();
  const { data } = state;

  const boardList = data.map((board) => ({
    id: board.id,
    name: board.name,
  }));
  return [boardList];
};
