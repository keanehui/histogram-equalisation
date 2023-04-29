
import "../styles/Download.css"
import Statistics from "./Statistics";


function Download({data, setData}) {
    return (
        <div style={{"width": "100%"}}>
            <h2 className="text-center">Step 3 - Download</h2>
            <button type="button" className="save-btn" onClick={handleSave}>Save Image</button>
            <div className="flex-container">
                <div className="output-image-display">
                    { data.outImg !== "" && 
                        <img src={data.outImg} alt="" />
                    }
                </div>
                { data.outImg !== "" && 
                    <Statistics data={data} phase="after" />
                }
            </div>
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
