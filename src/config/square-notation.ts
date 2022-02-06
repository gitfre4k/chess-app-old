const one2a = (num: number) => {
  const abc = ["x", "a", "b", "c", "d", "e", "f", "g", "h"];
  return abc[num];
};

const algebraic = () => {
  const notations: string[] = [];
  for (let y = 8; y >= 1; y--) {
    for (let x = 1; x <= 8; x++) {
      notations.push(one2a(x) + y.toString());
    }
  }
  return notations;
};

const xy = () => {
  const notations: [number, number][] = [];
  for (let y = 8; y >= 1; y--) {
    for (let x = 1; x <= 8; x++) {
      notations.push([x, y]);
    }
  }
  return notations;
};

const algebraicNotation = algebraic();
const xyNotation = xy();

export { algebraicNotation, xyNotation };
