import { BarChart, CartesianGrid, XAxis, YAxis, Bar, LabelList, ResponsiveContainer } from 'recharts';
import React from 'react'
import Box from '@material-ui/core/Box';


const BarChat2 = ({ chartData }) => {
    return (
        <Box padding={2} sx={{"& > div > div > svg": {overflow: "visible"}}}>
            <ResponsiveContainer width={"95%"} minHeight={200} height={200 + chartData.length * 15}>
                <BarChart
                    data={chartData}
                    layout="vertical"
                >
                    <CartesianGrid horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis 
                        tick={{fontSize: "12px", width: "100%"}} 
                        tickFormatter={(value) => value.toLocaleString().replace(/ /g, '\u00A0')} 
                        interval={0} minTickGap={0} 
                        allowDataOverflow={true} 
                        type="category" 
                        width={150} padding={{ left: 20 }} 
                        dataKey="name" 
                        tickLine={false} 
                        allowDuplicatedCategory={true} 
                    />
                    <Bar minPointSize={2} dataKey="value" fill="#70ad47" maxBarSize={20}>
                        <LabelList position="right" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Box>
    )
}

export default BarChat2;