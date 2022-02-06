import { PositionsType } from "../../starting-positions";

const pawn = (
  pos1: number,
  pos2: number,
  positions: PositionsType,
  enPassantMove: (squareID: number) => void,
  blackEnPassant: [boolean, number],
  setBlackEnPassant: React.Dispatch<React.SetStateAction<[boolean, number]>>,
  whiteEnPassant: [boolean, number],
  setWhiteEnPassant: React.Dispatch<React.SetStateAction<[boolean, number]>>
) => {
  if (!positions[pos2]) {
    if (positions[pos1][1] === "white") {
      // white pawn
      if (
        // En Passant move
        whiteEnPassant[0] === true &&
        pos2 === whiteEnPassant[1] &&
        (pos1 === whiteEnPassant[1] + 7 || pos1 === whiteEnPassant[1] + 9)
      ) {
        enPassantMove(whiteEnPassant[1] + 8);
        return true;
      }
      if (pos1 - pos2 === 8) return true;
      if (pos1 > 48 && pos1 < 57 && pos1 - pos2 === 16) {
        if (!positions[pos1 - 8]) {
          // enabe En Passant move for black player
          if (
            (positions[pos2 + 1] &&
              positions[pos2 + 1][1] === "black" &&
              positions[pos2 + 1][2] === "pawn") ||
            (positions[pos2 - 1] &&
              positions[pos2 - 1][1] === "black" &&
              positions[pos2 - 1][2] === "pawn")
          ) {
            setBlackEnPassant([true, pos2 + 8]);
          }

          return true;
        }
        return false;
      }
    } else {
      // black pawn
      if (
        // En Passant move
        blackEnPassant[0] === true &&
        pos2 === blackEnPassant[1] &&
        (pos1 === blackEnPassant[1] - 7 || pos1 === blackEnPassant[1] - 9)
      ) {
        enPassantMove(blackEnPassant[1] - 8);
        return true;
      }
      // 1 step ahead
      if (pos1 - pos2 === -8) return true;
      // 2 steps ahead
      if (pos1 > 8 && pos1 < 17 && pos1 - pos2 === -16) {
        if (!positions[pos1 + 8]) {
          // enabe En Passant move for white player
          if (
            (positions[pos2 + 1] &&
              positions[pos2 + 1][1] === "white" &&
              positions[pos2 + 1][2] === "pawn") ||
            (positions[pos2 - 1] &&
              positions[pos2 - 1][1] === "white" &&
              positions[pos2 - 1][2] === "pawn")
          ) {
            setWhiteEnPassant([true, pos2 - 8]);
          }
          return true;
        }
        return false;
      }
    }
  }
  if (positions[pos2]) {
    if (positions[pos1][1] === "white") {
      if (pos1 - pos2 === 7 || pos1 - pos2 === 9) return true;
    } else {
      if (pos1 - pos2 === -7 || pos1 - pos2 === -9) return true;
    }
  }
  return false;
};

export default pawn;
