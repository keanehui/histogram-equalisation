
import "../styles/Process.css"
import { calculateAvgIntensity, calculateEntropy } from "./Statistics";
import { getVisualData } from "./Input";
import { useState } from "react";

function Process({data, setData}) {

    const [ignoreRange, setIgnoreRange] = useState(0);

    const handleIgnoreRangeChange = (event) => {
        setIgnoreRange(parseInt(event.target.value));
    };

    return (
        <div style={{"width": "100%"}}>
            <h2 className="text-center">Step 2 - Process</h2>

                <div style={{"width": "100%", "display": "flex", "flexDirection": "row", "alignItems": "center"}}>
                    <label style={{"marginLeft": "10px"}} htmlFor="modes">Mode: </label>
                    <select name="modes" id="modes" defaultValue="grayscale">
                        <option value="grayscale">Grayscale</option>
                        <option value="individual">Individual</option>
                    </select>

                    <div style={{"width": "200px", "display": "flex", "flexDirection": "column", "marginLeft": "50px"}}>
                        <label htmlFor="ignore-range">Ignore Range: {ignoreRange}</label>
                        <input type="range" min="0" max="127" defaultValue="0" id="ignore-range" onChange={handleIgnoreRangeChange} />
                    </div>
                    
                    <button type="button" style={{"marginLeft": "50px", "height": "18px"}} onClick={handleProcess}>Start Processing</button>  

                </div>

                
            
        </div>
    );

    function applyHistogramEqualization(imageData, mode) {
        if (mode === "grayscale") {
            let lowerBound = ignoreRange;
            let upperBound = 255 - ignoreRange;

            let grayHistogram = new Array(256).fill(0);

            for(let i = 0; i < imageData.data.length; i+=4){
                let r = imageData.data[i];
                let g = imageData.data[i+1];
                let b = imageData.data[i+2];

                if (r < lowerBound || 
                    r > upperBound || 
                    g < lowerBound || 
                    g > upperBound ||
                    b < lowerBound ||
                    b > upperBound
                ) {
                    continue;
                }

                let val = Math.round((r + g + b) / 3);
                ++grayHistogram[val];
            }

            // Build grayscale CDF
            let grayCDF = new Array(256).fill(0);
            grayCDF[0] = grayHistogram[0];
            for(let i = 1; i < 256; ++i){
                grayCDF[i] = grayCDF[i-1] + grayHistogram[i];
            }

            // normalize the cdf
            const normalizedCdf = grayCDF.map((value) => value / (imageData.data.length/4));

            let mapping = new Array(256).fill(0);
            for(let i = 0;  i < 256; ++i){
                mapping[i] = Math.round(255 * normalizedCdf[i]);
            }

            // map image value 
            for(let i = 0; i < imageData.data.length; i+=4){
                const rValue = imageData.data[i];
                const gValue = imageData.data[i+1];
                const bValue = imageData.data[i+2];

                if (rValue < lowerBound || 
                    rValue > upperBound || 
                    gValue < lowerBound || 
                    gValue > upperBound ||
                    bValue < lowerBound ||
                    bValue > upperBound
                ) {
                    continue;
                }

                imageData.data[i] = mapping[rValue];
                imageData.data[i + 1] = mapping[gValue];
                imageData.data[i + 2] = mapping[bValue];
            }

            
        } else { // individual
            let lowerBound = ignoreRange;
            let upperBound = 255-ignoreRange;


            let histograms = {
                r: new Array(256).fill(0),
                g: new Array(256).fill(0),
                b: new Array(256).fill(0)
            };
            for (let i = 0; i < imageData.data.length; i+=4) {
                let r = imageData.data[i];
                let g = imageData.data[i+1];
                let b = imageData.data[i+2];

                if (r < lowerBound || 
                    r > upperBound || 
                    g < lowerBound || 
                    g > upperBound ||
                    b < lowerBound ||
                    b > upperBound
                ) {
                    continue;
                }

                histograms.r[r]++;
                histograms.g[g]++;
                histograms.b[b]++;
            }

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
                if (rValue < lowerBound || 
                    rValue > upperBound || 
                    gValue < lowerBound || 
                    gValue > upperBound ||
                    bValue < lowerBound ||
                    bValue > upperBound
                ) {
                    continue;
                }
                imageData.data[i] = mappingFunctions.r[rValue];
                imageData.data[i+1] = mappingFunctions.g[gValue];
                imageData.data[i+2] = mappingFunctions.b[bValue];
            }
        }
    }

    function handleProcess() {
        let startTime = Date.now();
        let mode = document.getElementById("modes").value;
        console.log("Process mode", mode);
        if (!data.img) {
            alert("Upload an image to process!");
            return;
        }
        let w = data.w;
        let h = data.h;
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
            let entropy = calculateEntropy(imageData);
            ctx.putImageData(imageData, 0, 0);
            let dataURL = canvas.toDataURL();
            let visualData = getVisualData(imageData);
            console.log("visual data F", visualData);
            setData((prev) => {
                return {
                    ...prev,
                    avgIntensityF: avgIntensity,
                    entropyF: entropy,
                    outImg: dataURL,
                    delta: Date.now() - startTime,
                    histogramsF: visualData.histograms,
                    cdfsF: visualData.cdfs
                };
            });
            console.log("statistics after", "avgIntensity", avgIntensity, "entropy", entropy);
        }
        image.src = data.img;
    }

}

export default Process;
