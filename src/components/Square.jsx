export default function Square({ handleClick, board, value, boxID, pattern }) {
  return (
    <div
      id={boxID}
      board={board}
      onClick={handleClick}
      className={`square ${pattern?.includes(boxID) && "win"} `}
    >
      {board[boxID] !== 0 && board[boxID]}
    </div>
  );
}
