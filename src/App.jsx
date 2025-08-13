import React, { useState } from "react";
import "./index.css";

function Square({ value, onClick, highlight }) {
  return (
    <button
      className={`square ${highlight ? "win" : ""}`}
      onClick={onClick}
      aria-label={value ? `Square ${value}` : "Empty square"}
    >
      {value}
    </button>
  );
}

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const winnerInfo = calculateWinner(currentSquares);
  const winner = winnerInfo?.winner ?? null;
  const winningLine = winnerInfo?.line ?? [];

  function handleSquareClick(i) {
    if (currentSquares[i] || winner) return;
    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const moves = history.map((_, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button
          className={`move-btn ${move === currentMove ? "active" : ""}`}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  const status = winner
    ? `🎉 Winner: ${winner}`
    : currentSquares.every(Boolean)
    ? "🤝 It's a draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="app-root">
      <div className="game">
        <header>
          <h1 className="title">Tic Tac Toe</h1>
          <div className="subtitle">React + Vite — Neon Edition</div>
        </header>

        <section className="board-card">
          <div className="board" role="grid" aria-label="Tic Tac Toe board">
            {currentSquares.map((v, i) => (
              <Square
                key={i}
                value={v}
                onClick={() => handleSquareClick(i)}
                highlight={winningLine.includes(i)}
              />
            ))}
          </div>

          <div className="status">{status}</div>

          <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
            <button className="reset-btn" onClick={resetGame}>
              🔄 Restart Game
            </button>
            <button
              className="reset-btn"
              onClick={() => {
                // small convenience: fill random for quick testing (optional)
                const letters = ["X", "O"];
                const filled = Array(9)
                  .fill(null)
                  .map(() => (Math.random() > 0.6 ? letters[Math.floor(Math.random() * 2)] : null));
                setHistory([filled]);
                setCurrentMove(0);
              }}
              title="Fill random (testing)"
            >
              ✨ Random (test)
            </button>
          </div>

          {winner && <div className="winner-banner">🎉 {winner} wins!</div>}
        </section>

        <aside className="info-card">
          <h2>Moves</h2>
          <ol className="moves-list">{moves}</ol>
        </aside>

        <footer className="app-footer">Built for your class — customize as you like</footer>
      </div>
    </div>
  );
}

/* returns {winner: 'X'|'O', line: [i,i,i]} or null */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return null;
}
