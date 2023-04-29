import "../styles/Input.css"
import Statistics from "./Statistics";
import { calculateAvgIntensity, calculateEntropy } from "./Statistics";

function Input({img, dimensions, avgIntensity, entropy, delta, setDimensions, setAvgIntensity, setEntropy, setImg}) {

    const handleUpload = () => {
        const input = document.getElementById("image-input");
        console.log("uploaded!", input.files[0]);
        
        let reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.addEventListener("load", () => {
            
            let img = new Image();
            img.onload = function() {
                setDimensions({
                    w: this.width,
                    h: this.height
                });
                console.log("dimensions set, w h", this.width, this.height);

                // Calculating statistics
                let canvas = document.createElement("canvas");
                canvas.width = this.width;
                canvas.height = this.height;
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                let imageData = ctx.getImageData(0, 0, this.width, this.height);
                let avgIntensity = calculateAvgIntensity(imageData);
                setAvgIntensity(avgIntensity);
                let entropy = calculateEntropy(imageData);
                setEntropy(entropy);
                console.log("statistics before", "avgIntensity", avgIntensity, "entropy", entropy);

            };
            img.src = reader.result;
            setImg(reader.result);
            console.log("img set", reader.result);

        });
    };

    return (
        <div style={{"width": "100%"}}>
            <h2 className="text-center">Step 1 - Upload</h2>
            <input type="file" accept=".jpg, .jpeg, .png" name="" id="image-input" onChange={handleUpload} style={{"paddingLeft": "10px"}}/>
            <div className="flex-container">
                <div className="input-image-display">
                    { img !== "" && 
                        <img src={img} alt="" />
                    }
                </div>
                { img !== "" && 
                    <Statistics 
                        dimensions={dimensions} 
                        avgIntensity={avgIntensity} 
                        entropy={entropy} 
                        delta={delta}
                    />
                }
            </div>
            
        </div>
    );
}

export default Input;





