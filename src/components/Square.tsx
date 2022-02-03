import Figure from "./Figure";

import "./Square.css";

interface SquareProps {
  color: string;
  id: number;
  onClick: (id: number) => void;
  selectedSquare: number | null;
  figure?: string;
}

const Square: React.FC<SquareProps> = ({
  color,
  figure,
  id,
  onClick,
  selectedSquare,
}) => {
  return (
    <div
      className="square"
      style={
        id === selectedSquare ? { background: "green" } : { background: color }
      }
      onClick={() => onClick(id)}
    >
      {figure && <Figure src={figure} />}
      {id}
    </div>
  );
};

export default Square;
