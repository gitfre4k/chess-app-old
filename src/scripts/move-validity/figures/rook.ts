import xyAxis from "../../xyAxis";
import isPathFree from "../isPathFree";

const rookValidity = (
  moveInfo: string[],
  positions: {
    [key: string]: string | undefined;
  }
) => {
  const [figure, destination] = xyAxis(moveInfo);
  if (figure.x === destination.x || figure.y === destination.y)
    return isPathFree(moveInfo, positions);
  return false;
};

export default rookValidity;
