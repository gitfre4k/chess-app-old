import { Positions } from "../../starting-positions";

const pawn = (pos1: number, pos2: number, positions: Positions) => {
  if (positions[pos2] === undefined) {
    if (positions[pos1][1] === "white") {
      if (pos1 - pos2 === 8) return true;
      if (pos1 > 48 && pos1 < 57 && pos1 - pos2 === 16) {
        if (positions[pos1 - 8] === undefined) return true;
        return false;
      }
    } else {
      if (pos1 - pos2 === -8) return true;
      if (pos1 > 8 && pos1 < 17 && pos1 - pos2 === -16) {
        if (positions[pos1 + 8] === undefined) return true;
        return false;
      }
    }
  }
  if (positions[pos2] !== undefined) {
    if (positions[pos1][1] === "white") {
      if (pos1 - pos2 === 7 || pos1 - pos2 === 9) return true;
    } else {
      if (pos1 - pos2 === -7 || pos1 - pos2 === -9) return true;
    }
  }
  return false;
};

export default pawn;
