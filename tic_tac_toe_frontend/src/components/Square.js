import React from 'react';

const Square = ({ value, onClick }) => (
  <button 
    className="game-square" 
    onClick={onClick}
    disabled={value !== null}
  >
    {value}
  </button>
);

export default Square;
