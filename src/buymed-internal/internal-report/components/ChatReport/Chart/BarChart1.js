import { BarChart, CartesianGrid, XAxis, YAxis, Bar, LabelList, ResponsiveContainer } from 'recharts';
import React, { useEffect, useMemo } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export function firstDigit(x) {
    let y = 1;
    while (x > 9) {
        x /= 10;
        y *= 10;
    }
    return Math.ceil(x) * y + 2*y;
}

const BarChart1 = ({ label, chartData }) => {
    return (
        <Grid container
            style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                "& > div > div > svg": {
                    overflow: "visible"
                },
                padding: "30px 0"
            }}
            
        >
            <Grid item
                style={{
                    transform: "rotate(180deg)",
                    alignSelf: "flex-start",
                    textAlign: "right",
                    writingMode: "vertical-rl",
                    
                }}
            >
                <Typography
                    fontWeight={500}
                    style={{
                        width: "max-content",
                        textAlign: "right"
                    }}
                >
                    {label}
                </Typography>
            </Grid>
            <ResponsiveContainer width={"99%"} height={500}>
                <BarChart
                    data={chartData}
                    height={400}
                >
                    <CartesianGrid vertical={false} />
                    {chartData.length <= 10 ? 
                    <XAxis tick={{fontSize: "12px"}} dataKey="name" tickLine={false}/>
                    : chartData.length <= 20 ?
                    <XAxis tick={{fontSize: "12px"}} dataKey="name" tickLine={false} angle={-35} minTickGap={0} height={80} allowDataOverflow={true} textAnchor="end" interval={0}/>
                    : <XAxis tick={{fontSize: "12px"}} dataKey="name" tickLine={false} angle={-45} minTickGap={0} height={80} allowDataOverflow={true} textAnchor="end" interval={0}/>}
                    <YAxis tick={{fontSize: "12px"}} allowDecimals={false} axisLine={false} tickLine={false} tickCount={11} width={40} domain={[0, dataMax => firstDigit(dataMax)]}/> 
                    <Bar isAnimationActive={false} dataKey="value" fill="#70ad47" maxBarSize={40} minPointSize={2}>
                        <LabelList position="top" fill='black' />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

        </Grid>
    );
}

export default BarChart1;