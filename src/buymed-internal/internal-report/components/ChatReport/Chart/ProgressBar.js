import { Box, Typography } from '@material-ui/core'
import React from 'react'

function ProgressBar({numberProcessing = 50, numberWaitProcess = 50, }) {
    const percentProcessing = Math.ceil(numberProcessing / (numberProcessing + numberWaitProcess) * 100)
    const percentWaitProcess = 100 - percentProcessing
  return (
    <Box sx={{margin: "40px 0"}}>
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Box sx={{textTransform: "uppercase", fontSize: "16px", color: "#676565", fontWeight: 500}}>Số lượng chat hiện tại</Box>
            <Box sx={{textTransform: "uppercase", fontSize: "16px", color: "#676565", fontWeight: 500}}>{numberProcessing + numberWaitProcess} hội thoại</Box>
        </Box>
        <Box sx={{display: "flex", width: "100%"}}>
            {numberWaitProcess > 0 ?
                <Box sx={{padding: "5px", bgcolor: "#EE4D2D", height: "50px", borderRadius: "8px", width: `${percentWaitProcess}%`, minWidth: "200px"}}>
                    <Typography sx={{textTransform: "uppercase", fontSize: "16px", color: "white", fontWeight: 500, textAlign: "center"}}>Chờ xử lý - {numberWaitProcess} hội thoại</Typography>
                    <Typography sx={{textTransform: "uppercase", fontSize: "12px", color: "white", fontWeight: 500, textAlign: "center"}}>{percentWaitProcess}%</Typography>
                </Box>:<Box></Box>}
            {numberProcessing > 0 ?
            <Box sx={{padding: "5px", bgcolor: "#1A73B8", height: "50px", borderRadius: "8px",  width: `${percentProcessing}%`, minWidth: "200px"}}>
                <Typography sx={{textTransform: "uppercase", fontSize: "16px", color: "white", fontWeight: 500, textAlign: "center"}}>Đang xử lý - {numberProcessing} hội thoại</Typography>
                <Typography sx={{textTransform: "uppercase", fontSize: "12px", color: "white", fontWeight: 500, textAlign: "center"}}>{percentProcessing}%</Typography>
            </Box>:<Box></Box>}
        </Box>
    </Box>
  )
}

export default ProgressBar