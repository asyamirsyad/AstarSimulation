import { useEffect, useState } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Input from "./components/Input";
import Button from "./components/Button";

function App() {
  const [row, setRow] = useState(3);
  const [col, setCol] = useState(3);
  const [trig, setTrig] = useState({});
  const [deactivated, setDeactivated] = useState(false);

  useEffect(() => {
    if (deactivated) {
      setDeactivated(false);
    }
  }, [trig]);

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const generateMap = () => {
    setDeactivated(true);
    setTrig({ row, col });
  };

  return (
    <div>
      <Input label={"row"} onChange={(e) => handleInputChange(e, setRow)} />
      <Input label={"col"} onChange={(e) => handleInputChange(e, setCol)} />
      <Button onClick={generateMap}>generate map</Button>
      <Grid
        col={trig.col}
        row={trig.row}
        numActive={5}
        deactivatePositions={deactivated}
      />
    </div>
  );
}

export default App;
