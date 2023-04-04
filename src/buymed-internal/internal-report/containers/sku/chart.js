import {CommonChart} from "../common/chart";
import React from "react"
import {Box, Paper} from "@material-ui/core";
import styles from "./sku.module.css"
import {formatNumber} from "../../components/utils";

function TooltipLine({label, value}) {
    return <Box className={styles.chartTooltipLine}><label>{label}</label><b>{formatNumber(value)}</b></Box>
}

const hiddenAttr = {"label": true, "value": true, "displayedOrderedValue": true}

export function SKUChart({
                             data = [{
                                 impression: 0,
                                 view: 0,
                                 addToCart: 0,
                                 orderCount: 0,
                                 orderedQuantity: 0,
                                 orderedValue: 0
                             }],
                             span = "DAY",
                             t = function (str) {
                                 return str;
                             }
                         }) {

    let [renderedMax, setRenderedMax] = React.useState(0)
    let [renderedOrderMax, setRenderedOrderMax] = React.useState(0)
    let [renderedData, setRenderedData] = React.useState([])
    let [renderedLines, setRenderedLine] = React.useState([])

    React.useEffect(() => {
        let max = 0, maxOrderValue = 0
        let processedData = data.map(d => {
            let newObj = {...d}
            newObj.value = Math.max(d.impression, d.view, d.addToCart, d.orderCount, d.orderedQuantity)
            if (newObj.value > max) {
                max = newObj.value
            }
            if (d.orderedValue > maxOrderValue) {
                maxOrderValue = d.orderedValue
            }
            return newObj
        })
        processedData = processedData.map(d => {
            let newObj = {...d}
            newObj.displayedOrderedValue = d.orderedValue
            if (maxOrderValue) {
                newObj.orderedValue = Math.round(d.orderedValue * max / maxOrderValue)
            }
            return newObj
        })
        setRenderedData(processedData)
        let linesTemplate = Object.keys(processedData[0]).filter(val => !hiddenAttr[val]).map((line) => {
            return {
                name: t(`sku:attr.${line}`),
                valueField: line
            }
        })
        setRenderedLine(linesTemplate)
        setRenderedMax(max)
        setRenderedOrderMax(maxOrderValue)
    }, [data])

    return <CommonChart
        data={renderedData}
        t={t}
        span={span}
        config={
            {
                subAxis: {
                    ratio: renderedOrderMax / renderedMax,
                    max: renderedOrderMax
                },
                lines: renderedLines,
                tooltipContent: function ({pointData, span = "DAY", t = (str) => str}) {
                    let lines = Object.keys(renderedData[0]).filter(val => !hiddenAttr[val])
                    let render = lines && lines.length ? lines.map((line) => {
                        return {
                            label: t("sku:attr." + line),
                            key: line,
                            value: (line !== "orderedValue") ? pointData[line] : pointData.displayedOrderedValue
                        }
                    }) : null
                    return <Paper style={{padding: "4px 8px", width: 260}}>
                        <TooltipLine key="span" label={t(`common:time.${span.toLowerCase()}`)} value={pointData.label}/>
                        {render && render.length ? render.map((l) => {
                            return <TooltipLine key={l.key} label={l.label} value={l.value}/>
                        }) : ""}
                    </Paper>

                }
            }
        }
    />
}