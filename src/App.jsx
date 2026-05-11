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
  <div className="relative min-h-screen overflow-hidden bg-[#050505] flex items-center justify-center px-4 py-10">

    {/* Background */}
    <div className="absolute inset-0">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.12),transparent_28%)]" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.08),transparent_30%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>

    {/* Ambient Glow */}
    <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-violet-500/10 blur-[140px] rounded-full" />
    <div className="absolute bottom-[-120px] right-[-120px] w-[340px] h-[340px] bg-cyan-500/10 blur-[150px] rounded-full" />

    {/* Main Wrapper */}
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative z-10 w-full max-w-6xl"
    >

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">

        <div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white">
            Tic Tac Toe
          </h1>

          <p className="mt-3 text-xs uppercase tracking-[0.35em] text-zinc-500">
            
          </p>
        </div>

        {!winner && !draw && (
          <motion.div
            key={currentPlayer}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="
              mt-6 md:mt-0
              flex items-center gap-4
              px-5 py-4
              rounded-2xl
              border border-white/5
              bg-white/[0.03]
              backdrop-blur-xl
            "
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                Current Turn
              </p>

              <h3 className="text-lg font-semibold text-white mt-1">
                Player {currentPlayer}
              </h3>
            </div>

            <div
              className={`
                w-14 h-14 rounded-2xl
                flex items-center justify-center
                text-2xl font-black

                ${
                  currentPlayer === "X"
                    ? "bg-violet-500/10 text-violet-300 border border-violet-400/15"
                    : "bg-cyan-500/10 text-cyan-300 border border-cyan-400/15"
                }
              `}
            >
              {currentPlayer}
            </div>
          </motion.div>
        )}
      </div>

      {/* Main Card */}
      <div
        className="
          rounded-[36px]
          overflow-hidden
          border border-white/5
          bg-[#0a0a0a]/90
          backdrop-blur-2xl
          shadow-[0_30px_120px_rgba(0,0,0,0.75)]
        "
      >

        <div className="grid lg:grid-cols-[320px_1fr]">

          {/* Sidebar */}
          <div className="border-r border-white/5 p-8 bg-white/[0.02]">

            {/* Scores */}
            <div className="space-y-4">

              {/* X */}
              <motion.div
                whileHover={{ y: -3 }}
                className="
                  rounded-3xl
                  border border-violet-400/10
                  bg-violet-500/[0.05]
                  p-5
                "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-violet-400">
                      Player X
                    </p>

                    <h2 className="text-5xl font-black mt-2 text-white">
                      {scores.X}
                    </h2>
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-400/10 flex items-center justify-center">
                    <span className="text-3xl font-black text-violet-300">
                      X
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* O */}
              <motion.div
                whileHover={{ y: -3 }}
                className="
                  rounded-3xl
                  border border-cyan-400/10
                  bg-cyan-500/[0.05]
                  p-5
                "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
                      Player O
                    </p>

                    <h2 className="text-5xl font-black mt-2 text-white">
                      {scores.O}
                    </h2>
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/10 flex items-center justify-center">
                    <span className="text-3xl font-black text-cyan-300">
                      O
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Draws */}
              <div
                className="
                  rounded-3xl
                  border border-white/5
                  bg-white/[0.03]
                  p-5
                "
              >
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                  Draws
                </p>

                <h2 className="text-5xl font-black mt-2 text-white">
                  {scores.Draws}
                </h2>
              </div>
            </div>

            {/* Match Status */}
            <div className="mt-8">

              <AnimatePresence mode="wait">

                {winner && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`
                      rounded-3xl
                      p-6
                      border

                      ${
                        winner === "X"
                          ? "border-violet-400/15 bg-violet-500/[0.06]"
                          : "border-cyan-400/15 bg-cyan-500/[0.06]"
                      }
                    `}
                  >
                    <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-2">
                      Match Result
                    </p>

                    <h2 className="text-4xl font-black text-white">
                      {winner} Wins
                    </h2>
                  </motion.div>
                )}

                {draw && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="
                      rounded-3xl
                      border border-white/5
                      bg-white/[0.03]
                      p-6
                    "
                  >
                    <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-2">
                      Match Result
                    </p>

                    <h2 className="text-4xl font-black text-white">
                      Draw Match
                    </h2>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Buttons */}
            <div className="mt-8 space-y-4">

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={resetGame}
                className="
                  w-full
                  py-4
                  rounded-2xl

                  bg-gradient-to-r
                  from-violet-500
                  to-cyan-500

                  text-white
                  font-semibold
                  text-lg

                  hover:opacity-90

                  transition-all
                "
              >
                Start Over
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={resetScores}
                className="
                  w-full
                  py-4
                  rounded-2xl

                  border border-white/5
                  bg-white/[0.03]

                  text-white
                  font-semibold
                  text-lg

                  hover:bg-white/[0.05]

                  transition-all
                "
              >
                Reset Arena
              </motion.button>
            </div>
          </div>

         
          <div className="p-8 md:p-10 flex items-center justify-center">

            <div className="grid grid-cols-3 gap-5 w-full max-w-md">

              {board.map((cell, index) => {
                const isWinningCell =
                  winningCells.includes(index);

                return (
                  <motion.button
                    key={index}
                    whileHover={{
                      y: -4,
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    onClick={() => handleClick(index)}
                    className={`
                      relative
                      aspect-square
                      rounded-[30px]

                      flex
                      items-center
                      justify-center

                      overflow-hidden

                      border
                      transition-all
                      duration-300

                      ${
                        isWinningCell
                          ? winner === "X"
                            ? "border-violet-400/30 bg-violet-500/[0.12] shadow-[0_0_40px_rgba(139,92,246,0.18)]"
                            : "border-cyan-400/30 bg-cyan-500/[0.12] shadow-[0_0_40px_rgba(34,211,238,0.18)]"
                          : "border-white/5 bg-white/[0.03] hover:border-white/10"
                      }
                    `}
                  >

                    <div
                      className="
                        absolute
                        inset-0

                        opacity-0
                        hover:opacity-100

                        transition-opacity
                        duration-500

                        bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_70%)]
                      "
                    />

                    {/* Symbol */}
                    <motion.span
                      initial={{
                        scale: 0.5,
                        opacity: 0,
                      }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                      }}
                      className={`
                        relative
                        z-10

                        text-6xl
                        md:text-7xl
                        font-black

                        ${
                          cell === "X"
                            ? "text-violet-300"
                            : "text-cyan-300"
                        }
                      `}
                    >
                      {cell}
                    </motion.span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);
}