
import "../styles/Download.css"
import Statistics from "./Statistics";


function Download({data}) {
    return (
        <div style={{"width": "100%"}}>
            <h2 className="text-center">Step 3 - Download</h2>

            { data.outImg && (
                <div>
                    <button type="button" className="save-btn" onClick={handleSave}>Save Image</button>
                    <div className="flex-container">
                        <div className="output-image-display">
                            <img src={data.outImg} style={{"maxWidth": "1000px"}} alt="" />
                        </div>
                        <Statistics data={data} phase="after" />
                    </div>
                </div>
            )}
        </div>
    );

    function handleSave() {
        if (!data.outImg) {
            alert("Process an image before save!");
            return;
        }
        let a = document.createElement("a");
        a.href = data.outImg;
        a.download = "output";
        a.click();
    }
}

export default Download;
