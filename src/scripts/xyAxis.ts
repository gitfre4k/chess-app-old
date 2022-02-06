const xyAxis = (moveInfo: string[]) => {
  const figure = { x: Number(moveInfo[0].charAt(0)), y: Number(moveInfo[0].charAt(1)) };
  const destination = { x: Number(moveInfo[1].charAt(0)), y: Number(moveInfo[1].charAt(1)) };
  return [figure, destination];
};

export default xyAxis;
