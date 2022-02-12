import Figure from "./Figure";

import "./Square.css";

interface SquareProps {
  color: string;
  x: number;
  y: number;
  figure?: string;
  onClick: (x: number, y: number) => void;
  selectedFigure?: [number, number];
  validMoves: string[];
  check: {
    white: boolean;
    black: boolean;
  };
}

const Square: React.FC<SquareProps> = ({
  color,
  x,
  y,
  figure,
  onClick,
  selectedFigure,
  validMoves,
  check,
}) => {
  let squareClass = "square ";
  if (validMoves.includes(`${x}${y}`)) squareClass = squareClass + "valid-move ";
  if (
    (check.white && figure?.includes("WhiteKing")) ||
    (check.black && figure?.includes("BlackKing"))
  )
    squareClass = squareClass + "check";

  return (
    <div
      className={squareClass}
      style={
        selectedFigure && selectedFigure[0] === x && selectedFigure[1] === y
          ? { background: "green" }
          : { background: color }
      }
      onClick={() => onClick(x, y)}
    >
      {/* {notation} */}
      {figure && <Figure src={figure} />}
    </div>
  );
};

export default Square;
