import { useEffect, useState } from "react";

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
  const [draw, setDraw] = useState(false);
  const [winningCells, setWinningCells] = useState([]);

  const currentPlayer = isXTurn ? "X" : "O";

  useEffect(() => {
    checkWinner();
  }, [board]);

  const checkWinner = () => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setWinningCells(combo);
        return;
      }
    }

    if (board.every((cell) => cell !== null)) {
      setDraw(true);
    }
  };

  const handleClick = (index) => {
    if (board[index] || winner || draw) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setDraw(false);
    setWinningCells([]);
    setIsXTurn(true);
  };

  
 
  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "radial-gradient(circle at top, #1a1a1a, #000000)",
      color: "white",
      fontFamily: "Arial",
      position: "relative",
      overflow: "hidden",
    },
  
    box: {
      textAlign: "center",
      padding: "30px",
      borderRadius: "20px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      backdropFilter: "blur(12px)",
      boxShadow: "0 0 40px rgba(0,0,0,0.6)",
      zIndex: 2,
    },
  
    title: {
      fontSize: "45px",
      marginBottom: "10px",
      background: "linear-gradient(90deg, cyan, pink)",
      WebkitBackgroundClip: "text",
      color: "transparent",
      letterSpacing: "2px",
    },
  
    status: {
      marginBottom: "15px",
      fontSize: "18px",
      color: "#aaa",
    },
  
    board: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 110px)",
      gap: "12px",
      justifyContent: "center",
      marginBottom: "20px",
    },
  
    cell: {
      width: "110px",
      height: "110px",
      fontSize: "38px",
      fontWeight: "bold",
      cursor: "pointer",
      borderRadius: "18px",
      border: "1px solid rgba(255,255,255,0.15)",
      background: "rgba(255,255,255,0.04)",
      color: "white",
      transition: "all 0.25s ease",
      boxShadow: "0 0 0px rgba(0,0,0,0)",
    },
  
    button: {
      padding: "12px 25px",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      background: "linear-gradient(90deg, cyan, blue)",
      fontWeight: "bold",
      color: "black",
      transition: "0.3s",
      boxShadow: "0 5px 20px rgba(0,255,255,0.2)",
    },
  
    win: {
      color: "lightgreen",
      fontSize: "24px",
      marginBottom: "10px",
      textShadow: "0 0 10px rgba(0,255,0,0.5)",
    },
  
    draw: {
      color: "yellow",
      fontSize: "24px",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>Tic Tac Toe</h1>

        {!winner && !draw && (
          <div style={styles.status}>
            Current Turn: <b>{currentPlayer}</b>
          </div>
        )}

        {winner && <div style={styles.win}>{winner} Wins 🎉</div>}
        {draw && <div style={styles.draw}>It's a Draw 🤝</div>}

        <div style={styles.board}>
          {board.map((cell, index) => {
            const isWin = winningCells.includes(index);

            return (
              <button
                key={index}
                onClick={() => handleClick(index)}
                style={{
                  ...styles.cell,
                  background: isWin
                    ? "rgba(0,255,0,0.2)"
                    : "rgba(255,255,255,0.05)",
                  color:
                    cell === "X"
                      ? "cyan"
                      : cell === "O"
                      ? "pink"
                      : "white",
                }}
              >
                {cell}
              </button>
            );
          })}
        </div>

        <button style={styles.button} onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
}
