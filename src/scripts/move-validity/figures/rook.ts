import isPathFree from "../isPathFree";

import { Ifigure } from "../../../interfaces/interfaces";

const rookValidity = (
  moveInfo: [Ifigure, { x: number; y: number; xy: string }],
  positions: {
    [key: string]: string | undefined;
  }
) => {
  const [figure, destination] = moveInfo;
  if (figure.x === destination.x || figure.y === destination.y)
    return isPathFree(moveInfo, positions);
  return false;
};

export default rookValidity;
