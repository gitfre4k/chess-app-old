import { useState } from "react";

import Square from "./Square";
import { algebraicNotation, xyNotation } from "../../config/square-notation";
import startingPositions from "../../config/starting-positions";
import figureColor from "../../scripts/figureColor";
import isMoveValid from "../../scripts/move-validity/isMoveValid";
import updatePositions from "../../scripts/updatePositions";

import "./Chessboard.css";

const Chessboard: React.FC = () => {
  const [positions, setPositions] = useState(startingPositions);
  const [activePlayer, setActivePlayer] = useState<"white" | "black">("white");
  const [selectedFigure, setSelectedFigure] = useState<[number, number] | undefined>(undefined);
  const [desiredPosition, setDesiredPosition] = useState<[number, number] | undefined>(undefined);

  const squareClickHandler = (x: number, y: number) => {
    if (
      !selectedFigure &&
      positions[`${x}${y}`] &&
      activePlayer === figureColor(positions[`${x}${y}`])
    ) {
      setSelectedFigure([x, y]);
      return;
    }
    if (activePlayer !== figureColor(positions[`${x}${y}`])) {
      setDesiredPosition([x, y]);
      isMoveValid() ? updatePositions() : setSelectedFigure(undefined);
    }
  };

  const renderChessboard = () => {
    const chessboard: JSX.Element[] = [];
    xyNotation.map((square, index) => {
      chessboard.push(
        <Square
          key={algebraicNotation[index]}
          x={square[0]}
          y={square[1]}
          color={(square[0] + square[1]) % 2 === 0 ? "#441a03" : "#b5915f"}
          notation={algebraicNotation[index]}
          figure={positions[`${square[0]}${square[1]}`]}
          onClick={squareClickHandler}
          selectedFigure={selectedFigure}
        ></Square>
      );
    });
    return chessboard;
  };

  return <div className="chessboard">{renderChessboard()}</div>;
};

export default Chessboard;
