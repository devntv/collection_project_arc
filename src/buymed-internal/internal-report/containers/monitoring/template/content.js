import {Box, Tooltip, Typography} from "@material-ui/core";
import styles from './content.module.css'


function getOperatorDisplay(operator, t) {
    switch (operator) {
        case "=":
        case ">":
        case "<":
            return operator
        case "contains":
        case "prefix":
        case "postfix":
            return t(`monitoring:${operator}`)

    }
    return "-"
}

export function TemplateContent({templateData, t}) {

    // process basic filter
    let eventData = templateData.eventData
    let attrList = [], attrMap = {}

    if (eventData?.filteredAttributes) {
        eventData.filteredAttributes.forEach(attr => {
            attrMap[attr.value] = {
                label: attr.label
            }
        })
    }

    if (templateData.filter && Object.keys(templateData.filter).length > 0) {
        for (let attrCode in templateData.filter) {
            if (templateData.filter.hasOwnProperty(attrCode)) {
                let attr = {
                    attribute: attrCode,
                    ...templateData.filter[attrCode]
                }
                if (eventData?.filteredAttributes?.length) {
                    attr.label = eventData.filteredAttributes.filter(a => a.value === attrCode)[0].label
                }
                attrList.push(attr)
                attrMap[attrCode] = attr
            }
        }
    }

    // process ua filter
    templateData.uaFilter = templateData.uaFilter || {}
    let platform = {
        attribute: {
            label: t`monitoring:template.platform`,
            value: "PLATFORM",
            type: "string"
        },
        operator: templateData.uaFilter["PLATFORM"]?.operator || "=",
        value: templateData.uaFilter["PLATFORM"]?.value || "ALL"
    }, os = {
        attribute: {
            label: t`monitoring:template.os`,
            value: "OS",
            type: "string"
        },
        operator: templateData.uaFilter["OS"]?.operator || "=",
        value: templateData.uaFilter["OS"]?.value || "ALL"
    }, osVersion = {
        attribute: {
            label: t`monitoring:template.os_version`,
            value: "OS_VERSION",
            type: "number"
        },
        operator: templateData.uaFilter["OS_VERSION"]?.operator || "=",
        value: templateData.uaFilter["OS_VERSION"]?.value || "ALL"
    }, client = {
        attribute: {
            label: t`monitoring:template.client`,
            value: "CLIENT",
            type: "string"
        },
        operator: templateData.uaFilter["CLIENT"]?.operator || "=",
        value: templateData.uaFilter["CLIENT"]?.value || "ALL"
    }, clientVersion = {
        attribute: {
            label: t`monitoring:template.client_version`,
            value: "CLIENT_VERSION",
            type: "number"
        },
        operator: templateData.uaFilter["CLIENT_VERSION"]?.operator || "=",
        value: templateData.uaFilter["CLIENT_VERSION"]?.value || "ALL"
    }, uaFilters = [platform, os, osVersion, client, clientVersion]

    // process customer filter
    templateData.customerFilter = templateData.customerFilter || {}
    let location = {
            attribute: {
                label: t`monitoring:template.customer_location`,
                value: "LOCATION",
                type: "string"
            },
            operator: templateData.customerFilter["LOCATION"]?.operator || "=",
            value: templateData.customerFilter["LOCATION"]?.value || "ALL"
        }, level = {
            attribute: {
                label: t`monitoring:template.customer_level`,
                value: "LEVEL",
                type: "number"
            },
            operator: templateData.customerFilter["LEVEL"]?.operator || "=",
            value: templateData.customerFilter["LEVEL"]?.value || "ALL"
        }, activatedDate = {
            attribute: {
                label: t`monitoring:template.customer_activated_date`,
                value: "ACTIVATED_DATE",
                type: "date"
            },
            operator: templateData.customerFilter["ACTIVATED_DATE"]?.operator || "=",
            value: templateData.customerFilter["ACTIVATED_DATE"]?.value || "ALL"
        }, customerFilters = [location, level, activatedDate],
        customerMap = {LOCATION: location, LEVEL: level, ACTIVATED_DATE: activatedDate}


    return <>
        <Box>
            <Tooltip title={t`monitoring:template.event_code_label`}>
                <span
                    className={styles.eventName}>{templateData.eventCode ? `${templateData.eventCode} - ${templateData.eventName}` : t`monitoring:template.no_event_code`}</span>
            </Tooltip>
            {
                (attrList && attrList.length > 0) ?
                    <Tooltip title={t`monitoring:template.filter_condition_label`}>
                        <Box>
                            {attrList.map(attr => <Box className={styles.attrLine + " " + styles.basicLine}
                                                       key={attr.attribute}>
                                <span className={styles.attrName}>{attr.label}</span>
                                <span className={styles.attrOperator}>{getOperatorDisplay(attr.operator, t)}</span>
                                <span className={styles.attrValue}>{attr.value}</span>
                            </Box>)}
                        </Box>
                    </Tooltip> : ""
            }
            {
                <Tooltip title={t`monitoring:template.filter_ua_label`}>
                    <Box>
                        {uaFilters.map(attr => <Box className={styles.attrLine + " " + styles.uaLine}
                                                    key={attr.attribute.value}>
                            <span className={styles.attrName}>{attr.attribute.label}</span>
                            <span className={styles.attrOperator}>{getOperatorDisplay(attr.operator, t)}</span>
                            <span className={styles.attrValue}>{attr.value}</span>
                        </Box>)}
                    </Box>
                </Tooltip>
            }
            {
                <Tooltip title={t`monitoring:template.filter_customer_label`}>
                    <Box>
                        {customerFilters.map(attr => <Box className={styles.attrLine + " " + styles.customerLine}
                                                          key={attr.attribute.value}>
                            <span className={styles.attrName}>{attr.attribute.label}</span>
                            <span className={styles.attrOperator}>{getOperatorDisplay(attr.operator, t)}</span>
                            <span className={styles.attrValue}>{attr.value}</span>
                        </Box>)}
                    </Box>
                </Tooltip>
            }
        </Box>
        <Box className={styles.resultConfig}>
            <Box className={styles.resultConfigLabel}>
                {t`monitoring:template.result_configuration`}:
            </Box>
            <Tooltip title={t`monitoring:template.classification_result`}>
                <Box className={styles.resultLine}>
                    {(templateData.classifiedKeys && templateData.classifiedKeys.length > 0) &&
                    templateData.classifiedKeys.map(key => <Box key={key}
                                                                className={styles.tag}> {key} - {attrMap[key]?.label} </Box>)}
                </Box>
            </Tooltip>
            <Tooltip title={t`monitoring:template.statistic_result`}>
                <Box className={styles.resultLine}>
                    {(templateData.statisticKeys && templateData.statisticKeys.length > 0) &&
                    templateData.statisticKeys.map(key => <Box key={key}
                                                               className={styles.tag}> {key} - {attrMap[key]?.label} </Box>)}
                </Box>
            </Tooltip>
            <Tooltip title={t`monitoring:template.customer_result`}>
                <Box className={styles.resultLine}>
                    {(templateData.customerKeys && templateData.customerKeys.length > 0) &&
                    templateData.customerKeys.map(key => <Box key={key}
                                                              className={styles.tag}> {key} - {customerMap[key]?.attribute.label}</Box>)}
                </Box>
            </Tooltip>
        </Box>
    </>
}