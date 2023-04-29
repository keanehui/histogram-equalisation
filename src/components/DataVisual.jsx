

import HistogramChart from './HistogramChart';

import '../styles/DataVisual.css'
import CDFAreaChart from './CDFAreaChart';

function DataVisual({data}) {
    return (
        <div style={{"width": "100%", "height": "auto"}}>
            <h2 className="text-center">Data Visualisation</h2>
            
            <div className='grid-container'>
                <div className='grid-item'><HistogramChart dataArr={mapper(data.histograms.G)} title="Histogram - Grayscale (Before)" /></div>
                <div className='grid-item'><HistogramChart dataArr={mapper(data.histogramsF.G)} title="Histogram - Grayscale (after)" /></div>
                <div className='grid-item'><HistogramChart dataArr={mapper(data.histograms.r)} title="Histogram - Red (Before)" /></div>
                <div className='grid-item'><HistogramChart dataArr={mapper(data.histogramsF.r)} title="Histogram - Red (After)" /></div>
                <div className='grid-item'><HistogramChart dataArr={mapper(data.histograms.g)} title="Histogram - Green (Before)" /></div>
                <div className='grid-item'><HistogramChart dataArr={mapper(data.histogramsF.g)} title="Histogram - Green (After)" /></div>
                <div className='grid-item'><HistogramChart dataArr={mapper(data.histograms.b)} title="Histogram - Blue (Before)" /></div>
                <div className='grid-item'><HistogramChart dataArr={mapper(data.histogramsF.b)} title="Histogram - Blue (After)" /></div>
                <div className="grid-item"><CDFAreaChart dataArr={mapper(data.cdfs.G)} title="CDF - Grayscale (Before)" /></div>
                <div className="grid-item"><CDFAreaChart dataArr={mapper(data.cdfsF.G)} title="CDF - Grayscale (After)" /></div>
                <div className="grid-item"><CDFAreaChart dataArr={mapper(data.cdfs.r)} title="CDF - Red (Before)" /></div>
                <div className="grid-item"><CDFAreaChart dataArr={mapper(data.cdfsF.r)} title="CDF - Red (After)" /></div>
                <div className="grid-item"><CDFAreaChart dataArr={mapper(data.cdfs.g)} title="CDF - Green (Before)" /></div>
                <div className="grid-item"><CDFAreaChart dataArr={mapper(data.cdfsF.g)} title="CDF - Green (After)" /></div>
                <div className="grid-item"><CDFAreaChart dataArr={mapper(data.cdfs.b)} title="CDF - Blue (Before)" /></div>
                <div className="grid-item"><CDFAreaChart dataArr={mapper(data.cdfsF.b)} title="CDF - Blue (After)" /></div>
            </div>
        </div>
    );

    function mapper(arr) {
        return arr.map((element, index) => {
            return {
                channelVal: index,
                value: element
            };
        });
    }
}

export default DataVisual;
