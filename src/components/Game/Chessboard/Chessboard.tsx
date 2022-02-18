import { useState, useEffect } from "react";

import useTurnSwitch from "./logic/useTurnSwitch";
import usePositions from "./logic/usePositions";
import useFigure from "./logic/useFigure";
import useEnPassant from "./logic/useEnPassant";
import useCastling from "./logic/useCastling";

import { Ifigure } from "../../../interfaces/interfaces";

import Square from "../Square/Square";
import { algebraicNotation, xyNotation } from "../../../config/square-notation";
import startingPositions, {
  WhiteQueen,
  BlackQueen,
  WhiteKnight,
  BlackKnight,
  WhiteBishop,
  BlackBishop,
  WhiteRook,
  BlackRook,
} from "../../../config/starting-positions";
import { figureColor, figureName } from "../../../scripts/figureInfo";
import isMoveValid from "../../../scripts/move-validity/isMoveValid";
import isKingSafe from "../../../scripts/move-validity/isKingSafe";

import "./Chessboard.css";

const Chessboard: React.FC = () => {
  const [check, setCheck] = useState({ white: false, black: false });
  const [pawnPromotion, setPawnPromotion] = useState("");
  const [mate, setMate] = useState(false);

  const { positions, updatePositions, promotePawn } = usePositions();
  const { activePlayer, changePlayer } = useTurnSwitch();
  const { selectedFigure, validMoves, selectFigure, deselectFigure } = useFigure();
  const { enPassantMoves, checkForEnPassant, preventEnPassant } = useEnPassant();
  const { castling, updateCastlingStatus } = useCastling();

  useEffect(() => {
    preventEnPassant(activePlayer);
    setCheck((prevValue) => {
      const newValue = { ...prevValue };
      newValue[activePlayer] = !isKingSafe(["CHECK", activePlayer], positions);
      activePlayer === "white" ? (newValue.black = false) : (newValue.white = false);
      return newValue;
    });
    // let isMate = true;
    // for (let x in positions) {
    //   if (!positions[x] || !positions[x]?.includes(activePlayer === "white" ? "White" : "Black"))
    //     continue;
    //   for (let y in positions)
    //     if (isMoveValid([x, y], positions) && isKingSafe([x, y], positions)) isMate = false;
    // }
    // isMate && setMate(true);
  }, [activePlayer, pawnPromotion]);

  useEffect(() => {
    mate && (check[activePlayer] ? alert("checkmate") : alert("stalemate"));
  }, [mate]);

  const squareClickHandler = (x: number, y: number, figure?: Ifigure) => {
    if (mate || pawnPromotion) return;
    if (!selectedFigure && figure && activePlayer === figure.color) {
      selectFigure(figure, positions, enPassantMoves, castling);
      return;
    }
    if (selectedFigure) {
      if (activePlayer === figure?.color) {
        deselectFigure();
        return;
      }
      const moveInfo = [selectedFigure.xy, `${x}${y}`];

      const moveInfo1: [Ifigure, { x: number; y: number; xy: string }] = [
        selectedFigure,
        { x, y, xy: `${x}${y}` },
      ];

      if (
        isMoveValid(moveInfo1, positions, enPassantMoves, castling) &&
        isKingSafe(moveInfo, positions)
      ) {
        updatePositions(moveInfo1, activePlayer, enPassantMoves);
        updateCastlingStatus(moveInfo1);
        if (selectedFigure.name === "pawn" && (y === 8 || y === 1)) {
          figure && selectFigure(figure, positions, enPassantMoves, castling, true);
          setPawnPromotion(`${x}${y}`);
          return;
        }
        checkForEnPassant(moveInfo, positions);
        changePlayer();
      }
      deselectFigure();
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
          notation={algebraicNotation[index]}
          squareColor={(square[0] + square[1]) % 2 === 0 ? "#441a03" : "#b5915f"}
          piece={positions[`${square[0]}${square[1]}`]}
          onClick={squareClickHandler}
          selectedFigure={selectedFigure}
          validMoves={validMoves}
          check={check}
        />
      );
    });
    return chessboard;
  };

  const promotionClickHandler = (x: number, y: number, figure?: Ifigure) => {
    figure?.piece && promotePawn(pawnPromotion, figure.piece);
    deselectFigure();
    setPawnPromotion("");
    changePlayer();
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
          notation={"z0"}
          squareColor={(i + y) % 2 === 0 ? "#441a03" : "#b5915f"}
          piece={y < 1 ? whiteFigures[i] : blackFigures[i]}
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
