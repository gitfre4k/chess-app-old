const king = (
  pos1: number,
  pos2: number,
  positions: {
    [key: number]: [
      string,
      "black" | "white",
      "rook" | "knight" | "bishop" | "queen" | "king" | "pawn"
    ];
  }
) => {
  return [1, 7, 8, 9].includes(Math.abs(pos1 - pos2));
};

export default king;
