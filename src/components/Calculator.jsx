import React from "react";
import { useDrag } from "react-dnd";

const DraggableBox = ({ children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "box",
    item: { type: "box" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return <div ref={drag}>{children}</div>;
};

const Calculator = () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const symbols = ["/", "x", "-", "+"];
  const [currentValue, setCurrentValue] = React.useState(null);
  const [pendingOperation, setPendingOperation] = React.useState(null);
  const [displayValue, setDisplayValue] = React.useState("0");

  const handleNumberClick = (num) => {
    if (num === "." && displayValue.includes(".")) {
      // To prevent multiple decimal points
      return;
    }

    setDisplayValue((prevValue) => {
      // To handle the case when 0 is displayed or an operation was just performed
      if (prevValue === "0" || pendingOperation) {
        return num === "." ? "0." : String(num);
      } else {
        return prevValue + String(num);
      }
    });
  };

  const calculate = () => {
    const nextValue = parseFloat(displayValue);
    const parsedCurrentValue = parseFloat(currentValue);
  
    if (!isNaN(parsedCurrentValue) && !isNaN(nextValue)) {
      let result = 0;
      switch (pendingOperation) {
        case "+":
          result = parsedCurrentValue + nextValue;
          break;
        case "-":
          result = parsedCurrentValue - nextValue;
          break;
        case "x":
          result = parsedCurrentValue * nextValue;
          break;
        case "/":
          result = parsedCurrentValue / nextValue;
          break;
        default:
          return;
      }
      setCurrentValue(result);
      setDisplayValue(String(result));
    }
  };

  const handleOperationClick = (operation) => {
    if (currentValue === null) {
      setCurrentValue(parseFloat(displayValue));
    } else {
      calculate();
    }
    setPendingOperation(operation);
    setDisplayValue("");
  };

  const handleEqualClick = () => {
    calculate();
    setCurrentValue(null);
    setPendingOperation(null);
  };

  return (
    <div className="calculator">
      <DraggableBox>
        <div className="box">
          <div
            className="result"
            style={{ fontSize: displayValue.length > 9 ? "20px" : "32px" }}
          >
            {displayValue}
          </div>
        </div>
      </DraggableBox>
      <DraggableBox>
        <div className="box">
          <ul className="symbols">
            {symbols.map((symbol, index) => (
              <li
                key={index}
                className="symbol"
                onClick={() => handleOperationClick(symbol)}
              >
                {symbol}
              </li>
            ))}
          </ul>
        </div>
      </DraggableBox>
      <DraggableBox>
        <div className="box">
          <ul className="numbers">
            {[...numbers, "."].map((num, index) => (
              <li
                key={index}
                className="number"
                onClick={() => handleNumberClick(num)}
              >
                {num}
              </li>
            ))}
          </ul>
        </div>
      </DraggableBox>
      <DraggableBox>
        <div className="box">
          <div className="equal" onClick={handleEqualClick}>
            =
          </div>
        </div>
      </DraggableBox>
    </div>
  );
};

export default Calculator;
