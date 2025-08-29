// Calculate winner by checking all possible winning combinations
export const calculateWinner = (squares) => {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

// Check if game is a draw
export const isDraw = (squares) => {
  return squares.every(square => square !== null);
};

// Simple AI: Find best available move
export const getComputerMove = (squares) => {
  // Try to win
  const winningMove = findWinningMove(squares, 'O');
  if (winningMove !== -1) return winningMove;

  // Block player from winning
  const blockingMove = findWinningMove(squares, 'X');
  if (blockingMove !== -1) return blockingMove;

  // Take center if available
  if (squares[4] === null) return 4;

  // Take any available corner
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => squares[i] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // Take any available side
  const sides = [1, 3, 5, 7];
  const availableSides = sides.filter(i => squares[i] === null);
  if (availableSides.length > 0) {
    return availableSides[Math.floor(Math.random() * availableSides.length)];
  }

  return -1;
};

// Helper function to find winning move for a player
const findWinningMove = (squares, player) => {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    const squares_copy = [...squares];
    if (squares_copy[a] === player && squares_copy[b] === player && squares_copy[c] === null) return c;
    if (squares_copy[a] === player && squares_copy[c] === player && squares_copy[b] === null) return b;
    if (squares_copy[b] === player && squares_copy[c] === player && squares_copy[a] === null) return a;
  }
  return -1;
};
