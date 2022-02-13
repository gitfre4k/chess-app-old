import xyAxis from "../../xyAxis";
import { figureColor } from "../../figureInfo";
import isPathFree from "../isPathFree";
import isKingSafe from "../isKingSafe";

const kingValidity = (
  moveInfo: string[],
  positions: {
    [key: string]: string | undefined;
  },
  castling?: {
    white: {
      short: boolean;
      long: boolean;
    };
    black: {
      short: boolean;
      long: boolean;
    };
  }
) => {
  const [figure, destination] = xyAxis(moveInfo);
  if (figure.x === destination.x && Math.abs(figure.y - destination.y) === 1) return true;
  if (figure.y === destination.y && Math.abs(figure.x - destination.x) === 1) return true;
  if (Math.abs(figure.x - destination.x) === 1 && Math.abs(figure.y - destination.y) === 1)
    return true;
  const activePlayer = figureColor(positions[moveInfo[0]]);
  if (castling && isKingSafe(["CHECK", activePlayer], positions)) {
    const i = activePlayer === "white" ? "1" : "8";
    if (destination.y === Number(i) && activePlayer !== "error") {
      if (
        castling[activePlayer].long &&
        destination.x === 3 &&
        isPathFree([moveInfo[0], "1" + i], positions) &&
        isKingSafe([moveInfo[0], "4" + i], positions)
      )
        return true;
      if (
        castling[activePlayer].short &&
        destination.x === 7 &&
        isPathFree([moveInfo[0], "8" + i], positions) &&
        isKingSafe([moveInfo[0], "6" + i], positions)
      )
        return true;
    }
  }
  return false;
};

export default kingValidity;
