import { Ifigure } from "../interfaces/interfaces";

const figureColor = (figure: string | undefined) => {
  if (!figure) return undefined;
  if (figure.includes("White")) return "white";
  return "black";
};

const figureName = (piece: string | undefined) => {
  if (!piece) return undefined;
  const pieces = ["Pawn", "Rook", "Knight", "Bishop", "Queen", "King"];
  let name;
  for (let i = 0; i < 6; i++) {
    if (piece.includes(pieces[i])) {
      switch (i) {
        case 0:
          return (name = "pawn");
        case 1:
          return (name = "rook");
        case 2:
          return (name = "knight");
        case 3:
          return (name = "bishop");
        case 4:
          return (name = "queen");
      }
    }
  }
  return (name = "king");
};

const getFigureByXY = (xy: string, positions: { [key: string]: string | undefined }) => {
  const x = Number(xy.charAt(0));
  const y = Number(xy.charAt(1));
  const name = figureName(positions[xy]);
  const color = figureColor(positions[xy]);
  const piece = positions[xy];
  if (!name || !color || !piece) return undefined;
  const figure: Ifigure = { x, y, xy, name, color, piece };
  return figure;
};

export { figureColor, figureName, getFigureByXY };
