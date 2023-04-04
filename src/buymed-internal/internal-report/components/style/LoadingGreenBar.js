import { styled} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box"

export const LoadingGreenBar = styled(Box)(({ theme }) => ({
    width: '30px',
    background: theme.palette.green,
    borderRadius: '5px',
    boxShadow: theme.shadows[3],
    height: '80px'

}),);

export const useStyles = makeStyles(theme => ({
    animation1: {
        animation: `$myEffect 0.5s linear infinite `,
        transformOrigin: 'center',
    },
    animation2: {
        animation: `$myEffect 0.5s linear 0.1s infinite `,
        transformOrigin: 'center'
    },
    animation3: {
        animation: `$myEffect 0.5s linear 0.2s infinite `,
        transformOrigin: 'center'
    },
    "@keyframes myEffect": {
        "0%": {
            transform: 'scaleY(1)',
        },
        "50%": {
            transform: 'scaleY(0.5)'
        },
        "100%": {
            transform: 'scaleY(1)'
        },
    },
}));