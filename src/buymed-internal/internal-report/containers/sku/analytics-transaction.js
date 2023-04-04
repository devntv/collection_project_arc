import React from "react";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import styles from "./sku.module.css";
import {formatNumber} from "../../components/utils";


function TransactionRow({row}) {
    let qPerOrder = row.orderCount === 0 || row.orderedQuantity === 0 ? 0 : (Number(row.orderedQuantity / row.orderCount).toFixed(1))
    let vPerOrder = row.orderCount === 0 || row.orderedValue === 0 ? 0 : (Number(row.orderedValue / row.orderCount).toFixed(0))
    return <TableRow>
        <TableCell>{row.label}</TableCell>
        <TableCell align={"right"} style={{color: row.orderCount === 0 ? "#888" : "#000"}}>{formatNumber(row.orderCount)}</TableCell>
        <TableCell align={"right"}
                   style={{color: row.orderedQuantity === 0 ? "#888" : "#000"}}>{formatNumber(row.orderedQuantity)}</TableCell>
        <TableCell align={"right"}
                   style={{color: row.orderedValue === 0 ? "#888" : "#000"}}>{formatNumber(row.orderedValue)}</TableCell>
        <TableCell align={"right"} style={{color: qPerOrder === 0 ? "#888" : "#000"}}>
            {formatNumber(qPerOrder)}
        </TableCell>
        <TableCell align={"right"} style={{color: vPerOrder === 0 ? "#888" : "#000"}}>
            {formatNumber(vPerOrder)}
        </TableCell>
    </TableRow>
}

export function TransactionAnalytics({data, t}) {

    return <Box component={Paper}>
        <TableContainer>
            <Table size="small">
                <TableHead className={styles.tableHead}>
                    <TableRow style={{backgroundColor: "#bbb"}}>
                        <TableCell colSpan={"100%"}>{t`sku:business`}</TableCell>
                    </TableRow>
                    <TableRow className={styles.tableHeadAttr}>
                        <TableCell width={"10%"}/>
                        <TableCell width={"18%"} align={"right"}>{t`sku:attr.orderCount`}</TableCell>
                        <TableCell width={"18%"} align={"right"}>{t`sku:attr.orderedQuantity`}</TableCell>
                        <TableCell width={"18%"} align={"right"}>{t`sku:attr.orderedValue`}</TableCell>
                        <TableCell width={"18%"} align={"right"}>{t`sku:attr.quantityPerOrder`}</TableCell>
                        <TableCell width={"18%"} align={"right"}>{t`sku:attr.valuePerOrder`}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.chart.map(item => <TransactionRow row={item} key={item.label}/>).reverse()
                    }

                </TableBody>
            </Table>
        </TableContainer>
    </Box>
}