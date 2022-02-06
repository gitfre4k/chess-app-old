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

export type PositionsType = {
  [key: number]: [
    string,
    "black" | "white",
    "rook" | "knight" | "bishop" | "queen" | "king" | "pawn"
  ];
};

const startingPositions: PositionsType = {
  1: [BlackRook, "black", "rook"],
  2: [BlackKnight, "black", "knight"],
  3: [BlackBishop, "black", "bishop"],
  4: [BlackQueen, "black", "queen"],
  5: [BlackKing, "black", "king"],
  6: [BlackBishop, "black", "bishop"],
  7: [BlackKnight, "black", "knight"],
  8: [BlackRook, "black", "rook"],
  9: [BlackPawn, "black", "pawn"],
  10: [BlackPawn, "black", "pawn"],
  11: [BlackPawn, "black", "pawn"],
  12: [BlackPawn, "black", "pawn"],
  13: [BlackPawn, "black", "pawn"],
  14: [BlackPawn, "black", "pawn"],
  15: [BlackPawn, "black", "pawn"],
  16: [BlackPawn, "black", "pawn"],
  49: [WhitePawn, "white", "pawn"],
  50: [WhitePawn, "white", "pawn"],
  51: [WhitePawn, "white", "pawn"],
  52: [WhitePawn, "white", "pawn"],
  53: [WhitePawn, "white", "pawn"],
  54: [WhitePawn, "white", "pawn"],
  55: [WhitePawn, "white", "pawn"],
  56: [WhitePawn, "white", "pawn"],
  57: [WhiteRook, "white", "rook"],
  58: [WhiteKnight, "white", "knight"],
  59: [WhiteBishop, "white", "bishop"],
  60: [WhiteQueen, "white", "queen"],
  61: [WhiteKing, "white", "king"],
  62: [WhiteBishop, "white", "bishop"],
  63: [WhiteKnight, "white", "knight"],
  64: [WhiteRook, "white", "rook"],
};

export default startingPositions;
