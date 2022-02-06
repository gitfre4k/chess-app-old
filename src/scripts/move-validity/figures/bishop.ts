import xyAxis from "../../xyAxis";
import isPathFree from "../isPathFree";

const bishopValidity = (
  moveInfo: string[],
  positions: {
    [key: string]: string | undefined;
  }
) => {
  const [figure, destination] = xyAxis(moveInfo);
  const xGap = Math.abs(figure.x - destination.x);
  const yGap = Math.abs(figure.y - destination.y);
  if (xGap === yGap) return isPathFree(moveInfo, positions);
  return false;
};

export default bishopValidity;
