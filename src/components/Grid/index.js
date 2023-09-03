import React from "react";
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
}) => {
  const numRows = row;
  const numColumns = col;

  // Generate all possible positions in the grid
  const allPositions = [];
  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    for (let colIndex = 0; colIndex < numColumns; colIndex++) {
      allPositions.push({ row: rowIndex, col: colIndex });
    }
  }

  // Shuffle the positions array to randomize activation
  const shuffledPositions = shuffleArray(allPositions);

  // Take the first `numActive` positions from the shuffled array
  const wallPositions = shuffledPositions.slice(0, numActive);

  const grid = [];
  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    const rowItems = [];
    for (let colIndex = 0; colIndex < numColumns; colIndex++) {
      const isWall = wallPositions.some(
        (position) =>
          position.row === rowIndex + 1 && position.col === colIndex + 1
      );

      // Determine if the current BlockButton should be activated based on positions array initialy
      const isActivated = activePositions?.some(
        (position) => position.row === rowIndex && position.col === colIndex
      );

      rowItems.push(
        <BlockButton
          type={isWall ? "wall" : "path"}
          key={`${rowIndex + 1}-${colIndex + 1}`}
          activated={isActivated}
          deactivated={deactivatePositions}
          onChangeValue={(data) => {
            console.log(rowIndex, colIndex, data);
          }}
        />
      );
    }

    grid.push(
      <div key={rowIndex} style={{ display: "flex" }}>
        {rowItems}
      </div>
    );
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>{grid}</div>
    </>
  );
};

export default Grid;
