import { useBoardsList } from "../hooks/useBoardsList";
import { useBoard } from "../logic-containers/boardReducer";
// Next steps:
// Create a useQuery hook that takes a function that returns a promise
// the function should perform data fetching and resolve with the result, or reject if an error occured
// e.g. queryFn

export const Sidebar = (props) => {
  const [boardsList, updateBoardsList] = useBoardsList();
  const { currentBoardId, setBoardId } = useBoard();

  return (
    <div>
      <header>KANBAN</header>
      <p>ALL BOARDS({boardsList.length})</p>
      {boardsList.map((board) => {
        return <div onClick={() => setBoardId(board.id)}>{board.name}</div>;
      })}
    </div>
  );
};
