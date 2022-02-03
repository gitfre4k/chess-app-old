import pawn from "./figures/pawn";
import knight from "./figures/knight";
import rook from "./figures/rook";

const moveValidity = (
  pos1: number,
  pos2: number,
  positions: {
    [key: number]: [
      string,
      "black" | "white",
      "rook" | "knight" | "bishop" | "queen" | "king" | "pawn"
    ];
  }
) => {
  if (positions[pos1][2] === "pawn") {
    return pawn(pos1, pos2, positions);
  }
  if (positions[pos1][2] === "knight") {
    return knight(pos1, pos2);
  }
  if (positions[pos1][2] === "rook") {
    return rook(pos1, pos2, positions);
  }
  return false;
};

export default moveValidity;
