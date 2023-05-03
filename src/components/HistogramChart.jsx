
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function HistogramChart({dataArr, title}) {

    return (
        <div style={{"width": "100%", "height": "200px"}}>
            <div>{title}</div>
            <ResponsiveContainer width="90%" height="100%">
                <BarChart
                    width={400}
                    height={300}
                    data={dataArr}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="channelVal" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default HistogramChart;