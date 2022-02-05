import { useState, useEffect } from "react";
import Square from "../components/Square";
import startingPositions from "../scripts/starting-positions";
import moveValidity from "../scripts/move-validity/moveValidity";

import "./Chessboard.css";

const Chessboard: React.FC = () => {
  const [selectedFigure, setSelectedFigure] = useState<number | null>(null);
  const [positions, setPositions] = useState(startingPositions);
  const [activePlayer, setActivePlayer] = useState<"white" | "black">("white");
  const [blackEnPassant, setBlackEnPassant] = useState<[boolean, number]>([false, 0]);
  const [whiteEnPassant, setWhiteEnPassant] = useState<[boolean, number]>([false, 0]);
  const [validMoves, setValidMoves] = useState<number[]>([]);

  useEffect(() => {
    if (blackEnPassant[0] && activePlayer === "white") {
      setBlackEnPassant([false, 0]);
    }
    if (whiteEnPassant[0] && activePlayer === "black") {
      setWhiteEnPassant([false, 0]);
    }
  }, [activePlayer]);

  const updatePositions = (figureID: number, squareID: number) => {
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

  const enPassantMove = (squareID: number) => {
    if (!selectedFigure) return;
    setPositions((prevPositions) => {
      const newPositions = { ...prevPositions };
      delete newPositions[squareID];
      return newPositions;
    });
  };

  const squareClickHandler = (selectedSquare: number) => {
    if (selectedFigure) {
      setValidMoves([]);
      if (
        positions[selectedSquare] &&
        positions[selectedFigure][1] === positions[selectedSquare][1]
      ) {
        setSelectedFigure(null);
        return;
      }
      moveValidity(
        selectedFigure,
        selectedSquare,
        positions,
        enPassantMove,
        blackEnPassant,
        setBlackEnPassant,
        whiteEnPassant,
        setWhiteEnPassant
      )
        ? updatePositions(selectedFigure, selectedSquare)
        : setSelectedFigure(null);
      return;
    }
    if (positions[selectedSquare] && activePlayer === positions[selectedSquare][1]) {
      setSelectedFigure(selectedSquare);
      const currentValidMoves: number[] = [];
      for (let i = 1; i <= 64; i++) {
        let isValid = moveValidity(
          selectedSquare,
          i,
          positions,
          enPassantMove,
          blackEnPassant,
          setBlackEnPassant,
          whiteEnPassant,
          setWhiteEnPassant
        );
        if (isValid) {
          !positions[i] && currentValidMoves.push(i);
          positions[i] && positions[i][1] !== activePlayer && currentValidMoves.push(i);
        }
      }
      setValidMoves(currentValidMoves);
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
          validMoves={validMoves}
        ></Square>
      );
    }
    return grid;
  };

  return <div className="chessboard">{renderChessboard()}</div>;
};

export default Chessboard;
