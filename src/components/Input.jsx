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
                setData((prev) => {
                    return {
                        ...prev,
                        w: this.width,
                        h: this.height
                    };
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
                let entropy = calculateEntropy(imageData);
                setData((prev) => {
                    return {
                        ...prev,
                        avgIntensity: avgIntensity,
                        entropy: entropy
                    };
                })
                console.log("statistics before", "avgIntensity", avgIntensity, "entropy", entropy);

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





