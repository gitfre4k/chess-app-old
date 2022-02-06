import rookValidity from "./rook";
import bishopValidity from "./bishop";

const queenValidity = (
  moveInfo: string[],
  positions: {
    [key: string]: string | undefined;
  }
) => {
  if (rookValidity(moveInfo, positions) || bishopValidity(moveInfo, positions)) return true;
  return false;
};

export default queenValidity;
