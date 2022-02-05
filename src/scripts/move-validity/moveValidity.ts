import pawn from "./figures/pawn";
import knight from "./figures/knight";
import rook from "./figures/rook";
import bishop from "./figures/bishop";
import queen from "./figures/queen";
import king from "./figures/king";
import { PositionsType } from "../starting-positions";

const moveValidity = (
  pos1: number,
  pos2: number,
  positions: PositionsType,
  enPassantMove: (squareID: number) => void,
  blackEnPassant: [boolean, number],
  setBlackEnPassant: React.Dispatch<React.SetStateAction<[boolean, number]>>,
  whiteEnPassant: [boolean, number],
  setWhiteEnPassant: React.Dispatch<React.SetStateAction<[boolean, number]>>
) => {
  switch (positions[pos1][2]) {
    case "pawn":
      return pawn(
        pos1,
        pos2,
        positions,
        enPassantMove,
        blackEnPassant,
        setBlackEnPassant,
        whiteEnPassant,
        setWhiteEnPassant
      );
    case "knight":
      return knight(pos1, pos2);
    case "rook":
      return rook(pos1, pos2, positions);
    case "bishop":
      return bishop(pos1, pos2, positions);
    case "queen":
      return queen(pos1, pos2, positions);
    case "king":
      return king(pos1, pos2, positions);
  }
  return false;
};

export default moveValidity;
