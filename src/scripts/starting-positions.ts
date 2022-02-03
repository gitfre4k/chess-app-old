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

const startingPositions: {
  [key: number]: [string, "black" | "white", "R" | "N" | "B" | "Q" | "K" | ""];
} = {
  1: [BlackRook, "black", "R"],
  2: [BlackKnight, "black", "N"],
  3: [BlackBishop, "black", "B"],
  4: [BlackQueen, "black", "Q"],
  5: [BlackKing, "black", "K"],
  6: [BlackBishop, "black", "B"],
  7: [BlackKnight, "black", "N"],
  8: [BlackRook, "black", "R"],
  9: [BlackPawn, "black", ""],
  10: [BlackPawn, "black", ""],
  11: [BlackPawn, "black", ""],
  12: [BlackPawn, "black", ""],
  13: [BlackPawn, "black", ""],
  14: [BlackPawn, "black", ""],
  15: [BlackPawn, "black", ""],
  16: [BlackPawn, "black", ""],
  49: [WhitePawn, "white", ""],
  50: [WhitePawn, "white", ""],
  51: [WhitePawn, "white", ""],
  52: [WhitePawn, "white", ""],
  53: [WhitePawn, "white", ""],
  54: [WhitePawn, "white", ""],
  55: [WhitePawn, "white", ""],
  56: [WhitePawn, "white", ""],
  57: [WhiteRook, "white", "R"],
  58: [WhiteKnight, "white", "N"],
  59: [WhiteBishop, "white", "B"],
  60: [WhiteQueen, "white", "Q"],
  61: [WhiteKing, "white", "K"],
  62: [WhiteBishop, "white", "B"],
  63: [WhiteKnight, "white", "N"],
  64: [WhiteRook, "white", "R"],
};

export default startingPositions;
