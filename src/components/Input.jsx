import "../styles/Input.css"
import Statistics from "./Statistics";
import { calculateAvgIntensity, calculateEntropy } from "./Statistics";

function Input({data, setData}) {

    const handleUpload = () => {
        const input = document.getElementById("image-input");
        console.log("uploaded!", input.files[0]);
        
        let reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.addEventListener("load", () => {
            
            let img = new Image();
            img.onload = function() {
                // Calculating statistics
                let canvas = document.createElement("canvas");
                canvas.width = this.width;
                canvas.height = this.height;
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                let imageData = ctx.getImageData(0, 0, this.width, this.height);
                let avgIntensity = calculateAvgIntensity(imageData);
                let entropy = calculateEntropy(imageData);
                let visualData = getVisualData(imageData);
                setData((prev) => {
                    return {
                        ...prev,
                        w: this.width,
                        h: this.height,
                        avgIntensity: avgIntensity,
                        entropy: entropy,
                        histograms: visualData.histograms,
                        cdfs: visualData.cdfs
                    };
                })
                console.log("dimensions set, w h", this.width, this.height);
                console.log("statistics before", "avgIntensity", avgIntensity, "entropy", entropy);
                console.log("visual data set", visualData);
            };
            img.src = reader.result;
            setData((prev) => {
                return {
                    ...prev,
                    img: reader.result
                };
            });
            console.log("img set", reader.result);

        });
    };

    return (
        <div style={{"width": "100%"}}>
            <h2 className="text-center">Step 1 - Upload</h2>
            <input type="file" accept=".jpg, .jpeg, .png" name="" id="image-input" onChange={handleUpload} style={{"paddingLeft": "10px"}}/>
            <div className="flex-container">
                <div className="input-image-display">
                    { data.img !== "" && 
                        <img src={data.img} alt="" />
                    }
                </div>
                { data.img !== "" && 
                    <Statistics data={data} phase="before" />
                }
            </div>
            
        </div>
    );
}

export default Input;

export function getVisualData(imageData) {
    let result = {
        histograms: {
            r: new Array(256).fill(0),
            g: new Array(256).fill(0),
            b: new Array(256).fill(0),
            G: new Array(256).fill(0)
        },
        cdfs: {
            r: new Array(256).fill(0),
            g: new Array(256).fill(0),
            b: new Array(256).fill(0), 
            G: new Array(256).fill(0)
          }
    }

    for (let i = 0; i < imageData.data.length; i+=4) {
        let r = imageData.data[i];
        let g = imageData.data[i+1];
        let b = imageData.data[i+2];
        let G = Math.round((r+g+b)/3);
        result.histograms.r[r]++;
        result.histograms.g[g]++;
        result.histograms.b[b]++;
        result.histograms.G[G]++;
    }

    for (const [c, histogram] of Object.entries(result.histograms)) {
        result.cdfs[c][0] = histogram[0];
        for (let i = 1; i < 256; ++i) {
            result.cdfs[c][i] = result.cdfs[c][i-1] + histogram[i];
        }
        result.cdfs[c] = result.cdfs[c].map((value) => value / (imageData.data.length/4));
    }

    return result;
}




