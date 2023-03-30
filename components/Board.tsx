import React, { useState } from "react";

import Cell from "./Cell";

function Board() {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function handleClick(index: number) {
    // check if the cell is already filled or if there is a winner
    if (cells[index] || winner) {
      return;
    }

    // create a new array with the updated cell value
    const newCells = [...cells];
    newCells[index] = xIsNext ? "X" : "O";
    setCells(newCells);

    // check for a winner
    const newWinner = checkWinner(newCells);
    if (newWinner) {
      setWinner(newWinner);
      setShowModal(true);
    }

    // switch to the other player
    setXIsNext(!xIsNext);
  }

  function checkWinner(cells) {
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

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }

    return null;
  }

  function renderCell(index: number) {
    return (
      <Cell
        key={index}
        value={cells[index]}
        onClick={() => handleClick(index)}
      />
    );
  }

  function renderStatus() {
    if (winner) {
      return (
        <p className="text-xl font-bold text-green-500">Winner: {winner}</p>
      );
    } else if (!cells.includes(null)) {
      return <p className="text-xl font-bold">Draw</p>;
    } else {
      return (
        <p className="text-xl font-bold">Next player: {xIsNext ? "X" : "O"}</p>
      );
    }
  }

  function closeModal() {
    setCells(Array(9).fill(null));
    setWinner(null);
    setShowModal(false);
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-4xl font-bold mb-4">Tic-Tac-Toe</h1>
      <div className="grid grid-cols-3 gap-4">
        {renderCell(0)}
        {renderCell(1)}
        {renderCell(2)}
        {renderCell(3)}
        {renderCell(4)}
        {renderCell(5)}
        {renderCell(6)}
        {renderCell(7)}
        {renderCell(8)}
      </div>
      <div className="mt-4">
        {renderStatus()}
        {showModal && (
          <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-md">
              <p className="text-3xl font-bold text-green-500 mb-4">
                🎉 Congratulations {winner}! 🎉
              </p>
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                onClick={closeModal}
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Board;
