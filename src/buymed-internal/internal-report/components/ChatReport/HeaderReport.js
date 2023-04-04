import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import GetAppIcon from '@material-ui/icons/GetApp';


const HeaderReport = ({ label, exportExcel }) => {
    return (
        <Box>
            <Box sx={{ padding: "15px", bgcolor: "#1a73b8", borderTopLeftRadius: "4px", borderTopRightRadius: "4px", display: "flex", justifyContent: "space-between" }}>
                <Box
                     sx={{fontSize: "24px", color: "#fff", fontWeight: "400"}}
                >
                    {label}
                </Box>
                {/* <Button onClick={exportExcel} variant="contained" sx={{ padding: "0 10px", bgcolor: "#00b46e", height: "40px", borderRadius: "6px", fontSize: "14px", whiteSpace: "nowrap", "&:hover": { bgcolor: "#00a967" } }}><GetAppIcon sx={{marginRight: "10px"}} />  Xuất báo cáo</Button> */}
            </Box>
        </Box>
    )
}

export default HeaderReport;
