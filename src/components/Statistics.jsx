
import "../styles/Statistics.css"

function Statistics(props) {
    return (
        <div className="stats">
            <h1>Statistics</h1>
            <div style={{"height": "300px", "display": "flex", "flexDirection": "column", "justifyContent": "space-around"}}>
                <div>width: {props.dimensions.w} px</div>
                <div>height: {props.dimensions.h} px</div>
                <div>average intensity: {props.avgIntensity}</div>
                <div>entropy: {props.entropy}</div>
                <div>time delta: {props.delta} ms</div>
            </div>
        </div>
    );
}

export default Statistics;



export const calculateAvgIntensity = (imageData) => {
    let totalIntensity = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
        const intensity = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
        totalIntensity += intensity;
    }
    const averageIntensity = totalIntensity / (imageData.data.length / 4);

    return averageIntensity;
}

export const calculateEntropy = (imageData) => {
    const pixelCounts = new Array(256).fill(0);
    const pixelProbabilities = new Array(256).fill(0);
    const pixelEntropy = new Array(256).fill(0);

    // Count the number of times each intensity value occurs in the image
    for (let i = 0; i < imageData.data.length; i += 4) {
        const intensity = Math.floor((imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3);
        pixelCounts[intensity]++;
    }

    // Calculate the probability of each intensity value occurring
    for (let i = 0; i < pixelCounts.length; i++) {
        pixelProbabilities[i] = pixelCounts[i] / imageData.data.length;
    }

    // Calculate the entropy of each intensity value
    for (let i = 0; i < pixelProbabilities.length; i++) {
        if (pixelProbabilities[i] !== 0) {
        pixelEntropy[i] = -1 * pixelProbabilities[i] * Math.log2(pixelProbabilities[i]);
        }
    }

    // Calculate the total entropy of the image
    const entropy = pixelEntropy.reduce((acc, val) => {
        return acc + val;
    }, 0);

    return entropy;
}
