const figureColor = (figure: string | undefined) => {
  if (!figure) return "error";
  if (figure.includes("White")) return "white";
  else return "black";
};

const figureName = (figure: string | undefined) => {
  const figures = ["Pawn", "Rook", "Knight", "Bishop", "Queen", "King"];
  for (let i = 0; i < 6; i++) {
    if (figure?.includes(figures[i])) return figures[i].toLowerCase();
  }
  return "error";
};

export { figureColor, figureName };
