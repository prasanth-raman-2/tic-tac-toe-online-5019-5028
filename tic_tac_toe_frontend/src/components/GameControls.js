import React from 'react';

const GameControls = ({ onReset, onModeChange, isVsComputer }) => (
  <div className="game-controls">
    <button className="control-btn mode-btn" onClick={onModeChange}>
      {isVsComputer ? '🤖 vs Player' : '👥 vs Player'}
    </button>
    <button className="control-btn reset-btn" onClick={onReset}>
      🔄 New Game
    </button>
  </div>
);

export default GameControls;
