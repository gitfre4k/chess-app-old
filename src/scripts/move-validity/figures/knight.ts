import { Ifigure } from "../../../interfaces/interfaces";

const knightValidity = (moveInfo: [Ifigure, { x: number; y: number; xy: string }]) => {
  const [figure, destination] = moveInfo;
  const xGap = Math.abs(figure.x - destination.x);
  const yGap = Math.abs(figure.y - destination.y);
  if ((xGap === 1 && yGap === 2) || (xGap === 2 && yGap === 1)) return true;
  return false;
};

export default knightValidity;
