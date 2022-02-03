import { useState } from "react";
import Square from "../components/Square";
import startingPositions from "../scripts/starting-positions";

import "./Chessboard.css";

const Chessboard: React.FC = () => {
  const [selectedFigure, setSelectedFigure] = useState<number | null>(null);
  const [positions, setPositions] = useState(startingPositions);
  const [activePlayer, setActivePlayer] = useState<"white" | "black">("white");

  const moveHandler = (figureID: number, squareID: number) => {
    setPositions((prevPositions) => {
      const newPositions = { ...prevPositions };
      newPositions[squareID] = newPositions[figureID];
      delete newPositions[figureID];
      return newPositions;
    });
    setSelectedFigure(null);
    setActivePlayer((prevValue) => {
      if (prevValue === "white") return "black";
      return "white";
    });
  };

  const squareClickHandler = (selectedSquare: number) => {
    if (selectedFigure !== null) {
      if (
        positions[selectedSquare] &&
        positions[selectedFigure][1] === positions[selectedSquare][1]
      ) {
        console.log("Invalid move!");
        setSelectedFigure(null);
        return;
      }
      moveHandler(selectedFigure, selectedSquare);
      return;
    }
    if (
      positions[selectedSquare] &&
      activePlayer === positions[selectedSquare][1]
    ) {
      setSelectedFigure(selectedSquare);
    }
  };

  const renderChessboard = () => {
    const grid: JSX.Element[] = [];
    let squareID = 0;
    for (let i = 0; i < 71; i++) {
      squareID++;
      while ([8, 17, 26, 35, 44, 53, 62].includes(i)) i++;
      grid.push(
        <Square
          color={i % 2 === 0 ? "#b5915f" : "#441a03"}
          key={squareID}
          id={squareID}
          figure={positions[squareID] ? positions[squareID][0] : undefined}
          onClick={squareClickHandler}
          selectedSquare={selectedFigure}
        ></Square>
      );
    }
    return grid;
  };

  return <div className="chessboard">{renderChessboard()}</div>;
};

export default Chessboard;
