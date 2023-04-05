import Square from "./Square.jsx";
import { useState, useEffect } from "react";
import checkWin from "../win.js";

export default function Board() {
  const [board, setBoard] = useState(Array(9).fill(0));
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(false);
  const [winningNo, setWinningNo] = useState();
  const [full, setFull] = useState(false);
  const [toggleOrder, setToggleOrder] = useState(false);

  useEffect(() => {
    if (board.some((each) => each !== 0)) {
      setHistory([...history, board]);
    }
    const { winResult, winningIndex } = checkWin(board);
    setResult(winResult);
    setWinningNo(winningIndex);

    if (board.every((each) => each !== 0)) {
      setFull(true);
    } else {
      setFull(false);
    }
  }, [board]);

  useEffect(() => {
    if (result) {
      setFull(false);
    }
  }, [result]);

  function restart() {
    setBoard(Array(9).fill(0)), setHistory([]);
  }

  function handleHistory(number) {
    setBoard([...history[number]]);
    setHistory((prev) => history.slice(0, number));
  }

  function squareClick(event) {
    const indexNo = parseInt(event.target.id);
    if (board[indexNo] == 0 && result == false) {
      let value;
      if (history.length % 2 == 0) {
        value = "X";
      } else {
        value = "O";
      }
      const updatedBoard = [...board];
      updatedBoard[indexNo] = value;
      setBoard(updatedBoard);
    }
  }

  function rearrange() {
    setToggleOrder(!toggleOrder);
  }

  return (
    <div className="main">
      <main className="board">
        {Array(9)
          .fill()
          .map((item, index) => (
            <Square
              key={index}
              boxID={index}
              board={board}
              handleClick={squareClick}
              pattern={winningNo}
            ></Square>
          ))}
      </main>
      <div className="results">
        <div className={` history ${toggleOrder && "descending"}`}>
          <button onClick={restart}>Go to Game Start</button>
          {history.map((item, index) =>
            index < history?.length - 1 ? (
              <button key={index} onClick={() => handleHistory(index)}>
                {`Move #${index + 1}`}
              </button>
            ) : (
              <p>You are on {`Move #${index + 1}`} </p>
            )
          )}
        </div>
        <button className="toggle" onClick={rearrange}>
          Rearrange Order
        </button>
        <div>
          {result == "X" && <h2>X Wins</h2>}
          {result == "O" && <h2>O Wins</h2>}
          {full && <h2>Draw</h2>}
          {result != false || full ? <button onClick={restart}>Restart Game</button>: null}
        </div>
      </div>
    </div>
  );
}
