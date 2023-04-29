
import "../styles/Process.css"
import { calculateAvgIntensity, calculateEntropy } from "./Statistics";

function Process({dimensions, img, setOutImg, setAvgIntensityF, setEntropyF, setDelta}) {
    return (
        <div style={{"width": "100%"}}>
            <h2 className="text-center">Step 2 - Process</h2>
            <label style={{"marginLeft": "10px"}} htmlFor="modes">Mode: </label>
            <select name="modes" id="modes" defaultValue="grayscale">
                <option value="grayscale">Grayscale</option>
                <option value="individual">Individual</option>
            </select>
            <button type="button" className="process-btn" onClick={handleProcess}>Start Processing</button>  
        </div>
    );

    function applyHistogramEqualization(imageData, mode) {
        if (mode === "grayscale") {
            // TODO: Implementation for grayscale histogram
            for (let i = 0; i < imageData.data.length; i+=4) {
                imageData.data[i] = 0;
                imageData.data[i+1] = 0;
                imageData.data[i+2] = 0;
            }



            // arbitary commnet 

            
        } else {
            // Build histograms
            let histograms = {
                r: new Array(256).fill(0),
                g: new Array(256).fill(0),
                b: new Array(256).fill(0)
            };
            for (let i = 0; i < imageData.data.length; i+=4) {
                histograms.r[imageData.data[i]]++;
                histograms.g[imageData.data[i]]++;
                histograms.b[imageData.data[i]]++;
            }

            // Build CDF
            const mappingFunctions = {
                r: [],
                g: [],
                b: []
            };
            for (const [c, histogram] of Object.entries(histograms)) {
                let cdf = new Array(256).fill(0);
                cdf[0] = histogram[0];
                for (let i = 1; i < 256; ++i) {
                    cdf[i] = cdf[i-1] + histogram[i];
                }

                const normalizedCdf = cdf.map((value) => value / (imageData.data.length/4) );
                const mapping = new Array(256).fill(0);
                for (let i = 0; i < 256; ++i) {
                    mapping[i] = Math.round(255 * normalizedCdf[i]);
                }
                mappingFunctions[c] = mapping;
            }

            for (let i = 0; i < imageData.data.length; i+=4) {
                const rValue = imageData.data[i];
                const gValue = imageData.data[i+1];
                const bValue = imageData.data[i+2];
                imageData.data[i] = mappingFunctions.r[rValue];
                imageData.data[i+1] = mappingFunctions.g[gValue];
                imageData.data[i+2] = mappingFunctions.b[bValue];
            }
        }
    }

    function handleProcess() {
        let startTime = Date.now();
        let endTime = startTime;
        let mode = document.getElementById("modes").value;
        console.log("Process mode", mode);
        if (!img) {
            alert("Upload an image to process!");
            return;
        }
        let w = dimensions.w;
        let h = dimensions.h;
        let canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        let ctx = canvas.getContext("2d");

        let image = new Image();
        image.onload = function() {
            ctx.drawImage(image, 0, 0);
            let imageData = ctx.getImageData(0, 0, w, h);
            
            applyHistogramEqualization(imageData, mode);

            // Calculating statistics
            let avgIntensity = calculateAvgIntensity(imageData);
            setAvgIntensityF(avgIntensity);
            let entropy = calculateEntropy(imageData);
            setEntropyF(entropy);
            console.log("statistics after", "avgIntensity", avgIntensity, "entropy", entropy);

            ctx.putImageData(imageData, 0, 0);
            let dataURL = canvas.toDataURL();
            setOutImg(dataURL);
            console.log("outImg set", dataURL);

            endTime = Date.now();
            let delta = endTime - startTime;
            setDelta(delta);
            console.log("delta", delta);
        }
        image.src = img;
    }

}

export default Process;
