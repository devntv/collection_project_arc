import {Box} from "@material-ui/core";
import styles from './common.module.css'

export function FlexContainer({ children, className = "" }) {
    return <Box className={styles.flexContainer + " " + className}>
        {children}
    </Box>
}

export function FlexContent({ children, className }) {
    return <Box className={styles.flexContent + " " + className}>
        {children}
    </Box>
}