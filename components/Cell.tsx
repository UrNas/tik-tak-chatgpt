import React from "react";

function Cell({ value, onClick, key }) {
  return (
    <button
      key={key}
      className="bg-white border border-gray-300 p-4 font-bold text-3xl w-[100px] h-[100px]"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Cell;
