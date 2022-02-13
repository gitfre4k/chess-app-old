import { figureName, figureColor } from "../figureInfo";
import pawnValidity from "./figures/pawn";
import rookValidity from "./figures/rook";
import knightValidity from "./figures/knight";
import bishopValidity from "./figures/bishop";
import queenValidity from "./figures/queen";
import kingValidity from "./figures/king";

const isMoveValid = (
  moveInfo: string[],
  positions: {
    [key: string]: string | undefined;
  },
  enPassantMoves?: {
    white: [string[], string] | undefined;
    black: [string[], string] | undefined;
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
  const figure = figureName(positions[moveInfo[0]]);
  if (figureColor(positions[moveInfo[0]]) === figureColor(positions[moveInfo[1]])) return false;
  switch (figure) {
    case "pawn":
      return pawnValidity(moveInfo, positions, enPassantMoves);
    case "rook":
      return rookValidity(moveInfo, positions);
    case "knight":
      return knightValidity(moveInfo);
    case "bishop":
      return bishopValidity(moveInfo, positions);
    case "queen":
      return queenValidity(moveInfo, positions);
    case "king":
      return kingValidity(moveInfo, positions, castling);
    default:
      return false;
  }
};

export default isMoveValid;
