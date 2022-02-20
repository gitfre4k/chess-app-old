import { WhiteKing, BlackKing } from "../../constants/figures";
import { figureColor, getFigureByXY } from "../figure-info";
import isMoveValid from "./isMoveValid";

const isKingSafe = (moveInfo: string[], positions: { [key: string]: string | undefined }) => {
  const activePlayer = figureColor(positions[moveInfo[0]]);
  let king =
    activePlayer === "white" || moveInfo[1] === "white"
      ? Object.keys(positions).find((key) => positions[key] === WhiteKing)
      : Object.keys(positions).find((key) => positions[key] === BlackKing);
  if (king === moveInfo[0]) king = moveInfo[1];

  if (moveInfo[0] === "CHECK")
    for (let key in positions) {
      if (king) {
        const figure = getFigureByXY(key, positions);
        if (!figure) continue;
        const destionation = { x: Number(king.charAt(0)), y: Number(king.charAt(1)), xy: king };
        if (isMoveValid([figure, destionation], positions)) return false;
      }
    }

  const xPositions = { ...positions };
  xPositions[moveInfo[1]] = xPositions[moveInfo[0]];
  xPositions[moveInfo[0]] = undefined;

  for (let key in xPositions) {
    if (king) {
      const figure = getFigureByXY(key, xPositions);
      if (!figure) continue;
      const destionation = { x: Number(king.charAt(0)), y: Number(king.charAt(1)), xy: king };
      if (isMoveValid([figure, destionation], xPositions)) return false;
    }
  }

  return true;
};

export default isKingSafe;
