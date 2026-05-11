// src/App.jsx

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState([]);
  const [draw, setDraw] = useState(false);

  const [scores, setScores] = useState({
    X: 0,
    O: 0,
    Draws: 0,
  });

  const currentPlayer = isXTurn ? "X" : "O";

  useEffect(() => {
    checkWinner();
  }, [board]);

  const checkWinner = () => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;

      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        setWinner(board[a]);
        setWinningCells(combo);

        setScores((prev) => ({
          ...prev,
          [board[a]]: prev[board[a]] + 1,
        }));

        return;
      }
    }

    if (board.every((cell) => cell !== null)) {
      setDraw(true);

      setScores((prev) => ({
        ...prev,
        Draws: prev.Draws + 1,
      }));
    }
  };

  const handleClick = (index) => {
    if (board[index] || winner || draw) return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;

    setBoard(updatedBoard);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setDraw(false);
    setWinningCells([]);
    setIsXTurn(true);
  };

  const resetScores = () => {
    setScores({
      X: 0,
      O: 0,
      Draws: 0,
    });

    resetGame();
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-cyan-900/20" />

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-indigo-500 text-transparent bg-clip-text">
            Tic Tac Toe
          </h1>

          <p className="text-gray-400 mt-3">
            Modern React Game Experience
          </p>
        </div>

        {/* Scoreboard */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4 text-center">
            <h2 className="text-cyan-400 font-bold text-lg">X</h2>
            <p className="text-3xl font-black">{scores.X}</p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4 text-center">
            <h2 className="text-yellow-400 font-bold text-lg">Draws</h2>
            <p className="text-3xl font-black">{scores.Draws}</p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4 text-center">
            <h2 className="text-pink-400 font-bold text-lg">O</h2>
            <p className="text-3xl font-black">{scores.O}</p>
          </div>
        </div>

        {/* Status */}
        <AnimatePresence mode="wait">
          {!winner && !draw && (
            <motion.div
              key={currentPlayer}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center mb-6"
            >
              <p className="text-lg text-gray-300">
                Current Turn:
              </p>

              <span
                className={`text-3xl font-black ${
                  currentPlayer === "X"
                    ? "text-cyan-400"
                    : "text-pink-400"
                }`}
              >
                {currentPlayer}
              </span>
            </motion.div>
          )}

          {winner && (
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center mb-6"
            >
              <h2 className="text-4xl font-black text-green-400">
                {winner} Wins!
              </h2>
            </motion.div>
          )}

          {draw && (
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center mb-6"
            >
              <h2 className="text-4xl font-black text-yellow-400">
                It's a Draw!
              </h2>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {board.map((cell, index) => {
            const isWinningCell = winningCells.includes(index);

            return (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                key={index}
                onClick={() => handleClick(index)}
                className={`
                  h-28 rounded-3xl text-5xl font-black
                  flex items-center justify-center
                  border transition-all duration-300
                  backdrop-blur-xl

                  ${
                    isWinningCell
                      ? "bg-green-500/20 border-green-400 shadow-[0_0_25px_rgba(34,197,94,0.6)]"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }

                  ${
                    cell === "X"
                      ? "text-cyan-400"
                      : "text-pink-400"
                  }
                `}
              >
                {cell}
              </motion.button>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="flex-1 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 transition"
          >
            Reset Game
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetScores}
            className="flex-1 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition"
          >
            Reset Scores
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
