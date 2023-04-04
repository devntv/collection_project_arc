import React from "react"
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@material-ui/core";
import styles from "./sku.module.css"
import {formatNumber} from "../../components/utils";

function AnalyticsRow({row, t}) {
    let impressionConversion = row.impression === 0 || row.addToCart === 0 ? 0
        : (Number(row.addToCart * 100.0 / row.impression).toFixed(2) + "%")
    let viewConversion = row.view === 0 || row.addToCart === 0 ? 0
        : (Number(row.addToCart * 100.0 / row.view).toFixed(2) + "%")
    return <TableRow>
        <TableCell>{row.label}</TableCell>
        <Tooltip title={t`sku:create_report`}>
            <TableCell align={"right"} className={styles.highlightOnHover}
                       style={{color:row.impression === 0?"#888":"#000"}}>
                {formatNumber(row.impression)}
            </TableCell>
        </Tooltip>
        <Tooltip title={t`sku:create_report`}>
            <TableCell align={"right"} className={styles.highlightOnHover}
                       style={{color:row.view === 0?"#888":"#000"}}>
                {formatNumber(row.view)}
            </TableCell>
        </Tooltip>
        <Tooltip title={t`sku:create_report`}>
            <TableCell align={"right"} className={styles.highlightOnHover}
                       style={{color:row.addToCart === 0?"#888":"#000"}}>
                {formatNumber(row.addToCart)}
            </TableCell>
        </Tooltip>
        <TableCell align={"right"} style={{color:impressionConversion === 0?"#888":"#000"}}>{formatNumber(impressionConversion)}</TableCell>
        <TableCell align={"right"} style={{color:viewConversion === 0?"#888":"#000"}}>{formatNumber(viewConversion)}</TableCell>
    </TableRow>
}

export function ActionAnalytics({data, t}) {
    return <Box component={Paper}>
        <TableContainer>
            <Table size="small">
                <TableHead className={styles.tableHead}>
                    <TableRow style={{backgroundColor: "#bbb"}}>
                        <TableCell colSpan={"100%"}>{t`sku:user-action`}</TableCell>
                    </TableRow>
                    <TableRow className={styles.tableHeadAttr}>
                        <TableCell width={"10%"}/>
                        <TableCell width={"18%"} align={"right"}>{t`sku:attr.impression`}</TableCell>
                        <TableCell width={"18%"} align={"right"}>{t`sku:attr.view`}</TableCell>
                        <TableCell width={"18%"} align={"right"}>{t`sku:attr.addToCart`}</TableCell>
                        <TableCell width={"18%"} align={"right"}>{t`sku:attr.conversionFromImpression`}</TableCell>
                        <TableCell width={"18%"} align={"right"}>{t`sku:attr.conversionFromView`}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.chart.map(item => <AnalyticsRow row={item} key={item.label} t={t}/>).reverse()
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
}