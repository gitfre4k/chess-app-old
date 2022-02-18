import { useState } from "react";
import isMoveValid from "../../../../scripts/move-validity/isMoveValid";
import isKingSafe from "../../../../scripts/move-validity/isKingSafe";

import { Ifigure } from "../../../../interfaces/interfaces";

const useFigure = () => {
  const [selectedFigure, setSelectedFigure] = useState<Ifigure | undefined>(undefined);
  const [validMoves, setValidMoves] = useState<string[]>([]);

  const selectFigure = (
    figure: Ifigure,
    positions: {
      [key: string]: string | undefined;
    },
    enPassantMoves: {
      white: [string[], string] | undefined;
      black: [string[], string] | undefined;
    },
    castling: {
      white: {
        short: boolean;
        long: boolean;
      };
      black: {
        short: boolean;
        long: boolean;
      };
    },
    promotion?: boolean
  ) => {
    setSelectedFigure(figure);
    if (promotion) {
      setValidMoves([]);
      return;
    }
    const allValidMoves: string[] = [];
    for (const [key] of Object.entries(positions)) {
      const moveInfo = [figure.xy, `${key}`];
      const moveInfo1: [Ifigure, { x: number; y: number; xy: string }] = [
        figure,
        { x: Number(key.charAt(0)), y: Number(key.charAt(1)), xy: key },
      ];
      if (
        isMoveValid(moveInfo1, positions, enPassantMoves, castling) &&
        isKingSafe(moveInfo, positions)
      )
        allValidMoves.push(key);
    }
    setValidMoves(allValidMoves);
  };

  const deselectFigure = () => {
    setSelectedFigure(undefined);
    setValidMoves([]);
  };

  return { selectedFigure, validMoves, selectFigure, deselectFigure };
};

export default useFigure;
