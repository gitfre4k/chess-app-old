import isPathFree from "../isPathFree";
import { Positions } from "../../starting-positions";

const rook = (pos1: number, pos2: number, positions: Positions) => {
  if ((pos1 - pos2) % 8 === 0) {
    return isPathFree(pos1, pos2, positions, Math.abs((pos1 - pos2) / 8), 8);
  }
  const yAxis = Math.floor((pos1 - 1) / 8 + 1);
  if (pos2 > 8 * yAxis - 8 && pos2 <= 8 * yAxis) {
    return isPathFree(pos1, pos2, positions, Math.abs(pos1 - pos2), 1);
  }
};

export default rook;
