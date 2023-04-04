import { styled } from '@material-ui/core/styles';
import  Box  from '@material-ui/core/Box'
export const TrackIconStyle = styled(Box, { shouldForwardProp: (prop) => prop !== 'mute' })
(({ theme, mute }) => ({
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&::after':{
            content:'""',
            display: mute    ? 'block' : 'none',
            position: 'absolute',
            background: 'red',
            width: '100%',
            height: '2px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            transformOrigin: 'center',
        }
    }),
);