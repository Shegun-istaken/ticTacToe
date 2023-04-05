const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 3, 6],
];

function checkWin(board) {
  let winResult = false;
  let winningIndex;
  win.forEach((element) => {
    const values = [board[element[0]], board[element[1]], board[element[2]]];
    if (values.every((val) => val === "X")) {
      winResult = "X";
      winningIndex = [...element];
    } else if (values.every((val) => val === "O")) {
      winResult = "O";
      winningIndex = [...element];
    }
  });

  return { winResult, winningIndex };
}

export default checkWin;
