import { Positions } from "../starting-positions";

const isPathFree = (
  pos1: number,
  pos2: number,
  positions: Positions,
  distance: number,
  step: number
) => {
  if (distance === 1) return true;
  const skipedSquares: number[] = [];
  for (let i = 1; i < distance; i++) {
    skipedSquares.push(Math.min(pos1, pos2) + step * i);
  }
  let isFree = true;
  skipedSquares.map((square) => {
    if (positions[square] !== undefined) isFree = false;
  });
  return isFree;
};

export default isPathFree;
