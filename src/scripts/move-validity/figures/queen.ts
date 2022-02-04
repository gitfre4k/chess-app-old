import isPathFree from "../isPathFree";
import rook from "./rook";
import bishop from "./bishop";

const queen = (
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
  if (rook(pos1, pos2, positions) || bishop(pos1, pos2, positions)) return true;
};

export default queen;
