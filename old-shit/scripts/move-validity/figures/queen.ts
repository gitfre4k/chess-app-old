import rook from "./rook";
import bishop from "./bishop";
import { PositionsType } from "../../starting-positions";

const queen = (pos1: number, pos2: number, positions: PositionsType) => {
  if (rook(pos1, pos2, positions) || bishop(pos1, pos2, positions)) return true;
};

export default queen;
