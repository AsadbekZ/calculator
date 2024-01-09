import React from "react";

const Numbers = ({ handleNumberClick }) => {
  const numbers = ["0", ".", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  numbers.reverse();
  return (
    <div className="numbers">
      {numbers.map((item) => (
        <div
          className="number"
          key={item}
          onClick={() => handleNumberClick(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Numbers;
