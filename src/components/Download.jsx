
import "../styles/Download.css"
import Statistics from "./Statistics";


function Download({outImg, dimensions, avgIntensityF, entropyF, delta}) {
    return (
        <div style={{"width": "100%"}}>
            <h2 className="text-center">Step 3 - Download</h2>
            <button type="button" className="save-btn" onClick={handleSave}>Save Image</button>
            <div className="flex-container">
                <div className="output-image-display">
                    { outImg !== "" && 
                        <img src={outImg} alt="" />
                    }
                </div>
                { outImg !== "" && 
                    <Statistics 
                        dimensions={dimensions} 
                        avgIntensity={avgIntensityF} 
                        entropy={entropyF} 
                        delta={delta}
                    />
                }
            </div>
        </div>
    );

    function handleSave() {
        if (!outImg) {
            alert("Process an image before save!");
            return;
        }
        let a = document.createElement("a");
        a.href = outImg;
        a.download = "output";
        a.click();
    }
}

export default Download;
