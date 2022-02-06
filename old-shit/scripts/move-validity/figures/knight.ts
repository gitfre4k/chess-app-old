const knight = (pos1: number, pos2: number) => {
  switch (pos1 % 8) {
    case 0:
      return [-6, -15, 10, 17].includes(pos1 - pos2);
    case 7:
      return [10, 15, 17, -6, -15, -17].includes(pos1 - pos2);
    case 1:
      return [6, 15, -10, -17].includes(pos1 - pos2);
    case 2:
      return [-10, -15, -17, 6, 15, 17].includes(pos1 - pos2);
    default:
      return [6, 10, 15, 17].includes(Math.abs(pos1 - pos2));
  }
};

export default knight;
