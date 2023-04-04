import {Box, Tooltip} from "@material-ui/core";
import styles from './common.module.css'

const InfoLabel = ({children}) => (<label className={styles.label}>
    {children}</label>)

const InfoValue = ({children}) => (<span className={styles.value}>{children}</span>)

const InfoPercentage = function ({value, title}){
    if (value == -1) {
        return (<div className={styles.percentage}> - </div>)
    }
    if (value >= 100){
        return (<Tooltip title={title}><div className={styles.percentage + " " + styles.positive}>{value} %</div></Tooltip>)
    }

    return (<Tooltip title={title}><div className={styles.percentage + " " + styles.negative}>{value} %</div></Tooltip>)
}

function formatNumber(number) {
    return Object(number).toString().replace(/\d(?=(\d{3})+$)/g, '$&,');
}

export function InfoLine({label, previousLabel, value, previous}) {

    let percentage = -1
    if (!previous){
        if (value){
            percentage = 100
        }
    } else if (previous >= 0){
        percentage = ((value / previous) * 100).toFixed(1)
    }

    return <Box className={styles.infoLine}>
        <InfoLabel>{label}</InfoLabel>
        <InfoValue>{formatNumber(value)}</InfoValue>
        <InfoPercentage value={percentage}  title={previousLabel + " " + formatNumber(previous)}></InfoPercentage>
    </Box>
}