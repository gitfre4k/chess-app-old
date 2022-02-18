import { useState } from "react";

import xyAxis from "../../../../scripts/xyAxis";
import { figureName, figureColor } from "../../../../scripts/figureInfo";

const useEnPassant = () => {
  const [enPassantMoves, setEnPassantMoves] = useState<{
    white: [string[], string] | undefined;
    black: [string[], string] | undefined;
  }>({ white: undefined, black: undefined });

  const checkForEnPassant = (
    moveInfo: string[],
    positions: {
      [key: string]: string | undefined;
    }
  ) => {
    if (figureName(positions[moveInfo[0]]) === "pawn") {
      const [figure, destination] = xyAxis(moveInfo);
      const player = figureColor(positions[moveInfo[0]]);
      let i: number;
      player === "white" ? (i = 1) : (i = -1);
      let enPassantFigures: string[] = [];
      if (figure.y + 2 * i === destination.y) {
        const possibilities = [
          `${destination.x + 1}${destination.y}`,
          `${destination.x - 1}${destination.y}`,
        ];
        for (let pos of possibilities) {
          if (
            positions[pos] &&
            figureName(positions[pos]) === "pawn" &&
            figureColor(positions[pos]) !== player
          ) {
            enPassantFigures.push(pos);
          }
        }
        const enPassantValue: [string[], string] = [
          enPassantFigures,
          `${figure.x}${figure.y + 1 * i}`,
        ];
        setEnPassantMoves((prevValue) => {
          const newValue = { ...prevValue };
          i > 0 ? (newValue.black = enPassantValue) : (newValue.white = enPassantValue);
          return newValue;
        });
      }
    }
  };

  const preventEnPassant = (activePlayer: "white" | "black") => {
    setEnPassantMoves((prevValue) => {
      const newValue = { ...prevValue };
      activePlayer === "white" ? (newValue.black = undefined) : (newValue.white = undefined);
      return newValue;
    });
  };

  return { enPassantMoves, checkForEnPassant, preventEnPassant };
};

export default useEnPassant;
