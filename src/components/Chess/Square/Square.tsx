import { getSquareClass, getFigure } from "./helpers";

import { ISquareProps } from "./interfaces";
import "./Square.css";

const Square: React.FC<ISquareProps> = ({
  squareColor,
  x,
  y,
  piece,
  onClick,
  selectedFigure,
  validMoves,
  check,
}) => {
  const squareClass = getSquareClass(x, y, validMoves, check, piece);
  const figure = getFigure(x, y, piece);

  return (
    <div
      className={squareClass}
      style={
        selectedFigure?.x === x && selectedFigure.y === y
          ? { background: "green" }
          : { background: squareColor }
      }
      onClick={() => onClick(x, y, figure)}
    >
      {piece && <img className="figure" src={piece} />}
    </div>
  );
};

export default Square;
