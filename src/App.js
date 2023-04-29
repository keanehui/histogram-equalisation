
import "./App.css"
import Input from "./components/Input";
import Process from "./components/Process";
import Download from "./components/Download";
import { useState } from "react";

function App() {
  const [dimensions, setDimensions] = useState({w: 0, h: 0});
  const [avgIntensity, setAvgIntensity] = useState(0);
  const [avgIntensityF, setAvgIntensityF] = useState(0);
  const [entropy, setEntropy] = useState(0);
  const [entropyF, setEntropyF] = useState(0);
  const [delta, setDelta] = useState(Date.now());

  const [img, setImg] = useState("");
  const [outImg, setOutImg] = useState("");

  return (
    <div className="App" style={{"width": "100%"}}>
      <Title />
      <Input 
        img={img} 
        dimensions={dimensions}
        avgIntensity={avgIntensity}
        entropy={entropy}
        delta={0}
        setDimensions={setDimensions} 
        setAvgIntensity={setAvgIntensity}
        setEntropy={setEntropy}
        setImg={setImg} 
      />
      <Process 
        dimensions={dimensions} 
        img={img} 
        setOutImg={setOutImg}  
        setAvgIntensityF={setAvgIntensityF} 
        setEntropyF={setEntropyF} 
        setDelta={setDelta}
      />
      <Download 
        outImg={outImg} 
        dimensions={dimensions}
        avgIntensityF={avgIntensityF}
        entropyF={entropyF}
        delta={delta}
      />
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
