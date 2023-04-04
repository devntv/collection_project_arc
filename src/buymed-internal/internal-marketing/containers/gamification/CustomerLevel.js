import { Box } from '@material-ui/core';
import styles from './detail.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faMedal, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { faEthereum } from "@fortawesome/free-brands-svg-icons";


const levelMap = {
    LEVEL_BLACKLIST: {
        icon: faTimes,
        color: "#aa0000",
        label: "Blacklist"
    },
    LEVEL_GUEST: {
        icon: faUser,
        color: "#eee",
        label: "Guest"
    },
    LEVEL_SLIVER: {
        icon: faMedal,
        color: "#ffffff",
        label: "Silver"
    },
    LEVEL_GOLD: {
        icon: faMedal,
        color: "#eeee00",
        label: "Gold"
    },
    LEVEL_DIAMOND: {
        icon: faGem,
        color: "#55cccc",
        label: "Diamond"
    },
    LEVEL_PLATINUM: {
        icon: faEthereum,
        color: "#ccc",
        label: "Platinum"
    },
}

export default function CustomerLevel({ level }) {
    let levelInfo = levelMap[level]
    if (!levelInfo) {
        levelInfo = levelMap.LEVEL_BLACKLIST
    }
    return <Box className={styles.customerLevel}>
        <FontAwesomeIcon icon={levelInfo.icon} style={{ color: levelInfo.color }} /> {levelInfo.label}
    </Box>
}