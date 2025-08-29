import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import GameControls from './components/GameControls';
import { calculateWinner, isDraw, getComputerMove } from './utils/gameLogic';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isVsComputer, setIsVsComputer] = useState(false);

  const winner = calculateWinner(squares);
  const gameIsDraw = isDraw(squares);

  useEffect(() => {
    // Computer's turn
    if (isVsComputer && !xIsNext && !winner && !gameIsDraw) {
      const timer = setTimeout(() => {
        const computerMove = getComputerMove(squares);
        if (computerMove !== -1) {
          handleClick(computerMove);
        }
      }, 500); // Add slight delay for better UX
      return () => clearTimeout(timer);
    }
  }, [isVsComputer, xIsNext, squares, winner, gameIsDraw]);

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const getStatus = () => {
    if (winner) {
      return <div className="game-status winner">Winner: {winner}</div>;
    } else if (gameIsDraw) {
      return <div className="game-status draw">Game Draw!</div>;
    } else {
      return (
        <div className="game-status">
          {isVsComputer && !xIsNext ? '🤖 Computer thinking...' : `Next player: ${xIsNext ? 'X' : 'O'}`}
        </div>
      );
    }
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const handleModeChange = () => {
    setIsVsComputer(!isVsComputer);
    handleReset();
  };

  return (
    <div className="App">
      <div className="game-container">
        <h1 className="game-title">Tic Tac Toe</h1>
        {getStatus()}
        <Board squares={squares} onClick={handleClick} />
        <GameControls
          onReset={handleReset}
          onModeChange={handleModeChange}
          isVsComputer={isVsComputer}
        />
      </div>
    </div>
  );
}

export default App;
