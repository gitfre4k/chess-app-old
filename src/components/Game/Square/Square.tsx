import getFigureInfo from "./logic/getFigureInfo";

import { Ifigure } from "../../../interfaces/interfaces";

import "./Square.css";

interface SquareProps {
  squareColor: string;
  x: number;
  y: number;
  notation: string;
  piece?: string;
  onClick: (x: number, y: number, figure?: Ifigure) => void;
  selectedFigure?: Ifigure;
  validMoves: string[];
  check: {
    white: boolean;
    black: boolean;
  };
}

const Square: React.FC<SquareProps> = ({
  squareColor,
  x,
  y,
  piece,
  onClick,
  selectedFigure,
  validMoves,
  check,
}) => {
  let squareClass = "square ";
  if (validMoves.includes(`${x}${y}`)) squareClass = squareClass + "valid-move ";
  if (
    (check.white && piece?.includes("WhiteKing")) ||
    (check.black && piece?.includes("BlackKing"))
  ) {
    squareClass = squareClass + "check";
  }

  const figure = getFigureInfo(x, y, piece);

  return (
    <div
      className={squareClass}
      style={
        selectedFigure && selectedFigure.x === x && selectedFigure.y === y
          ? { background: "green" }
          : { background: squareColor }
      }
      onClick={() => onClick(x, y, figure)}
    >
      {/* {x}
      {y} */}
      {piece && <img className="figure" src={piece} />}
    </div>
  );
};

export default Square;
