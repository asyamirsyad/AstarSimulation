function manhattan({ node, end_node }) {
  return (
    Math.abs(node?.row - end_node?.row) + Math.abs(node?.col - end_node?.col)
  );
}

function euclidean({ node, end_node }) {
  const rowDistance = Math.pow(node?.row - end_node?.row, 2);
  const colDistance = Math.pow(node?.col - end_node?.col, 2);
  return Math.sqrt(rowDistance + colDistance);
}

function areObjectsEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

export function astar({
  start_node = {},
  end_node = {},
  walls = [],
  totalRow,
  totalCol,
}) {
  const availablePath = [];

  const currentPosition = {};

  for (let r = 0; r < totalRow; r++) {
    const availableRow = [];
    for (let c = 0; c < totalCol; c++) {
      const isWall = walls.some(({ row, col }) => row === r && col === c);
      availableRow?.push(isWall ? 0 : 1);
    }
    availablePath?.push(availableRow);
  }

  console.log(availablePath);
  console.log(walls);
  console.log(start_node, end_node);
}

// export function astar({ start_node, end_node, walls }) {
//   const openSet = [start_node];
//   const closedSet = new Set();
//   const cameFrom = {};

//   //   console.log(openSet);

//   const gScore = {};
//   const fScore = {};

//   gScore[start_node] = 0;
//   fScore[start_node] = heuristic({ node: start_node, end_node: end_node });

//   //   console.log(fScore[start_node]);

//   while (openSet?.length > 0) {
//     openSet?.sort((a, b) => fScore[a] - fScore[b]);
//     const current = openSet?.shift();

//     if (areObjectsEqual(current, end_node)) {
//       // if (current === end_node) {
//       // Reconstruct the path from end to start
//       const path = [];
//       let node = current;
//       while (node) {
//         path?.unshift(node);
//         node = cameFrom[node];
//       }
//       console.log(path);
//       return path;
//     }

//     closedSet?.add(current);

//     const neighbors = [
//       { row: current?.row - 1, col: current?.col }, // Up
//       { row: current?.row + 1, col: current?.col }, // Down
//       { row: current?.row, col: current?.col - 1 }, // Left
//       { row: current?.row, col: current?.col + 1 }, // Right
//     ];

//     for (const neighbor of neighbors) {
//       if (
//         walls?.some(
//           (wall) => wall?.row === neighbor?.row && wall?.col === neighbor?.col
//         )
//       ) {
//         continue; // Skip walls
//       }

//       if (!closedSet?.has(neighbor)) {
//         const tentativeGScore = gScore[current] + 1; // Assuming each move has a cost of 1

//         if (
//           !openSet?.includes(neighbor) ||
//           tentativeGScore < gScore[neighbor]
//         ) {
//           cameFrom[neighbor] = current;
//           gScore[neighbor] = tentativeGScore;
//           fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, end_node);

//           if (!openSet?.includes(neighbor)) {
//             openSet?.push(neighbor);
//           }
//         }
//       }
//     }
//     break;
//   }

//   return null; // No path found
// }
