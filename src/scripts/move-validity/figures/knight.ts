import xyAxis from "../../xyAxis";

const knightValidity = (moveInfo: string[]) => {
  const [figure, destination] = xyAxis(moveInfo);
  const xGap = Math.abs(figure.x - destination.x);
  const yGap = Math.abs(figure.y - destination.y);
  if ((xGap === 1 && yGap === 2) || (xGap === 2 && yGap === 1)) return true;
  return false;
};

export default knightValidity;
