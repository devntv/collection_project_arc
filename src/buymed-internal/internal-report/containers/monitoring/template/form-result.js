import {Box, TextField, Typography} from "@material-ui/core";
import styles from "./template.module.css";
import React from "react";
import {Autocomplete} from "@material-ui/lab";

function ClassificationFields({attributeList, classification, setClassification, t}) {

    let attrMap = {}
    attributeList && attributeList.forEach((attr) => {
        attrMap[attr.value] = attr
    })
    let [defaultValue, setDefaultValue] = React.useState(classification?.map((attrValue) => {
        return attrMap[attrValue]
    }).filter((item) => !!item))

    return <Box className={styles.bottomSpacing}>
        <Typography
            className={styles.title}
            color="textPrimary"
            gutterBottom
        >
            {t`monitoring:template.classification_result`}
        </Typography>
        <Autocomplete
            multiple
            labelid="classification-attrs-label"
            id="classification-attrs"
            name="classification-attrs"
            options={attributeList || []}
            noOptionsText={t`common:no_option`}
            getOptionLabel={(option) => (option ? option?.value + " - " + option?.label : "") || "---"}
            renderInput={(params) =>
                <TextField {...params} label={""} variant="outlined"/>}
            defaultValue={defaultValue || ""}
            onChange={(event, value) => {
                setClassification(value && value.map((role) => role.value))
            }}
            className={styles.multiSelect}
        >
        </Autocomplete>
    </Box>
}

function StatisticFields({numberList, statisticFields, setStatisticFields, t}) {

    let attrMap = {}
    numberList && numberList.forEach((attr) => {
        attrMap[attr.value] = attr
    })
    let [defaultValue, setDefaultValue] = React.useState(statisticFields?.map((attrValue) => {
        return attrMap[attrValue]
    }).filter((item) => !!item))

    return <Box className={styles.bottomSpacing}>
        <Typography
            className={styles.title}
            color="textPrimary"
            gutterBottom
        >
            {t`monitoring:template.statistic_result`}
        </Typography>
        <Autocomplete
            multiple
            labelid="classification-attrs-label"
            id="classification-attrs"
            name="classification-attrs"
            options={numberList || []}
            noOptionsText={t`common:no_option`}
            getOptionLabel={(option) => (option ? option?.value + " - " + option?.label : "") || "---"}
            renderInput={(params) =>
                <TextField {...params} label={""} variant="outlined"/>}
            defaultValue={defaultValue || ""}
            onChange={(event, value) => {
                setStatisticFields(value && value.map((role) => role.value))
            }}
            className={styles.multiSelect}
        >
        </Autocomplete>
    </Box>
}

function CustomerFields({customerFields, setCustomerFields, t}) {
    const [attributeList, setAttributeList] = React.useState([
        {label: t`monitoring:template.customer_location`, value: "LOCATION", type: "string"},
        {label: t`monitoring:template.customer_level`, value: "LEVEL", type: "number"},
        {label: t`monitoring:template.customer_activated_date`, value: "ACTIVATED_DATE", type: "date"}
    ])
    let attrMap = {}
    attributeList && attributeList.forEach((attr) => {
        attrMap[attr.value] = attr
    })
    let [defaultValue, setDefaultValue] = React.useState(customerFields?.map((attrValue) => {
        return attrMap[attrValue]
    }).filter((item) => !!item))

    return <Box>
        <Typography
            className={styles.title}
            color="textPrimary"
            gutterBottom
        >
            {t`monitoring:template.customer_result`}
        </Typography>
        <Autocomplete
            multiple
            labelid="classification-attrs-label"
            id="classification-attrs"
            name="classification-attrs"
            options={attributeList || []}
            noOptionsText={t`common:no_option`}
            getOptionLabel={(option) => (option ? option?.value + " - " + option?.label : "") || "---"}
            renderInput={(params) =>
                <TextField {...params} label={""} variant="outlined"/>}
            defaultValue={defaultValue || ""}
            onChange={(event, value) => {
                setCustomerFields(value && value.map((role) => role.value))
            }}
            className={styles.multiSelect}
        >
        </Autocomplete>
    </Box>
}

/*
Configure how result show data
 */
export function ResultConfiguration({classifiedKeys, statisticKeys, customerKeys, attributeList, callback, t}) {
    let [classification, setClassification] = React.useState(classifiedKeys || [])
    let [statisticFields, setStatisticFields] = React.useState(statisticKeys || [])
    let [customerFields, setCustomerFields] = React.useState(customerKeys || [])
    let [numberList, setNumberList] = React.useState(attributeList?.filter(attr => attr.type === "number") || [])

    React.useEffect(() => {
        setNumberList(attributeList?.filter(attr => attr.type === "number") || [])
    }, [attributeList])

    callback.getResultConfigurationValues = function () {
        return {
            classifiedKeys: classification,
            statisticKeys: statisticFields,
            customerKeys: customerFields
        }
    }

    return <Box className={styles.splitter + " " + styles.resultConfiguration}>
        <ClassificationFields
            attributeList={attributeList}
            classification={classification}
            setClassification={setClassification}
            t={t}/>
        <StatisticFields
            numberList={numberList}
            statisticFields={statisticFields}
            setStatisticFields={setStatisticFields}
            t={t}/>
        <CustomerFields
            customerFields={customerFields}
            setCustomerFields={setCustomerFields}
            t={t}/>
    </Box>
}