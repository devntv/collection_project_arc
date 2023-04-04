import { Box } from '@material-ui/core';
import useInterval from 'components/hook/useInterval/useInterval';
import { useState } from 'react';
import { TIME_TO_ASYNC } from 'utilities/realtime-constants';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

export default function Countdown({
    t = () => {},
    callback = () => {},
    params = null,
    delay = 1000,
    timeToAsync = TIME_TO_ASYNC
}) {
    const [countDelay, setDelay] = useState(timeToAsync);

    useInterval(() => {
        if (countDelay === 1) {
            callback(params);
            setDelay(timeToAsync);
        } else {
            setDelay((prev) => prev - 1);
        }
    }, delay);

    return (
        <Box sx={{display: 'flex'}}>
            <WatchLaterIcon fontSize="small" style={{ color: '#219653' }} />
            <span
                style={{
                    fontStyle: 'bold',
                    color: '#219653',
                    paddingLeft: '5px'
                }}
            >
                {t('realtime:sync_after')}: {countDelay}s
            </span>
        </Box>
    );
}
