const rook = (
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
  // vertical movement
  if ((pos1 - pos2) % 8 === 0) {
    const distance = Math.abs((pos1 - pos2) / 8);
    if (distance === 1) return true;
    const skipedSquares: number[] = [];
    for (let i = 1; i < distance; i++) {
      skipedSquares.push(Math.min(pos1, pos2) + 8 * i);
    }
    let isValid = true;
    skipedSquares.map((square) => {
      if (positions[square] !== undefined) isValid = false;
    });
    return isValid;
  }
  // horizontal movement
  const yAxis = Math.floor((pos1 - 1) / 8 + 1);
  if (pos2 > 8 * yAxis - 8 && pos2 <= 8 * yAxis) {
    if (Math.abs(pos1 - pos2) === 1) return true;
    const skipedSquares: number[] = [];
    for (let i = 1; i < Math.abs(pos1 - pos2); i++) {
      skipedSquares.push(Math.min(pos1, pos2) + i);
    }
    let isValid = true;
    skipedSquares.map((square) => {
      if (positions[square] !== undefined) isValid = false;
    });
    return isValid;
  }
};

export default rook;
