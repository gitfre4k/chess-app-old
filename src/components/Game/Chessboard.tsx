import { useState, useEffect } from "react";

import Square from "./Square";
import { algebraicNotation, xyNotation } from "../../config/square-notation";
import startingPositions from "../../config/starting-positions";
import { figureColor } from "../../scripts/figureInfo";
import isMoveValid from "../../scripts/move-validity/isMoveValid";
import checkForEnPassant from "../../scripts/move-validity/checkForEnPassant";

import "./Chessboard.css";

const Chessboard: React.FC = () => {
  const [positions, setPositions] = useState(startingPositions);
  const [activePlayer, setActivePlayer] = useState<"white" | "black">("white");
  const [selectedFigure, setSelectedFigure] = useState<[number, number] | undefined>(undefined);
  const [validMoves, setValidMoves] = useState<string[]>([]);
  const [enPassantMoves, setEnPassantMoves] = useState<{
    white: [string[], string] | undefined;
    black: [string[], string] | undefined;
  }>({ white: undefined, black: undefined });
  const [check, setCheck] = useState({ white: false, black: false });

  useEffect(() => {
    setEnPassantMoves((prevValue) => {
      const newValue = { ...prevValue };
      activePlayer === "white" ? (newValue.black = undefined) : (newValue.white = undefined);
      return newValue;
    });
  }, [activePlayer]);

  const squareClickHandler = (x: number, y: number) => {
    if (
      !selectedFigure &&
      positions[`${x}${y}`] &&
      activePlayer === figureColor(positions[`${x}${y}`])
    ) {
      setSelectedFigure([x, y]);
      let newValidMoves: string[] = [];
      for (const [key] of Object.entries(positions)) {
        isMoveValid([`${x}${y}`, `${key}`], positions, enPassantMoves) && newValidMoves.push(key);
      }
      setValidMoves(newValidMoves);
      return;
    }
    if (selectedFigure) {
      if (activePlayer === figureColor(positions[`${x}${y}`])) {
        setSelectedFigure(undefined);
        setValidMoves([]);
        return;
      }
      const moveInfo = [`${selectedFigure[0]}${selectedFigure[1]}`, `${x}${y}`];
      if (isMoveValid(moveInfo, positions, enPassantMoves, setPositions)) {
        setPositions((prevPositions) => {
          const newPositions = { ...prevPositions };
          newPositions[moveInfo[1]] = newPositions[moveInfo[0]];
          newPositions[moveInfo[0]] = undefined;
          return newPositions;
        });
        checkForEnPassant(moveInfo, positions, setEnPassantMoves);
        setActivePlayer((prevValue) => {
          if (prevValue === "white") return "black";
          return "white";
        });
      }
      setSelectedFigure(undefined);
      setValidMoves([]);
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
          validMoves={validMoves}
        ></Square>
      );
    });
    return chessboard;
  };

  return <div className="chessboard">{renderChessboard()}</div>;
};

export default Chessboard;
