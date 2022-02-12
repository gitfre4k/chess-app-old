import xyAxis from "../../xyAxis";
import { figureColor } from "../../figureInfo";

const pawnValidity = (
  moveInfo: string[],
  positions: {
    [key: string]: string | undefined;
  },
  enPassantMoves?: {
    white: [string[], string] | undefined;
    black: [string[], string] | undefined;
  }
) => {
  const [figure, destination] = xyAxis(moveInfo);
  const player = figureColor(positions[moveInfo[0]]);
  let i: number;
  player === "white" ? (i = 1) : (i = -1);
  if (
    enPassantMoves &&
    player !== "error" &&
    enPassantMoves[player]?.[0].includes(moveInfo[0]) &&
    enPassantMoves[player]?.[1] === moveInfo[1]
  )
    return true;
  if (!positions[moveInfo[1]] && figure.x === destination.x) {
    if (figure.y + 1 * i === destination.y) return true;
    if (figure.y + 2 * i === destination.y && !positions[`${figure.x}${figure.y + 1 * i}`])
      if ((i === 1 && figure.y === 2) || (i === -1 && figure.y === 7)) return true;
  }
  if (positions[moveInfo[1]] && figure.y + 1 * i === destination.y) {
    if (figure.x + 1 === destination.x || figure.x - 1 === destination.x) return true;
  }
  return false;
};

export default pawnValidity;
