
import "./App.css"
import Input from "./components/Input";
import Process from "./components/Process";
import Download from "./components/Download";
import { useState } from "react";

function App() {

  const [data, setData] = useState({
    img: "",
    outImg: "",
    w: 0,
    h: 0,
    avgIntensity: 0,
    avgIntensityF: 0,
    entropy: 0,
    entropyF: 0,
    delta: 0,
  })

  return (
    <div className="App" style={{"width": "100%"}}>
      <Title />
      <Input data={data} setData={setData} />
      <Process data={data} setData={setData} />
      <Download data={data} setData={setData} />
    </div>
  );

  function Title() {
    return (
      <div>
        <h1 style={{"width": "100%", "textAlign": "center"}}>
          Image Optimiser with Histogram Equalisation
        </h1>
      </div>
    );
  }
}

export default App;
