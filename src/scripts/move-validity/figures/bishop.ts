import isPathFree from "../isPathFree";

import { Ifigure } from "../../../interfaces/interfaces";

const bishopValidity = (
  moveInfo: [Ifigure, { x: number; y: number; xy: string }],
  positions: {
    [key: string]: string | undefined;
  }
) => {
  const [figure, destination] = moveInfo;
  const xGap = Math.abs(figure.x - destination.x);
  const yGap = Math.abs(figure.y - destination.y);
  if (xGap === yGap) return isPathFree(moveInfo, positions);
  return false;
};

export default bishopValidity;
