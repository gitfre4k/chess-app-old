import xyAxis from "../../xyAxis";

const kingValidity = (moveInfo: string[]) => {
  const [figure, destination] = xyAxis(moveInfo);
  if (figure.x === destination.x && Math.abs(figure.y - destination.y) === 1) return true;
  if (figure.y === destination.y && Math.abs(figure.x - destination.x) === 1) return true;
  if (Math.abs(figure.x - destination.x) === 1 && Math.abs(figure.y - destination.y) === 1)
    return true;
  return false;
};

export default kingValidity;
