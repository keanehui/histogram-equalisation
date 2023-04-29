
import "./App.css"
import { useState } from "react";
import Input from "./components/Input";
import Process from "./components/Process";
import Download from "./components/Download";
import DataVisual from "./components/DataVisual";

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
    histograms: {
      r: [],
      g: [],
      b: [],
      G: []
    },
    histogramsF: {
      r: [],
      g: [],
      b: [],
      G: []
    },
    cdfs: {
      r: [],
      g: [],
      b: [], 
      G: []
    },
    cdfsF: {
      r: [],
      g: [],
      b: [], 
      G: []
    }
  });

  return (
    <div className="App" style={{"width": "100%"}}>
      <Title />
      <Input data={data} setData={setData} />
      <Process data={data} setData={setData} />
      <Download data={data} setData={setData} />
      { data.outImg && 
        <DataVisual data={data} />
      }
      <div style={{"width": "100%", "height": "200px"}}></div>
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
