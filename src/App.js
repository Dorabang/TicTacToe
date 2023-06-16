import React, { useState } from 'react';
import Board from './components/Board';
import './App.css';

function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const calculatorWinner = (squares) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const current = history[stepNumber];

  const winner = calculatorWinner(current.squares);

  let status;
  if (winner) {
    status = 'Winner : ' + winner;
  } else {
    status = `Next player : ${xIsNext ? 'X' : 'O'}`;
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const selectedSquare = newCurrent.squares.slice();
    if (calculatorWinner(selectedSquare) || selectedSquare[i]) {
      return;
    }

    selectedSquare[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, { squares: selectedSquare }]);
    setXIsNext((current) => !current);

    setStepNumber(newHistory.length);
  };

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button className='move-button' onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0); // 해당 히스토리로 넘어갔을 때, 다음 플레이어가 누구인지 알려주기 위해
  };

  return (
    <div className='game'>
      <div className='game-board'>
        <Board squares={current.squares} handleClick={(i) => handleClick(i)} />
      </div>
      <div className='game-info'>
        <h2 className='status'>{status}</h2>
        <ul>{moves}</ul>
      </div>
    </div>
  );
}

export default App;
