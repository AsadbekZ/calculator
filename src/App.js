import React, { useState } from "react";
import Equal from "./components/Equal";
import Numbers from "./components/Numbers";
import Result from "./components/Result";
import Symbols from "./components/Symbols";

function App() {
  // ! calculator


  // !

  const [currentValue, setCurrentValue] = React.useState(null);
  const [pendingOperation, setPendingOperation] = React.useState(null);
  const [displayValue, setDisplayValue] = React.useState("0");

  const handleNumberClick = (num) => {
    if (num === "." && displayValue.includes(".")) {
      return;
    }

    setDisplayValue((prevValue) => {
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
      console.log(result);
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

  // !



  const [boards, setBoards] = useState([
    {
      id: 1,
      items: [
        { id: 1, title: (<Result displayValue={displayValue} />) },
        {
          id: 2,
          title: <Symbols handleOperationClick={handleOperationClick} />,
        },
        { id: 3, title: <Numbers handleNumberClick={handleNumberClick} /> },
        { id: 4, title: <Equal handleEqualClick={handleEqualClick} /> },
      ],
    },
    { id: 2, items: [] },
  ]);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  // ! drag and drop
  function dragOverHandler(e) {
    e.preventDefault();
    if (e.target.className == "item") {
      e.target.style.boxShadow = "0 4px 3px gray";
    }
  }

  function dragLeaveHandler(e) {
    e.target.style.boxShadow = "none";
  }

  function dragStartHandler(e, board, item) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  function dragEndHandler(e) {
    e.target.style.boxShadow = "none";
  }

  function dropHandler(e, board, item) {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  }

  function dropCardHandler(e, board) {
    e.preventDefault();
    const droppedItemTitle = e.target.innerText;

    const currentIndex = currentBoard.items.findIndex(
      (item) => item === currentItem
    );
    const droppedIndex = currentBoard.items.findIndex(
      (item) => item.title === droppedItemTitle
    );

    if (currentIndex !== -1) {
      if (board.id !== currentBoard.id) {
        const updatedBoards = boards.map((b) => {
          if (b.id === currentBoard.id) {
            const updatedItems = currentBoard.items.filter(
              (item) => item !== currentItem
            );
            return { ...b, items: updatedItems };
          } else if (b.id === board.id) {
            const updatedItems = [...board.items, currentItem];
            return { ...b, items: updatedItems };
          }
          return b;
        });

        setBoards(updatedBoards);
      } else if (droppedIndex !== -1) {
        const updatedItems = [...currentBoard.items];
        [updatedItems[currentIndex], updatedItems[droppedIndex]] = [
          updatedItems[droppedIndex],
          updatedItems[currentIndex],
        ];

        const updatedBoards = boards.map((b) => {
          if (b.id === currentBoard.id) {
            return { ...b, items: updatedItems };
          }
          return b;
        });

        setBoards(updatedBoards);
      }
    }

    e.target.style.boxShadow = "none";
  }

  return (
    <div className="container">
      {boards.map((board) => (
        <div
          className="board"
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, board)}
        >
          {board.items.map((item) => (
            <div
              className="item"
              draggable={false}
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, board, item)}
            >
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
