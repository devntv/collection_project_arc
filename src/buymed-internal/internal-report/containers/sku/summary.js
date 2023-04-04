import {MyCard, MyCardContent, MyCardHeader} from "@thuocsi/nextjs-components/my-card/my-card";
import React from "react";
import {Box, IconButton, Tooltip} from "@material-ui/core";
import styles from "./sku.module.css"
import {formatNumber} from "../../components/utils";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartLine, faExternalLinkAlt, faEye, faSearch} from "@fortawesome/free-solid-svg-icons";

function StatsLine({labelStr, value, openReport, t}) {

    if (openReport) {
        return <Tooltip title={t`sku:create_report`}>
            <Box className={styles.statsLine + " " + styles.highlightOnHover}>
                <label>
                    {labelStr}
                </label>
                <span>{value}</span>
            </Box>
        </Tooltip>
    }

    return <Box className={styles.statsLine}>
        <label>
            {labelStr}
        </label>
        <span>{value}</span>
    </Box>
}

export function SKUSummary({
                               title = "",
                               data = {
                                   impression: 0,
                                   view: 0,
                                   addToCart: 0,
                                   orderCount: 0,
                                   orderedQuantity: 0,
                                   orderedValue: 0
                               },
                               currentPreset = "",
                               onTimePresetChange = function (opt) {
                               },
                               t
                           }) {
    return <Box className={styles.summaryBox}>
        <MyCard>
            <MyCardHeader small={true} title={t(`sku:summary.` + title)}
                          style={{backgroundColor: title === currentPreset ? "#33aa55" : "#1a73b8"}}>
                {
                    title !== currentPreset && title !== "today"?
                        <Tooltip title={t`sku:open_time_preset`}>
                            <Box className={styles.timePresetBtn} onClick={() => {
                                onTimePresetChange(title)
                            }}>
                                <FontAwesomeIcon icon={faSearch}/>
                            </Box>
                        </Tooltip> : ""
                }
            </MyCardHeader>
            <MyCardContent>
                <StatsLine labelStr={t`sku:attr.impression`} value={formatNumber(data.impression)} openReport={{}}
                           t={t}/>
                <StatsLine labelStr={t`sku:attr.view`} value={formatNumber(data.view)} openReport={{}} t={t}/>
                <StatsLine labelStr={t`sku:attr.addToCart`} value={formatNumber(data.addToCart)} openReport={{}} t={t}/>
                <StatsLine labelStr={t`sku:attr.orderCount`} value={formatNumber(data.orderCount)}/>
                <StatsLine labelStr={t`sku:attr.orderedQuantity`} value={formatNumber(data.orderedQuantity)}/>
                <StatsLine labelStr={t`sku:attr.orderedValue`} value={formatNumber(data.orderedValue)}/>
            </MyCardContent>
        </MyCard>
    </Box>
}