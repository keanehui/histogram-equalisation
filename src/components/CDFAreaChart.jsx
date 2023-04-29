
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function CDFAreaChart({dataArr, title}) {

    return (
        <div style={{"width": "100%", "height": "200px"}}>
            <div>{title}</div>
            <ResponsiveContainer width="90%" height="100%">
                <AreaChart
                    width={400}
                    height={300}
                    data={dataArr}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="channelVal" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default CDFAreaChart;
