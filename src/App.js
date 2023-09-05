import React, { useEffect, useState } from "react";
import Grid from "./components/Grid";
import Input from "./components/Input";
import Button from "./components/Button";
import { Container } from "react-bootstrap";
import Navbar from "./components/NavBar";
import { astar } from "./functions/AStar";
import { aStarSearch } from "./functions/tes";

function App() {
  const [gridParams, setGridParams] = useState({
    row: 3,
    col: 3,
    wallQty: 0,
  });
  const [deactivated, setDeactivated] = useState(false);
  const [gridVessel, setGridVessel] = useState({});
  const [startEnd, setStartEnd] = useState([]);
  const [wall, setWall] = useState([]);
  // const [varAstar, setVarAstar] = useState({});
  const [path, setPath] = useState([]);

  useEffect(() => {
    if (deactivated) {
      setDeactivated(false);
    }
  }, [deactivated]);

  const handleInputChange = (e, key) => {
    setGridParams({
      ...gridParams,
      [key]: e.target.value,
    });
  };

  const generateMap = () => {
    const { row, col, wallQty } = gridParams;
    const totalWall = (parseInt(row) * parseInt(col) * parseInt(wallQty)) / 100;
    setDeactivated(true);
    setStartEnd([]);
    setPath([]);
    setGridVessel({ ...gridParams, wallQty: parseInt(totalWall) });
  };

  useEffect(() => {
    let startEndIdx;
    let rowCol;
    let finalPath;

    if (startEnd?.length === 2) {
      startEndIdx = startEnd;
      rowCol = { row: gridVessel?.row, col: gridVessel?.col };

      const f = astar({
        start_node: startEndIdx[0],
        end_node: startEndIdx[1],
        walls: wall,
        totalCol: gridVessel?.col,
        totalRow: gridVessel?.row,
      });

      finalPath = aStarSearch(f?.map, f?.scr, f?.dest, rowCol);
      setPath(finalPath[0]);
    }

    if (startEnd?.length > 2) {
      setStartEnd([]);
      setDeactivated(true);
    }
  }, [wall, startEnd]);

  console.log("path", path);

  return (
    <>
      <Navbar title={"A* Simulation"} />
      <Container fluid>
        <Input
          label={"row"}
          onChange={(e) => handleInputChange(e, "row")}
          type={"number"}
          value={gridParams.row}
        />
        <Input
          label={"col"}
          onChange={(e) => handleInputChange(e, "col")}
          type={"number"}
          value={gridParams.col}
        />
        <Input
          label={"wall"}
          onChange={(e) => handleInputChange(e, "wallQty")}
          type={"number"}
          placeholder={"%"}
          suffix={"%"}
          value={gridParams.wallQty}
        />
        <Button onClick={generateMap} style={{ marginBlock: 4 }}>
          generate map
        </Button>
        <Grid
          col={gridVessel.col}
          row={gridVessel.row}
          numActive={gridVessel.wallQty}
          activePositions={path}
          deactivatePositions={deactivated}
          onChangeValue={(data, gridI) => {
            setStartEnd((prev) => {
              if (data) {
                return [...prev, gridI];
              }
              return prev;
            });
          }}
          getWallPositions={(position) => {
            setWall(position);
          }}
        />
      </Container>
    </>
  );
}

export default App;
