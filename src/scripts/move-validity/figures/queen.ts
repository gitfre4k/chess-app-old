import rook from "./rook";
import bishop from "./bishop";
import { Positions } from "../../starting-positions";

const queen = (pos1: number, pos2: number, positions: Positions) => {
  if (rook(pos1, pos2, positions) || bishop(pos1, pos2, positions)) return true;
};

export default queen;
