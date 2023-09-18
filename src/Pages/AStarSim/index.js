import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { mapping } from "../../functions/helpers";
import { aStarSearch } from "../../functions/AStar";
import Input from "../../components/Input";
import Drop from "../../components/Dropdown";
import { CheckBox } from "../../components/CheckBox";
import Button from "../../components/Button";
import Grid from "../../components/Grid";

const AStarSim = () => {
  const [gridParams, setGridParams] = useState({
    row: 3,
    col: 3,
    wallQty: 0,
  });
  const [deactivated, setDeactivated] = useState(false);
  const [gridVessel, setGridVessel] = useState({});
  const [heuristic, setHeuristic] = useState("euc");
  const [limitMove, setLimitMove] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [startEnd, setStartEnd] = useState([]);
  const [wall, setWall] = useState([]);
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

    setTrigger(!trigger);
    setDeactivated(true);
    setGridVessel({ ...gridParams, wallQty: parseInt(totalWall) });
    setStartEnd([]);
    setPath([]);
  };

  useEffect(() => {
    let startEndIdx;
    let rowCol;
    let finalPath;

    if (startEnd?.length === 2) {
      startEndIdx = startEnd;
      rowCol = { row: gridVessel?.row, col: gridVessel?.col };

      const map = mapping({
        walls: wall,
        totalCol: gridVessel?.col,
        totalRow: gridVessel?.row,
      });

      finalPath =
        aStarSearch(
          map,
          startEnd[0],
          startEnd[1],
          rowCol,
          heuristic,
          limitMove
        ) || [];
      if (!finalPath) {
        setPath([]);
        setStartEnd([]);
        setDeactivated(true);
      } else setPath(finalPath[0]);
    }

    if (startEnd?.length > 2) {
      setPath([]);
      setStartEnd([]);
      setDeactivated(true);
    }
  }, [wall, startEnd]);

  return (
    <>
      <Container fluid>
        <div style={styles.container}>
          <div style={{ backgroundColor: "" }}>
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
            <Drop
              style={{ marginTop: 4 }}
              label="heuristic f(h)"
              options={[
                { label: "euclidien", value: "euc" },
                { label: "manhattan", value: "manh" },
              ]}
              onSelect={(value) => {
                setHeuristic(value);
              }}
              setLabel={
                heuristic === "euc"
                  ? "euclidien"
                  : heuristic === "manh"
                  ? "manhattan"
                  : ""
              }
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: "monospace",
              }}
            >
              <span>disable move diagonal</span>
              <CheckBox
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setLimitMove(isChecked);
                }}
              />
            </div>
            {startEnd.length < 2 ? (
              <Button
                onClick={generateMap}
                style={{ marginBlock: 4, width: "100%" }}
              >
                generate map
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setPath([]);
                  setStartEnd([]);
                  setDeactivated(true);
                }}
                style={{ marginBlock: 4, width: "100%" }}
              >
                clear path
              </Button>
            )}
          </div>
          <GridContainer
            deactivated={deactivated}
            setStartEnd={setStartEnd}
            gridVessel={gridVessel}
            setTrigger={trigger}
            setWall={setWall}
            path={path}
          />
        </div>
      </Container>
    </>
  );
};

function GridContainer({
  path,
  gridVessel,
  deactivated,
  setStartEnd,
  setTrigger,
  setWall,
}) {
  return (
    <div>
      <Grid
        col={gridVessel.col}
        row={gridVessel.row}
        numActive={gridVessel.wallQty}
        onTrigger={setTrigger}
        activePositions={path || []}
        deactivatePositions={deactivated}
        onChangeValue={(data, gridI) => {
          setStartEnd((prev) => {
            const newData = [];
            if (data) {
              newData?.push(...prev, gridI);
            } else if (!data) {
              newData?.shift();
            }
            return newData;
          });
        }}
        getWallPositions={(position) => {
          setWall(position);
        }}
      />
      <div style={{ marginTop: "20px" }}>
        <h3>Path Details</h3>
        <ul>
          {path.map((position, index) => (
            <li key={index}>
              Row: {position.row}, Col: {position.col}, f: {position.f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    margin: 10,
  },
};

export default AStarSim;
