import { useEffect, useState } from "react";
import Grid from "./components/Grid";
import Input from "./components/Input";
import Button from "./components/Button";
import { Container, Row } from "react-bootstrap";
import Navbar from "./components/NavBar";

function App() {
  const [row, setRow] = useState(3);
  const [col, setCol] = useState(3);
  const [trig, setTrig] = useState({});
  const [deactivated, setDeactivated] = useState(false);
  const [wall, setWall] = useState([]);
  const [wallQty, setWallQty] = useState();

  useEffect(() => {
    if (deactivated) {
      setDeactivated(false);
    }
  }, [deactivated]);

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const generateMap = () => {
    setDeactivated(true);
    setTrig({ row, col, wallQty });
  };

  useEffect(() => {
    console.log(wall);
  }, [wall]);

  return (
    <>
      <Navbar title={"A* Simulation"} />
      <Container fluid>
        <Input label={"row"} onChange={(e) => handleInputChange(e, setRow)} />
        <Input label={"col"} onChange={(e) => handleInputChange(e, setCol)} />
        <Input
          label={"wall"}
          onChange={(e) => handleInputChange(e, setWallQty)}
        />
        <Button onClick={generateMap} style={{ marginBlock: 4 }}>
          generate map
        </Button>
        <Grid
          col={trig.col}
          row={trig.row}
          numActive={trig.wallQty}
          deactivatePositions={deactivated}
          onChangeValue={(data, gridI) => {
            console.log(data, gridI);
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
