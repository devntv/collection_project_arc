import React from 'react'
import Box from "@material-ui/core/Box"
const NotFoundMessage = ({children}) => {
    return (
        <Box
            sx={{
                fontStyle:"italic"
            }}
        >{children}</Box>
    )
}

export default NotFoundMessage