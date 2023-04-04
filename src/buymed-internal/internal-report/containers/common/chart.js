import {Box, Paper, Tooltip as MUITooltip} from "@material-ui/core";
import {
    ArgumentAxis,
    Chart,
    Legend,
    LineSeries,
    Title,
    Tooltip,
    ValueAxis,
    ScatterSeries
} from "@devexpress/dx-react-chart-material-ui";
import styles from './common.module.css'
import {AreaSeries, EventTracker, ValueScale} from "@devexpress/dx-react-chart";
import {scaleLinear} from "@devexpress/dx-chart-core";
import React from "react";
import useTranslation from "next-translate/useTranslation";

function formatNumber(number) {
    return Object(number).toString().replace(/\d(?=(\d{3})+$)/g, '$&,');
}

function Content({label, value}) {
    const {t} = useTranslation()
    return <Paper style={{padding: "4px 8px"}}>
        {t`common:day`} {label}<br/> <b>{formatNumber(value)}</b>
    </Paper>
}

export function getScale(max = 0) {
    let maxTicks = 10

    let scale = scaleLinear()

    if (max < maxTicks) {
        scale.ticks = () => {
            let arr = []
            for (let i = 0; i < maxTicks; i++){
                arr.push(i)
            }
            return arr
        }
        max = 10
    } else {
        let level = 1, tmp = max
        while (tmp > 10) {
            level *= 10
            tmp /= 10
        }
        max = Math.ceil(max / level) * level
        scale.ticks = () => [
            0,
            Math.floor(max / 10),
            Math.floor(max * 2 / 10),
            Math.floor(max * 3 / 10),
            Math.floor(max * 4 / 10),
            Math.floor(max * 5 / 10),
            Math.floor(max * 6 / 10),
            Math.floor(max * 7 / 10),
            Math.floor(max * 8 / 10),
            Math.floor(max * 9 / 10),
            Math.floor(max),
            Math.floor(max * 11 / 10)
        ]
    }
    return scale
}

export function AnalyticsChart({title, data}) {
    let max = -1
    data.forEach(item => {
        if (max < item.value) {
            max = item.value
        }
    })
    if (max < 10){
        max ++
    } else {
        max = Math.round(max * 1.1)
    }

    const [targetItem, setTargetItem] = React.useState()

    return <Paper className={styles.chartPanel}>
        <Chart
            data={data}
        >
            <ValueScale factory={() => getScale(max)} modifyDomain={() => [0, max]}/>
            <ArgumentAxis/>
            <ValueAxis/>
            <Title text={title}/>
            <AreaSeries valueField="value" argumentField="label"/>
            <EventTracker/>
            <Tooltip
                sheetComponent={(props) => {
                    const targetItem = props.children.props.targetItem
                    let {label, value} = data[targetItem.point]
                    return Content({label, value})
                }}

                arrowComponent={() => ""}
                targetItem={targetItem}
                onTargetItemChange={setTargetItem}
            />
        </Chart>
    </Paper>
}

function commonMarkerComponent({color}) {
    return <Legend.Marker style={{fill: color}}/>
}

function commonContent(props = {label: "", value: 0, span: "DAY", t: (str) => str}) {

    return <Paper style={{padding: "4px 8px"}}>
        {props.t(`common:time.${props.span.toLowerCase()}`)} {props.label}<br/>
        {props.t`monitoring:action_count`}: <b>{formatNumber(props.value)}</b><br/>
    </Paper>
}

export function CommonChart({
                                title = "",
                                data = [{label: "-", value: 0}],
                                config = {
                                    tooltipContent: commonContent,
                                    maxValue: -1
                                },
                                span, t
                            }) {
    let max = config?.maxValue || -1
    data.forEach(item => {
        if (max < item.value) {
            max = item.value
        }
    })

    const [targetItem, setTargetItem] = React.useState()
    let [lines, setLines] = React.useState(config.lines)
    React.useEffect(() => {
        setLines(config.lines)
    }, [config])

    React.useEffect(() => {

    }, [data])

    return <Chart
        data={data}
        height={400}
    >
        <ValueScale factory={() => getScale(max)} modifyDomain={() => [0, max*1.1]}/>
        {config?.subScale && (
            <ValueScale
                key={config?.subScale?.name}
                name={config?.subScale?.name}
                modifyDomain={() => [0, config?.subAxis?.max*1.1]}
              />
        )}
        <ArgumentAxis  />
        <ValueAxis position={"left"} tickFormat={(e,x)=>{
                return (val) => {
                    return formatNumber(val)
                }
            }
        }/>
        {config?.subAxis ? <ValueAxis position={"right"} tickFormat={(e,x)=>{
            return (val) => {
                if (val === 0){
                    return 0
                }

                if (config.subAxis.ratio){
                    if (config.subAxis.max < 100000000) {
                        return formatNumber(Math.trunc(val * config.subAxis.ratio / 1000)) + "K"
                    } else {
                        return formatNumber(Math.trunc(val * config.subAxis.ratio / 1000000)) + "M"
                    }
                }
                return formatNumber(val)
            }
        }}
            scaleName={config?.subAxis?.scaleName || ''}
            showGrid={config?.subAxis?.hasOwnProperty('showGrid') ? config?.subAxis?.showGrid : true}
        /> : "" }
        {title !== "" ? <Title text={title}/> : ""}
        {lines && lines.length ? lines.map(line =>
                <LineSeries key={line.name} name={t(line.name)} valueField={line.valueField}
                            argumentField={line.label || "label"} color={line.color} scaleName={line?.scaleName || ''} />) :
            <LineSeries name={t`monitoring:action_count`} valueField="value" argumentField="label"/>}

        {config?.scatter && config.scatter?.length > 0 && config.scatter.map(scatter => 
            <ScatterSeries key={scatter?.name} name={scatter?.name} 
            argumentField={scatter?.label || "label"} valueField={scatter?.valueField} color={scatter?.color} />
            )}

        <Legend markerComponent={commonMarkerComponent}
                labelComponent={(props) => {
                    if (config?.hideTooltip) {
                        return <Box>
                                    <Legend.Label {...props} />
                                </Box>
                    }
                    return <MUITooltip title={t("sku:chart.toggle_line")}>
                        <Box className={styles.chartItemLabel}
                             onClick={(e) => {
                                 let newLines = []
                                 lines.forEach(line => {
                                     if (t(line.name) === props.text) {
                                         if (line.color === "rgba(0,0,0,0)") {
                                            if (config?.linesColor && config?.linesColor?.length > 0) {
                                                let linesColor = config?.linesColor
                                                line.color = linesColor?.find(item => item?.name === props.text)?.color || undefined
                                            } else {
                                                line.color = undefined
                                            }
                                         } else {
                                             line.color = "rgba(0,0,0,0)"
                                         }
                                     }
                                     newLines.push(line)
                                 })
                                 setLines(newLines)
                             }
                             }>
                            <Legend.Label {...props} className={styles.chartItemLabel}/>
                        </Box>
                    </MUITooltip>
                }}
                itemComponent={(props) => <Legend.Item {...props} children={props.children}/>}
                rootComponent={(props) => <Legend.Root {...props} children={props.children}/>}
        />
        <EventTracker/>
        <Tooltip
            sheetComponent={(props) => {
                const targetItem = props.children.props.targetItem
                const typeItem = targetItem?.series || ''
                let pointData = data[targetItem.point]
                return (config.tooltipContent || commonContent)({
                    pointData,
                    typeItem,
                    label: pointData.label,
                    value: pointData.value,
                    userCount: pointData.userCount, span, t
                })
            }}
            arrowComponent={() => (<></>)}
            targetItem={targetItem}
            onTargetItemChange={setTargetItem}
        />
    </Chart>
}

