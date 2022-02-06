const figureColor = (figure: string | undefined) => {
  if (!figure) return "undefined input";
  if (figure?.includes("White")) return "white";
  return "black";
};

export default figureColor;
