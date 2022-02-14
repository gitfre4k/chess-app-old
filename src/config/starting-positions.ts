import { xyNotation } from "./square-notation";
import BlackBishop from "../img/BlackBishop.png";
import BlackKing from "../img/BlackKing.png";
import BlackKnight from "../img/BlackKnight.png";
import BlackPawn from "../img/BlackPawn.png";
import BlackQueen from "../img/BlackQueen.png";
import BlackRook from "../img/BlackRook.png";
import WhiteBishop from "../img/WhiteBishop.png";
import WhiteKing from "../img/WhiteKing.png";
import WhiteKnight from "../img/WhiteKnight.png";
import WhitePawn from "../img/WhitePawn.png";
import WhiteQueen from "../img/WhiteQueen.png";
import WhiteRook from "../img/WhiteRook.png";

const setFigure = (index: number) => {
  switch (index) {
    case 0:
    case 7:
      return BlackRook;
    case 1:
    case 6:
      return BlackKnight;
    case 2:
    case 5:
      return BlackBishop;
    case 3:
      return BlackQueen;
    case 4:
      return BlackKing;
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
      return BlackPawn;
    case 48:
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
      return WhitePawn;
    case 56:
    case 63:
      return WhiteRook;
    case 57:
    case 62:
      return WhiteKnight;
    case 58:
    case 61:
      return WhiteBishop;
    case 59:
      return WhiteQueen;
    case 60:
      return WhiteKing;
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
export {
  WhiteKing,
  BlackKing,
  WhiteQueen,
  BlackQueen,
  WhiteKnight,
  BlackKnight,
  WhiteBishop,
  BlackBishop,
  WhiteRook,
  BlackRook,
};
