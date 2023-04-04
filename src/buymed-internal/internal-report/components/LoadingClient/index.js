import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';


function LoadingClient({size=16, thickness=4, className, style, ...restProps}) {
    const styleDFefault = {
        fontSize: '10px',
        color: '#219653',
        animationDuration: '400ms'
    }
    return (
        <CircularProgress 
            style={style || styleDFefault}
            variant="indeterminate"
            disableShrink
            className={className}
            size={size}
            thickness={thickness}        
            {...restProps}
        />
    )
}

export default LoadingClient