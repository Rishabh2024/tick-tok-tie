import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Card from "../card/Card";
import "./Grid.css";
import "react-toastify/dist/ReactToastify.css";

function isWinner(board, symbol) {
  if (board[0] == board[1] && board[1] == board[2] && board[0] == symbol)
    return symbol;
  if (board[3] == board[4] && board[4] == board[5] && board[3] == symbol)
    return symbol;
  if (board[6] == board[7] && board[7] == board[8] && board[6] == symbol)
    return symbol;

  if (board[0] == board[3] && board[3] == board[6] && board[0] == symbol)
    return symbol;
  if (board[1] == board[4] && board[4] == board[7] && board[1] == symbol)
    return symbol;
  if (board[2] == board[5] && board[5] == board[8] && board[2] == symbol)
    return symbol;

  if (board[0] == board[4] && board[4] == board[8] && board[0] == symbol)
    return symbol;
  if (board[2] == board[4] && board[4] == board[6] && board[2] == symbol)
    return symbol;

  return ""; // No winner
}

function Grid({ numberOfCards }) {
  const [turn, setTurn] = useState(true);
  const [board, setBoard] = useState(Array(numberOfCards).fill(""));
  const [winner, setWinner] = useState(null);

  function play(index) {
    console.log("move play", index);

    if (board[index] !== "" || winner) return; // Prevent playing in an occupied cell

    board[index] = turn ? "O" : "X";

    const win = isWinner(board, turn ? "O" : "X");
    if (win) {
      setWinner(win);
      toast.success(`Congratulations ${win} won the game`); // ✅ Fixed String Interpolation
    }

    setBoard([...board]);
    setTurn(!turn);
  }

  function reset() {
    setTurn(true);
    setBoard(Array(numberOfCards).fill(""));
    setWinner(null);
  }

  return (
    <div className="grid-container">
      <ToastContainer position="top-right" autoClose={3000} />{" "}
      {/* ✅ Moved Outside */}
      {winner && (
        <>
          <h1 className="winner-highlight">Winner is {winner}</h1>
          <button className="reset" onClick={reset}>
            Restart game
          </button>
        </>
      )}
      <h1 className="turn-highlight">Current turn: {turn ? "O" : "X"}</h1>
      <div className="grid">
        {board.map((value, idx) => (
          <Card onPlay={() => play(idx)} player={value} key={idx} index={idx} />
        ))}
      </div>
    </div>
  );
}

export default Grid;
