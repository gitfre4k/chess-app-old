import { figureName, figureColor } from "../figureInfo";
import xyAxis from "../xyAxis";

const checkForEnPassant = (
  moveInfo: string[],
  positions: {
    [key: string]: string | undefined;
  },
  setEnPassantMoves: React.Dispatch<
    React.SetStateAction<{
      white: [string[], string] | undefined;
      black: [string[], string] | undefined;
    }>
  >
) => {
  if (figureName(positions[moveInfo[0]]) === "pawn") {
    const [figure, destination] = xyAxis(moveInfo);
    const player = figureColor(positions[moveInfo[0]]);
    let i: number;
    player === "white" ? (i = 1) : (i = -1);
    let enPassantFigures: string[] = [];
    if (figure.y + 2 * i === destination.y) {
      const possibilities = [
        `${destination.x + 1}${destination.y}`,
        `${destination.x - 1}${destination.y}`,
      ];
      for (let pos of possibilities) {
        if (
          positions[pos] &&
          figureName(positions[pos]) === "pawn" &&
          figureColor(positions[pos]) !== player
        ) {
          enPassantFigures.push(pos);
        }
      }
      const enPassantValue: [string[], string] = [
        enPassantFigures,
        `${figure.x}${figure.y + 1 * i}`,
      ];
      setEnPassantMoves((prevValue) => {
        const newValue = { ...prevValue };
        i > 0 ? (newValue.black = enPassantValue) : (newValue.white = enPassantValue);
        return newValue;
      });
    }
  }
  return;
};

export default checkForEnPassant;
