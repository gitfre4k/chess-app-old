const knight = (pos1: number, pos2: number) => {
  return [6, 10, 15, 17, -6, -10, -15, -17].includes(pos1 - pos2);
};

export default knight;
