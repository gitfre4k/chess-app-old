import "./Figure.css";

interface FigureProps {
  src?: string;
}

const Figure: React.FC<FigureProps> = ({ src }) => {
  return <img className="figure" src={src} />;
};

export default Figure;
