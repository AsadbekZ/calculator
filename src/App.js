import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Calculator from "./components/Calculator";
import Constructor from "./components/Constructor";
import "./sass/all.scss";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <Calculator />
        <Constructor />
      </div>
    </DndProvider>
  );
}

export default App;
