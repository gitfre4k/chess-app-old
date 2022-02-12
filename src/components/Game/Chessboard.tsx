import { useState, useEffect } from "react";

import Square from "./Square";
import { algebraicNotation, xyNotation } from "../../config/square-notation";
import startingPositions from "../../config/starting-positions";
import { figureColor } from "../../scripts/figureInfo";
import isMoveValid from "../../scripts/move-validity/isMoveValid";
import checkForEnPassant from "../../scripts/move-validity/checkForEnPassant";
import isKingSafe from "../../scripts/move-validity/isKingSafe";

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
    setCheck((prevValue) => {
      const newValue = { ...prevValue };
      newValue[activePlayer] = !isKingSafe(["CHECK", activePlayer], positions);
      activePlayer === "white" ? (newValue.black = false) : (newValue.white = false);
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
      const allValidMoves: string[] = [];
      for (const [key] of Object.entries(positions)) {
        const moveInfo = [`${x}${y}`, `${key}`];
        if (isMoveValid(moveInfo, positions, enPassantMoves) && isKingSafe(moveInfo, positions))
          allValidMoves.push(key);
      }
      setValidMoves(allValidMoves);
      return;
    }
    if (selectedFigure) {
      if (activePlayer === figureColor(positions[`${x}${y}`])) {
        setSelectedFigure(undefined);
        setValidMoves([]);
        return;
      }
      const moveInfo = [`${selectedFigure[0]}${selectedFigure[1]}`, `${x}${y}`];
      if (isMoveValid(moveInfo, positions, enPassantMoves) && isKingSafe(moveInfo, positions)) {
        setPositions((prevPositions) => {
          const newPositions = { ...prevPositions };
          if (
            enPassantMoves[activePlayer]?.[0].includes(moveInfo[0]) &&
            enPassantMoves[activePlayer]?.[1] === moveInfo[1]
          ) {
            const xAxis = Number(moveInfo[1].charAt(0));
            const yAxis = Number(moveInfo[1].charAt(1)) - (activePlayer === "white" ? 1 : -1);
            newPositions[`${xAxis}${yAxis}`] = undefined;
          }
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
          figure={positions[`${square[0]}${square[1]}`]}
          onClick={squareClickHandler}
          selectedFigure={selectedFigure}
          validMoves={validMoves}
          check={check}
        ></Square>
      );
    });
    return chessboard;
  };

  return <div className="chessboard">{renderChessboard()}</div>;
};

export default Chessboard;
