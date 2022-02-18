export interface Ifigure {
  x: number;
  y: number;
  xy: string;
  name: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
  color: "black" | "white";
  piece: string;
}
