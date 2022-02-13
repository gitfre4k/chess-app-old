const updateCastlingStatus = (
  moveInfo: string[],
  setCastling: React.Dispatch<
    React.SetStateAction<{
      white: {
        short: boolean;
        long: boolean;
      };
      black: {
        short: boolean;
        long: boolean;
      };
    }>
  >
) => {
  const castlingFigures: { [key: string]: string } = {
    whiteKing: "51",
    blackKing: "58",
    whiteRookShort: "81",
    whiteRookLong: "11",
    blackRookShort: "88",
    blackRookLong: "18",
  };

  for (const figurePosition in castlingFigures) {
    if (moveInfo.includes(castlingFigures[figurePosition])) {
      setCastling((prevValue) => {
        const newValue = { ...prevValue };
        switch (castlingFigures[figurePosition]) {
          case "51":
            newValue.white.short = false;
            newValue.white.long = false;
            break;
          case "58":
            newValue.black.short = false;
            newValue.black.long = false;
            break;
          case "81":
            newValue.white.short = false;
            break;
          case "11":
            newValue.white.long = false;
            break;
          case "88":
            newValue.black.short = false;
            break;
          case "18":
            newValue.black.long = false;
            break;
        }
        return newValue;
      });
    }
  }
};

export default updateCastlingStatus;
