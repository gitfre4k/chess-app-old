import { useState, useEffect } from "react";

import Square from "./Square";
import { algebraicNotation, xyNotation } from "../../config/square-notation";
import startingPositions, {
  WhiteQueen,
  BlackQueen,
  WhiteKnight,
  BlackKnight,
  WhiteBishop,
  BlackBishop,
  WhiteRook,
  BlackRook,
} from "../../config/starting-positions";
import { figureColor, figureName } from "../../scripts/figureInfo";
import isMoveValid from "../../scripts/move-validity/isMoveValid";
import checkForEnPassant from "../../scripts/move-validity/checkForEnPassant";
import isKingSafe from "../../scripts/move-validity/isKingSafe";
import updateCastlingStatus from "../../scripts/move-validity/updateCastlingStatus";

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
  const [castling, setCastling] = useState({
    white: { short: true, long: true },
    black: { short: true, long: true },
  });
  const [pawnPromotion, setPawnPromotion] = useState("");
  const [mate, setMate] = useState(false);

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
    let isMate = true;
    for (let x in positions) {
      if (!positions[x] || !positions[x]?.includes(activePlayer === "white" ? "White" : "Black"))
        continue;
      for (let y in positions)
        if (isMoveValid([x, y], positions) && isKingSafe([x, y], positions)) isMate = false;
    }
    isMate && setMate(true);
  }, [activePlayer, pawnPromotion]);

  useEffect(() => {
    mate && (check[activePlayer] ? alert("checkmate") : alert("stalemate"));
  }, [mate]);

  const squareClickHandler = (x: number, y: number) => {
    if (pawnPromotion) return;
    if (
      !selectedFigure &&
      positions[`${x}${y}`] &&
      activePlayer === figureColor(positions[`${x}${y}`])
    ) {
      setSelectedFigure([x, y]);
      const allValidMoves: string[] = [];
      for (const [key] of Object.entries(positions)) {
        const moveInfo = [`${x}${y}`, `${key}`];
        if (
          isMoveValid(moveInfo, positions, enPassantMoves, castling) &&
          isKingSafe(moveInfo, positions)
        )
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
      if (
        isMoveValid(moveInfo, positions, enPassantMoves, castling) &&
        isKingSafe(moveInfo, positions)
      ) {
        setPositions((prevPositions) => {
          const newPositions = { ...prevPositions };
          if (
            enPassantMoves[activePlayer]?.[0].includes(moveInfo[0]) &&
            enPassantMoves[activePlayer]?.[1] === moveInfo[1]
          ) {
            const xAxis = moveInfo[1].charAt(0);
            const yAxis = Number(moveInfo[1].charAt(1)) - (activePlayer === "white" ? 1 : -1);
            newPositions[xAxis + `${yAxis}`] = undefined;
          }
          if (
            figureName(positions[moveInfo[0]]) === "king" &&
            Math.abs(Number(moveInfo[0].charAt(0)) - Number(moveInfo[1].charAt(0))) === 2
          ) {
            const xAxis = moveInfo[1].charAt(0) === "3" ? "4" : "6";
            const yAxis = moveInfo[0].charAt(1);
            newPositions[xAxis + yAxis] = newPositions[(xAxis === "4" ? "1" : "8") + yAxis];
            newPositions[(xAxis === "4" ? "1" : "8") + yAxis] = undefined;
          }
          newPositions[moveInfo[1]] = newPositions[moveInfo[0]];
          newPositions[moveInfo[0]] = undefined;
          return newPositions;
        });
        updateCastlingStatus(moveInfo, setCastling);
        if (
          figureName(positions[moveInfo[0]]) === "pawn" &&
          (moveInfo[1].charAt(1) === "8" || moveInfo[1].charAt(1) === "1")
        ) {
          setSelectedFigure([Number(moveInfo[1].charAt(0)), Number(moveInfo[1].charAt(1))]);
          setValidMoves([]);
          setPawnPromotion(moveInfo[1]);
          return;
        }
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
        />
      );
    });
    return chessboard;
  };

  const promotionClickHandler = (x: number, y: number, figure?: string) => {
    figure &&
      setPositions((prevPositions) => {
        const newPositions = { ...prevPositions };
        newPositions[pawnPromotion] = figure;
        return newPositions;
      });
    setSelectedFigure(undefined);
    setPawnPromotion("");
    setActivePlayer((prevValue) => {
      if (prevValue === "white") return "black";
      return "white";
    });
  };

  const pawnPromotions = () => {
    const promotions: JSX.Element[] = [];
    const whiteFigures = [WhiteQueen, WhiteKnight, WhiteRook, WhiteBishop];
    const blackFigures = [BlackQueen, BlackKnight, BlackRook, BlackBishop];
    const y = activePlayer === "white" ? 0 : 1;
    for (let i = 0; i < 4; i++) {
      promotions.push(
        <Square
          key={i}
          x={0}
          y={0}
          color={(i + y) % 2 === 0 ? "#441a03" : "#b5915f"}
          figure={y < 1 ? whiteFigures[i] : blackFigures[i]}
          onClick={promotionClickHandler}
          selectedFigure={undefined}
          validMoves={["00"]}
          check={check}
        />
      );
    }
    return promotions;
  };

  const classPromotions = "promotions " + activePlayer;

  return (
    <>
      <div className="board-container">
        {pawnPromotion && <div className={classPromotions}>{pawnPromotions()}</div>}
        <div className="chessboard">{renderChessboard()}</div>
      </div>
    </>
  );
};

export default Chessboard;
