import {Box, Button, MenuItem, Select, TextField, Tooltip, Typography} from "@material-ui/core";
import styles from "./template.module.css";
import React, {useState} from "react";
import MuiSingleAuto from "@thuocsi/nextjs-components/muiauto/single";
import {useForm} from "react-hook-form";
import ReactHookFormSelect from "../../common/form-select";

/*
A line/row of attribute condition
 */
function AttributeCondition({prefix, condition, attributeList, index, formObject, t}) {

    // disable operator or not
    const [selectedAttribute, setSelectedAttribute] = React.useState(condition?.attribute)

    React.useEffect(() => {

        // set default values
        if (selectedAttribute?.value) {
            formObject.setValue(`${prefix}-${index}-attribute`, selectedAttribute?.value)
        }
        if (condition?.operator) {
            formObject.setValue(`${prefix}-${index}-operator`, condition.operator)
        }
        if (condition?.value) {
            formObject.setValue(`${prefix}-${index}-value`, condition.value)
        }
    }, [condition, selectedAttribute])

    // return
    return <Box key={prefix + "-" + index} className={styles.attributeLine}>
        <Box className={styles.inlineControl + " " + styles.fullWidth}>
            <ReactHookFormSelect
                id={`${prefix}-${index}-attribute`}
                name={`${prefix}-${index}-attribute`}
                control={formObject.control}
                setValue={formObject.setValue}
                size={"small"}
                style={{width: "100%"}}
                defaultValue={condition?.attribute?.value || ""}
                disabled={!attributeList || !attributeList.length}
                onChange={(option) => {
                    if (attributeList && attributeList.length) {
                        attributeList.forEach(attr => {
                            if (attr.value === option) {
                                setSelectedAttribute(attr)
                            }
                        })
                    }
                }}
            >
                {(attributeList && attributeList.length > 0) ? attributeList.map(attr =>
                    (<MenuItem key={attr.value}
                               value={attr.value}>
                        {attr.value} - {attr.label}
                    </MenuItem>)) : (selectedAttribute ? (<MenuItem key={selectedAttribute.value}
                                                                    value={selectedAttribute.value} selected={true}>
                    {selectedAttribute.value} - {selectedAttribute.label}
                </MenuItem>) : "")}

            </ReactHookFormSelect>
        </Box>
        <Box className={styles.inlineControl} style={{verticalAlign: "bottom"}}>
            <ReactHookFormSelect
                id={`${prefix}-${index}-operator`}
                name={`${prefix}-${index}-operator`}
                control={formObject.control}
                setValue={formObject.setValue}
                size={"small"}
                style={{width: 140}}
                defaultValue={condition?.operator || "="}
            >
                <MenuItem key="equal" value="=">=</MenuItem>
                {
                    (selectedAttribute?.type === "number" || selectedAttribute?.type === "date") &&
                    [
                        {key: "lowerThan", value: "<", label: "<"},
                        {key: "greaterThan", value: ">", label: ">"}
                    ].map(
                        (item) => <MenuItem key={item.key} value={item.value}>{item.label}</MenuItem>
                    )
                }
                {
                    (selectedAttribute?.type === "string") &&
                    [
                        {key: "contains", value: "contains", label: t`monitoring:contains`},
                        {key: "prefix", value: "prefix", label: t`monitoring:prefix`},
                        {key: "postfix", value: "postfix", label: t`monitoring:postfix`}
                    ].map(
                        (item) => <MenuItem key={item.key} value={item.value}>{item.label}</MenuItem>
                    )
                }
            </ReactHookFormSelect>
        </Box>
        <TextField
            id={`${prefix}-${index}-value`}
            name={`${prefix}-${index}-value`}
            label={t("monitoring:template.condition_value")}
            style={{width: 200, verticalAlign: "bottom"}}
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
            size="small"
            inputRef={(e) => {
                formObject.register(e);
            }}
            control={formObject.control}
            defaultValue={condition?.value || ""}

        />
    </Box>
}

/*

 */
function ConditionList({filter, eventDefinition, formObject, t}) {
    let [currentList, setCurrentList] = useState([])
    let [maximumAttribute, setMaximumAttribute] = useState(false)
    let [attributeList, setAttributeList] = useState(eventDefinition?.event.filteredAttributes || [])

    React.useEffect(() => {
        // reset condition list if selected event is changed
        let newAttrList = eventDefinition?.event.filteredAttributes || []
        setAttributeList(newAttrList)
        setMaximumAttribute(newAttrList.length === 0)
        setCurrentList([])

        // transform filter map into list for display
        if (filter) {
            if (!newAttrList.length) {
                setCurrentList([])
                return
            }
            let filters = []
            for (let key in filter) {
                if (filter.hasOwnProperty(key)) {
                    let a = newAttrList.filter(attr => attr.value === key)
                    a = a && a[0]
                    filters.push({
                        attribute: a,
                        operator: filter[key].operator,
                        value: filter[key].value,
                        type: a?.type
                    })
                }
            }
            setCurrentList(filters)
        }
    }, [eventDefinition])

    return <Box>
        {(currentList && currentList.length > 0) ? currentList.map((condition, index) => {
            return <AttributeCondition
                key={`condition-${index}`}
                prefix={"condition"}
                condition={condition}
                attributeList={attributeList}
                index={index}
                currentList={currentList}
                setCurrentList={setCurrentList}
                formObject={formObject}
                t={t}
            />
        }) : ""}
        <Box className={styles.formControl}>
            <Button
                variant="contained"
                color="default"
                disabled={formObject.formState.isSubmitting || maximumAttribute}
                onClick={() => {
                    setMaximumAttribute(currentList.length + 1 >= attributeList.length)
                    if (currentList.length < attributeList.length) {
                        setCurrentList(currentList.concat([{
                            attribute: "",
                            operator: "=",
                            value: ""
                        }]))
                    }
                }}
            >
                {t`monitoring:template.add_condition`}
            </Button>
        </Box>
    </Box>
}

function UAFilterList({uaFilter, formObject, t}) {

    let platform = {
        attribute: {
            label: t`monitoring:template.platform`,
            value: "PLATFORM",
            type: "string"
        },
        operator: "=",
        value: uaFilter["PLATFORM"]?.value || "ALL"
    }, os = {
        attribute: {
            label: t`monitoring:template.os`,
            value: "OS",
            type: "string"
        },
        operator: "=",
        value: uaFilter["OS"]?.value || "ALL"
    }, osVersion = {
        attribute: {
            label: t`monitoring:template.os_version`,
            value: "OS_VERSION",
            type: "number"
        },
        operator: "=",
        value: uaFilter["OS_VERSION"]?.value || "ALL"
    }, client = {
        attribute: {
            label: t`monitoring:template.client`,
            value: "CLIENT",
            type: "string"
        },
        operator: "=",
        value: uaFilter["CLIENT"]?.value || "ALL"
    }, clientVersion = {
        attribute: {
            label: t`monitoring:template.client_version`,
            value: "CLIENT_VERSION",
            type: "number"
        },
        operator: "=",
        value: uaFilter["CLIENT_VERSION"]?.value || "ALL"
    }

    return <Box>
        <AttributeCondition
            key={`ua-platform`}
            condition={platform}
            prefix={"ua"}
            index={0}
            formObject={formObject}
            t={t}
        />
        <AttributeCondition
            key={`ua-os`}
            condition={os}
            prefix={"ua"}
            index={1}
            formObject={formObject}
            t={t}
        />
        <AttributeCondition
            key={`ua-os-version`}
            condition={osVersion}
            prefix={"ua"}
            index={2}
            formObject={formObject}
            t={t}
        />
        <AttributeCondition
            key={`ua-client`}
            condition={client}
            prefix={"ua"}
            index={3}
            formObject={formObject}
            t={t}
        />
        <AttributeCondition
            key={`ua-client-version`}
            condition={clientVersion}
            prefix={"ua"}
            index={4}
            formObject={formObject}
            t={t}
        />
    </Box>
}

function CustomerFilterList({customerFilter, formObject, t}) {
    let location = {
        attribute: {
            label: t`monitoring:template.customer_location`,
            value: "LOCATION",
            type: "string"
        },
        operator: "=",
        value: customerFilter["LOCATION"]?.value || "ALL"
    }, level = {
        attribute: {
            label: t`monitoring:template.customer_level`,
            value: "LEVEL",
            type: "number"
        },
        operator: "=",
        value: customerFilter["LEVEL"]?.value || "ALL"
    }, activatedDate = {
        attribute: {
            label: t`monitoring:template.customer_activated_date`,
            value: "ACTIVATED_DATE",
            type: "date"
        },
        operator: "=",
        value: customerFilter["ACTIVATED_DATE"]?.value || "ALL"
    }
    return <Box>
        <AttributeCondition
            key={`customer-location`}
            condition={location}
            prefix={"customer"}
            index={0}
            formObject={formObject}
            t={t}
        />
        <AttributeCondition
            key={`customer-level`}
            condition={level}
            prefix={"customer"}
            index={1}
            formObject={formObject}
            t={t}
        />
        <AttributeCondition
            key={`customer-activated-date`}
            condition={activatedDate}
            prefix={"customer"}
            index={2}
            formObject={formObject}
            t={t}
        />
    </Box>
}

/*
Filter user action log
 */
export function FilterCondition({
                                    eventCode,
                                    filter,
                                    uaFilter,
                                    customerFilter,
                                    eventDefinitions,
                                    setAttributeList,
                                    formObject,
                                    t
                                }) {

    let generateEventList = function () {
        return [{
            label: t`monitoring:template.no_event_code`,
            value: "",
            event: {}
        }].concat((eventDefinitions || []).map(event => {
            return {
                label: `${event.code} - ${event.description}`,
                value: event.code,
                event: event
            }
        }))
    }
    let [eventList, setEventList] = React.useState(generateEventList())
    let [selectedEvent, setSelectedEvent] = React.useState(eventList.filter(ev => ev.value === eventCode)[0])

    React.useEffect(() => {
        setEventList(generateEventList())
    }, [eventDefinitions])

    React.useEffect(() => {
        formObject.setValue("eventCode", selectedEvent)
    }, [])

    return <Box className={styles.splitter + " " + styles.filterCondition}>
        <Box className={styles.formControl + " " + styles.bottomSpacing}>
            <Typography
                className={styles.title}
                color="textPrimary"
                gutterBottom
            >
                {t`monitoring:template.event_code_label`}
            </Typography>
            <MuiSingleAuto
                name="eventCode"
                options={eventList}
                placeholder={t`monitoring:template.event_code`}
                control={formObject.control}
                errors={formObject.errors}
                getOptionLabel={option => option.label || ""}
                // defaultValue={selectedEvent}
                onValueChange={(option) => {
                    if (!option) {
                        setSelectedEvent(null)
                        setAttributeList([])
                        return
                    }
                    formObject.setValue("event_code", option.value)
                    eventList.forEach(item => {
                        if (item.value === option.value) {
                            setSelectedEvent(item)
                            setAttributeList(item.event.filteredAttributes || [])
                        }
                    })
                }}
                style={{background: "white"}}
            />
        </Box>
        <Box className={styles.bottomSpacing}>
            <Typography
                className={styles.title}
                color="textPrimary"
                gutterBottom
            >
                {t`monitoring:template.filter_condition_label`}
            </Typography>
            <ConditionList
                filter={filter}
                formObject={formObject}
                t={t}
                eventDefinition={selectedEvent}/>
            <Box className={styles.tipDescription}>
                {t`monitoring:template.filter_condition_rule`}
            </Box>
        </Box>
        <Box className={styles.bottomSpacing}>
            <Typography
                className={styles.title}
                color="textPrimary"
                gutterBottom
            >
                {t`monitoring:template.filter_ua_label`}
            </Typography>
            <UAFilterList
                uaFilter={uaFilter || {}}
                formObject={formObject}
                t={t}
            />
        </Box>
        <Box>
            <Typography
                className={styles.title}
                color="textPrimary"
                gutterBottom
            >
                {t`monitoring:template.filter_customer_label`}
            </Typography>
            <CustomerFilterList
                customerFilter={customerFilter || {}}
                formObject={formObject}
                t={t}
            />
        </Box>
    </Box>
}