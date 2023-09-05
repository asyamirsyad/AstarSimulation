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
  const map = [];

  const currentPosition = {};

  for (let r = 0; r < totalRow; r++) {
    const availableRow = [];
    for (let c = 0; c < totalCol; c++) {
      const isWall = walls.some(({ row, col }) => row === r && col === c);
      availableRow?.push(isWall ? 0 : 1);
    }
    map?.push(availableRow);
  }

  // console.log(map);
  // console.log(walls);
  // console.log(start_node, end_node);

  return { map: map, scr: start_node, dest: end_node };
}
