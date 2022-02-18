import { useState } from "react";

import isKingSafe from "../../../../scripts/move-validity/isKingSafe";
import isMoveValid from "../../../../scripts/move-validity/isMoveValid";
import { getFigureByXY } from "../../../../scripts/figureInfo";

const useCheckMate = () => {
  const [check, setCheck] = useState({ white: false, black: false });
  const [mate, setMate] = useState(false);

  const updateCheckStatus = (
    activePlayer: "white" | "black",
    positions: {
      [key: string]: string | undefined;
    }
  ) =>
    setCheck((prevValue) => {
      const newValue = { ...prevValue };
      newValue[activePlayer] = !isKingSafe(["CHECK", activePlayer], positions);
      activePlayer === "white" ? (newValue.black = false) : (newValue.white = false);
      return newValue;
    });

  const checkForMate = (
    activePlayer: "white" | "black",
    positions: { [key: string]: string | undefined }
  ) => {
    let isMate = true;
    for (let xy1 in positions) {
      const figure = getFigureByXY(xy1, positions);
      if (!figure || figure.color !== activePlayer) continue;
      for (let xy2 in positions) {
        const destionation = { x: Number(xy2.charAt(0)), y: Number(xy2.charAt(1)), xy: xy2 };
        if (isMoveValid([figure, destionation], positions) && isKingSafe([xy1, xy2], positions))
          isMate = false;
      }
    }
    isMate && setMate(true);
  };

  return { check, mate, updateCheckStatus, checkForMate };
};

export default useCheckMate;
