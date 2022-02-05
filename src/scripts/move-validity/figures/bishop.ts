import isPathFree from "../isPathFree";
import { PositionsType } from "../../starting-positions";

const bishop = (pos1: number, pos2: number, positions: PositionsType) => {
  if ((pos1 - pos2) % 7 === 0) {
    return isPathFree(pos1, pos2, positions, Math.abs((pos1 - pos2) / 7), 7);
  }
  if ((pos1 - pos2) % 9 === 0) {
    return isPathFree(pos1, pos2, positions, Math.abs((pos1 - pos2) / 9), 9);
  }
};

export default bishop;
