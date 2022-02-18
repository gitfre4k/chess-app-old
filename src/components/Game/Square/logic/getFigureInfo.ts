const figureName = (piece: string) => {
  const pieces = ["Pawn", "Rook", "Knight", "Bishop", "Queen", "King"];
  let name;
  for (let i = 0; i < 6; i++) {
    if (piece.includes(pieces[i])) {
      switch (i) {
        case 0:
          return (name = "pawn");
        case 1:
          return (name = "rook");
        case 2:
          return (name = "knight");
        case 3:
          return (name = "bishop");
        case 4:
          return (name = "queen");
      }
    }
  }
  return (name = "king");
};

const getFigureInfo = (x: number, y: number, piece?: string) => {
  if (!piece) return undefined;

  const color: "white" | "black" = piece.includes("White") ? "white" : "black";
  const name: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king" = figureName(piece);

  const figureInfo = {
    x,
    y,
    xy: `${x}${y}`,
    name,
    color,
    piece,
  };

  return figureInfo;
};

export default getFigureInfo;
