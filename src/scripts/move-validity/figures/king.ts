import { PositionsType } from "../../starting-positions";

const king = (pos1: number, pos2: number, positions: PositionsType) => {
  return [1, 7, 8, 9].includes(Math.abs(pos1 - pos2));
};

export default king;
