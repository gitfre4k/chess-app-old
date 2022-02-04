import isPathFree from "../isPathFree";

const rook = (
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
  if ((pos1 - pos2) % 8 === 0) {
    return isPathFree(pos1, pos2, positions, Math.abs((pos1 - pos2) / 8), 8);
  }
  const yAxis = Math.floor((pos1 - 1) / 8 + 1);
  if (pos2 > 8 * yAxis - 8 && pos2 <= 8 * yAxis) {
    return isPathFree(pos1, pos2, positions, Math.abs(pos1 - pos2), 1);
  }
};

export default rook;
