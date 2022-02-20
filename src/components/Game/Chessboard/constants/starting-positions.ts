import { xyNotation } from "./square-notation";
import * as figure from "./figures";

const setFigure = (index: number) => {
  switch (index) {
    case 0:
    case 7:
      return figure.BlackRook;
    case 1:
    case 6:
      return figure.BlackKnight;
    case 2:
    case 5:
      return figure.BlackBishop;
    case 3:
      return figure.BlackQueen;
    case 4:
      return figure.BlackKing;
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
      return figure.BlackPawn;
    case 48:
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
      return figure.WhitePawn;
    case 56:
    case 63:
      return figure.WhiteRook;
    case 57:
    case 62:
      return figure.WhiteKnight;
    case 58:
    case 61:
      return figure.WhiteBishop;
    case 59:
      return figure.WhiteQueen;
    case 60:
      return figure.WhiteKing;
  }
};

const boardSetup = (xyNotation: [number, number][]) => {
  const positions: { [key: string]: string | undefined } = {};
  xyNotation.map((square, index) => {
    positions[`${square[0]}${square[1]}`] = setFigure(index);
  });
  return positions;
};

const startingPositions = boardSetup(xyNotation);

export default startingPositions;
