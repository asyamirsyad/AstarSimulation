import React, { useEffect, useState } from "react";
import BlockButton from "../BlockButton";

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

const Grid = ({
  row = 2,
  col = 2,
  numActive = 0,
  activePositions = [],
  deactivatePositions = false,
  onChangeValue = () => {},
  getWallPositions = () => {},
  ...props
}) => {
  const [shuffledPositions, setShuffledPositions] = useState([]);

  useEffect(() => {
    // Generate all possible positions in the grid
    const allPositions = [];
    for (let rowIndex = 0; rowIndex < row; rowIndex++) {
      for (let colIndex = 0; colIndex < col; colIndex++) {
        allPositions.push({ row: rowIndex, col: colIndex });
      }
    }

    // Shuffle the positions array to randomize activation
    const newShuffledPositions = shuffleArray(allPositions).slice(0, numActive);
    setShuffledPositions(newShuffledPositions);

    // getWallPositions?.(newShuffledPositions);
  }, [row, col, numActive, deactivatePositions]);

  useEffect(() => {
    getWallPositions?.(shuffledPositions);
  }, [shuffledPositions, deactivatePositions]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {Array.from({ length: row })?.map((_, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex" }}>
            {Array.from({ length: col })?.map((_, colIndex) => {
              const position = { row: rowIndex, col: colIndex };
              const isWall = shuffledPositions.some(
                (wallPosition) =>
                  wallPosition.row === position.row &&
                  wallPosition.col === position.col
              );

              const isActivated = activePositions.some(
                (activePosition) =>
                  activePosition.row === position.row &&
                  activePosition.col === position.col
              );

              return (
                <BlockButton
                  type={isWall ? "wall" : "path"}
                  key={`${position?.row}-${position?.col}`}
                  id={`${(position?.row, position?.col)}`}
                  activated={isActivated}
                  deactivated={deactivatePositions}
                  onChangeValue={(data) => onChangeValue(data, position)}
                  {...props}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
