import { useEffect } from "react";
import * as hooks from "./hooks";

import Square from "../Square";
import { xyNotation, algebraicNotation } from "./constants/square-notation";
import * as f from "./constants/figures";
import isMoveValid from "./helpers/move-validity/isMoveValid";
import isKingSafe from "./helpers/move-validity/isKingSafe";

import { IFigure, IDestination } from "./interfaces";
import "./Chessboard.css";

const Chessboard: React.FC = () => {
  const { activePlayer, changePlayer } = hooks.useTurnSwitch();
  const { positions, updatePositions, upgradePawn } = hooks.usePositions();
  const { selectedFigure, validMoves, selectFigure, deselectFigure } = hooks.useFigure();
  const { enPassantMoves, checkForEnPassant, preventEnPassant } = hooks.useEnPassant();
  const { castling, updateCastlingStatus } = hooks.useCastling();
  const { pawnPromotion, promotePawn, endPawnPromotion } = hooks.usePawnPromotion();
  const { check, mate, updateCheckStatus, checkForMate } = hooks.useCheckMate();

  useEffect(() => {
    preventEnPassant(activePlayer);
    updateCheckStatus(activePlayer, positions);
    checkForMate(activePlayer, positions);
  }, [activePlayer, pawnPromotion]);

  useEffect(() => {
    mate && (check[activePlayer] ? alert("checkmate") : alert("stalemate"));
  }, [mate]);

  const squareClickHandler = (x: number, y: number, figure?: IFigure) => {
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
      const moveInfo: [IFigure, IDestination] = [selectedFigure, { x, y, xy: `${x}${y}` }];
      const moveInfo2 = [selectedFigure.xy, `${x}${y}`];
      if (
        isMoveValid(moveInfo, positions, enPassantMoves, castling) &&
        isKingSafe(moveInfo2, positions)
      ) {
        updatePositions(moveInfo, activePlayer, enPassantMoves);
        updateCastlingStatus(moveInfo);
        if (selectedFigure.name === "pawn" && (y === 8 || y === 1)) {
          figure && selectFigure(figure, positions, enPassantMoves, castling, true);
          promotePawn(`${x}${y}`);
          return;
        }
        checkForEnPassant(moveInfo2, positions);
        changePlayer();
      }
      deselectFigure();
    }
  };

  const promotionClickHandler = (x: number, y: number, figure?: IFigure) => {
    figure && upgradePawn(pawnPromotion, figure.piece);
    deselectFigure();
    endPawnPromotion();
    changePlayer();
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

  const renderPawnPromotions = () => {
    const promotions: JSX.Element[] = [];
    const whiteFigures = [f.WhiteQueen, f.WhiteKnight, f.WhiteRook, f.WhiteBishop];
    const blackFigures = [f.BlackQueen, f.BlackKnight, f.BlackRook, f.BlackBishop];
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

  return (
    <>
      <div className="board-container">
        {pawnPromotion ? (
          <div className={"promotions " + activePlayer}>{renderPawnPromotions()}</div>
        ) : null}
        <div className="chessboard">{renderChessboard()}</div>
      </div>
    </>
  );
};

export default Chessboard;
