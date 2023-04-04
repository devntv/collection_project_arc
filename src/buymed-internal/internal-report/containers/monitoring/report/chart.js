import {Box, Paper} from "@material-ui/core";
import {ArgumentAxis, Chart, Title, Tooltip, ValueAxis, Legend} from "@devexpress/dx-react-chart-material-ui";
import styles from './report.module.css'
import {EventTracker, LineSeries, PieSeries, ValueScale} from "@devexpress/dx-react-chart";
import {scaleLinear} from "@devexpress/dx-chart-core";
import React from "react"

function formatNumber(number) {
    return Object(number).toString().replace(/\d(?=(\d{3})+$)/g, '$&,');
}

function Content({label, value, userCount, span, t}) {

    return <Paper style={{padding: "4px 8px"}}>
        {t(`common:time.${span.toLowerCase()}`)} {label}<br/>
        {t`monitoring:action_count`}: <b>{formatNumber(value)}</b><br/>
        {t`monitoring:user_count`}: <b>{formatNumber(userCount)}</b>
    </Paper>
}

export function AnalyticsChart({title, data, span, t}) {
    let max = -1
    data.forEach(item => {
        if (max < item.value) {
            max = item.value
        }
    })

    const [targetItem, setTargetItem] = React.useState()

    return <Chart
        data={data}
    >
        <ValueScale factory={() => getScale(max)} modifyDomain={() => [0, max]}/>
        <ArgumentAxis/>
        <ValueAxis/>
        <LineSeries name={t`monitoring:action_count`} valueField="value" argumentField="label"/>
        <LineSeries name={t`monitoring:user_count`} valueField="userCount" argumentField="label"/>
        <Legend markerComponent={markerComponent}
                labelComponent={(props) => <Legend.Label {...props} />}
                itemComponent={(props) => <Legend.Item {...props} children={props.children}/>}
                rootComponent={(props) => <Legend.Root {...props} children={props.children}/>}
        />
        <EventTracker/>
        <Tooltip
            sheetComponent={(props) => {
                const targetItem = props.children.props.targetItem
                let {label, value, userCount} = data[targetItem.point]
                return Content({label, value, userCount, span, t})
            }}

            arrowComponent={() => (<></>)}
            targetItem={targetItem}
            onTargetItemChange={setTargetItem}
        />
    </Chart>
}



function markerComponent({name, color}) {
    return <Legend.Marker style={{fill: color}}/>
}

export function AnalyticsPie({data, className, height = 200, t}) {
    const [targetItem, setTargetItem] = React.useState()

    return <Box className={className}>
        <Chart
            data={data}
            height={height}
        >
            <Legend markerComponent={markerComponent}
                    labelComponent={(props) => <Legend.Label {...props} />}
                    itemComponent={(props) => <Legend.Item {...props} children={props.children}/>}
                    rootComponent={(props) => <Legend.Root {...props} children={props.children}/>}
            />
            <PieSeries valueField="value" argumentField="label"/>
            <EventTracker/>
            <Tooltip
                sheetComponent={(props) => {
                    const targetItem = props.children.props.targetItem
                    let {label, value, ratio} = data[targetItem.point]
                    return <Paper style={{padding: "4px 8px"}}>
                        <b style={{color: "#002288", fontSize: "105%"}}>{label}</b><br/>
                        {t`monitoring:action_count`}: <b>{formatNumber(value)}</b><br/>
                        {ratio}%
                    </Paper>
                }}

                arrowComponent={() => (<></>)}
                targetItem={targetItem}
                onTargetItemChange={setTargetItem}
            />
        </Chart>
    </Box>
}