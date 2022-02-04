import isPathFree from "../isPathFree";

const bishop = (
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
  if ((pos1 - pos2) % 7 === 0) {
    return isPathFree(pos1, pos2, positions, Math.abs((pos1 - pos2) / 7), 7);
  }
  if ((pos1 - pos2) % 9 === 0) {
    return isPathFree(pos1, pos2, positions, Math.abs((pos1 - pos2) / 9), 9);
  }
};

export default bishop;
