const knight = (pos1: number, pos2: number) => {
  return [6, 10, 15, 17].includes(Math.abs(pos1 - pos2));
};

export default knight;
