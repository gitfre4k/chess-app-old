import rookValidity from "./rook";
import bishopValidity from "./bishop";

import { Ifigure } from "../../../interfaces/interfaces";

const queenValidity = (
  moveInfo: [Ifigure, { x: number; y: number; xy: string }],
  positions: {
    [key: string]: string | undefined;
  }
) => {
  if (rookValidity(moveInfo, positions) || bishopValidity(moveInfo, positions)) return true;
  return false;
};

export default queenValidity;
