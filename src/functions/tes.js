// A javascript Program to implement A* Search Algorithm
import { Component } from "react";
import {
  calculateHValue,
  isDestination,
  isUnBlocked,
  isValid,
  tracePath,
} from "./AStar";

class cell extends Component {
  constructor(props) {
    super(props);
    this.parent_i = 0;
    this.parent_j = 0;
    this.f = 0;
    this.g = 0;
    this.h = 0;
  }
}

export function aStarSearch(grid, src, dest, rowCol, methodH, limitMove) {
  if (isValid(src?.row, src?.col, rowCol) == false) {
    console.log("Source is invalid\n");
    return;
  }

  if (isValid(dest?.row, dest?.col, rowCol) == false) {
    console.log("Destination is invalid\n");
    return;
  }

  if (
    isUnBlocked(grid, src?.row, src?.col) == false ||
    isUnBlocked(grid, dest?.row, dest?.col) == false
  ) {
    console.log("Source or the destination is blocked\n");
    return;
  }

  if (isDestination(src?.row, src?.col, dest) == true) {
    console.log("We are already at the destination\n");
    return;
  }
  let closedList = new Array(rowCol?.row);
  for (let i = 0; i < rowCol?.row; i++) {
    closedList[i] = new Array(rowCol?.col).fill(false);
  }

  let cellDetails = new Array(rowCol?.row);
  for (let i = 0; i < rowCol?.row; i++) {
    cellDetails[i] = new Array(rowCol?.col);
  }

  let i;
  let j;

  for (i = 0; i < rowCol?.row; i++) {
    for (j = 0; j < rowCol?.col; j++) {
      cellDetails[i][j] = new cell();
      cellDetails[i][j].f = 2147483647;
      cellDetails[i][j].g = 2147483647;
      cellDetails[i][j].h = 2147483647;
      cellDetails[i][j].parent_i = -1;
      cellDetails[i][j].parent_j = -1;
    }
  }

  // Initialising the parameters of the starting node
  i = src?.row;
  j = src?.col;
  cellDetails[i][j].f = 0;
  cellDetails[i][j].g = 0;
  cellDetails[i][j].h = 0;
  cellDetails[i][j].parent_i = i;
  cellDetails[i][j].parent_j = j;

  let openList = new Map();

  openList.set(0, [i, j]);

  let foundDest = false;

  const finalPath = [];

  while (openList.size > 0) {
    let p = openList.entries().next().value;

    openList.delete(p[0]);

    i = p[1][0];
    j = p[1][1];
    closedList[i][j] = true;

    function processSuccessor(dx, dy) {
      const ni = i + dx;
      const nj = j + dy;

      if (isValid(ni, nj, rowCol) === true) {
        if (isDestination(ni, nj, dest) === true) {
          cellDetails[ni][nj].parent_i = i;
          cellDetails[ni][nj].parent_j = j;
          console.log("The destination cell is found\n");
          finalPath?.push(tracePath(cellDetails, dest, rowCol));
          foundDest = true;
          return true;
        } else if (!closedList[ni][nj] && isUnBlocked(grid, ni, nj)) {
          const gNew = cellDetails[i][j].g + (dx === 0 || dy === 0 ? 1 : 1.414);
          const hNew = calculateHValue(ni, nj, dest, methodH);
          const fNew = gNew + hNew;

          if (
            cellDetails[ni][nj].f == 2147483647 ||
            cellDetails[ni][nj].f > fNew
          ) {
            openList.set(fNew, [ni, nj]);

            // Update the details of this cell
            cellDetails[ni][nj].f = fNew;
            cellDetails[ni][nj].g = gNew;
            cellDetails[ni][nj].h = hNew;
            cellDetails[ni][nj].parent_i = i;
            cellDetails[ni][nj].parent_j = j;
          }
        }
      }
      return false;
    }

    // if (
    //   processSuccessor(-1, 0) || // North
    //   processSuccessor(1, 0) || // South
    //   processSuccessor(0, 1) || // East
    //   processSuccessor(0, -1) || // West
    //   processSuccessor(-1, 1) || // North-East
    //   processSuccessor(-1, -1) || // North-West
    //   processSuccessor(1, 1) || // South-East
    //   processSuccessor(1, -1) // South-West
    // ) {
    //   return finalPath;
    // }

    if (
      !limitMove &&
      (processSuccessor(-1, 0) || // North
        processSuccessor(1, 0) || // South
        processSuccessor(0, 1) || // East
        processSuccessor(0, -1) || // West
        processSuccessor(-1, 1) || // North-East
        processSuccessor(-1, -1) || // North-West
        processSuccessor(1, 1) || // South-East
        processSuccessor(1, -1)) // South-West
    ) {
      return finalPath;
    } else if (
      processSuccessor(-1, 0) || // North
      processSuccessor(1, 0) || // South
      processSuccessor(0, 1) || // East
      processSuccessor(0, -1)
    ) {
      return finalPath;
    }
  }
  if (foundDest === false) {
    alert("Failed to find the Destination Cell\n");
    return false;
  }

  return;
}
