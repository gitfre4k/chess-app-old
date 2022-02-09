import Figure from "./Figure";

import "./Square.css";

interface SquareProps {
  color: string;
  x: number;
  y: number;
  notation: string;
  figure?: string;
  onClick: (x: number, y: number) => void;
  selectedFigure?: [number, number];
  validMoves: string[];
}

const Square: React.FC<SquareProps> = ({
  color,
  x,
  y,
  notation,
  figure,
  onClick,
  selectedFigure,
  validMoves,
}) => {
  return (
    <div
      className={validMoves.includes(`${x}${y}`) ? "square valid-move" : "square"}
      style={
        selectedFigure && selectedFigure[0] === x && selectedFigure[1] === y
          ? { background: "green" }
          : { background: color }
      }
      onClick={() => onClick(x, y)}
    >
      {notation}
      {figure && <Figure src={figure} />}
    </div>
  );
};

export default Square;
