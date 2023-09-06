export function mapping({ walls = [], totalRow, totalCol }) {
  const map = [];

  for (let r = 0; r < totalRow; r++) {
    const availableRow = [];
    for (let c = 0; c < totalCol; c++) {
      const isWall = walls.some(({ row, col }) => row === r && col === c);
      availableRow?.push(isWall ? 0 : 1);
    }
    map?.push(availableRow);
  }

  return map;
}

export function isValid(row, col, rowCol) {
  return row >= 0 && row < rowCol?.row && col >= 0 && col < rowCol.col;
}

export function isUnBlocked(grid, row, col) {
  if (grid[row][col] === 1) return true;
  else return false;
}

export function isDestination(row, col, dest) {
  if (row == dest?.row && col == dest?.col) return true;
  else return false;
}

export function calculateHValue(row, col, dest, methodH = "euc") {
  if (methodH === "euc") {
    return Math.sqrt(
      Math.pow(row - dest?.row, 2) + Math.pow(col - dest?.col, 2)
    );
  }
  return Math.abs(row - dest?.row) + Math.abs(col - dest?.col);
}

export function tracePath(cellDetails, dest, rowCol) {
  console.log("The Path is ");
  let row = dest?.row;
  let col = dest?.col;

  let Path = [];
  let finalPath = [];

  while (
    !(
      cellDetails[row][col].parent_i == row &&
      cellDetails[row][col].parent_j == col
    )
  ) {
    Path.push([row, col]);
    let temp_row = cellDetails[row][col].parent_i;
    let temp_col = cellDetails[row][col].parent_j;
    row = temp_row;
    col = temp_col;
  }

  Path.push([row, col]);
  while (Path.length > 0) {
    let p = Path[0];
    Path.shift();

    if (0 <= p[0] < rowCol?.row && 0 <= p[1] < rowCol?.col) {
      finalPath?.push({ row: p[0], col: p[1] });
    } else {
      finalPath?.push({ row: p[0], col: p[1] });
    }
  }

  return finalPath;
}
