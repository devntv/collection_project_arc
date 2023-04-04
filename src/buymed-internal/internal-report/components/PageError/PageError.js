import React, { useContext, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Link from 'next/link'
import AppContext from '../../context'
const PageError = ({hasLayout}) => {

    const appContext = useContext(AppContext);
    useEffect(()=>{
        if(appContext && appContext.setEnableBreadCrumb){
            appContext.setEnableBreadCrumb(false);
        }
    },[appContext])

    return (
        <Box
            sx={{
                width: hasLayout ?"100%" : "100vw",
                height: hasLayout ? "100%" :"100vh",
                background: "#E0EAEA",
                paddingTop: "100px",
                fontFamily: "Segoe UI"
            }}
        >
            <Paper
                sx={{
                    margin: "0 auto",
                    padding: 2,
                    maxWidth: "500px",
                    "& p": {
                        margin: "1rem 0"
                    }
                }}
            >
                <p style={{
                    color: "#666",
                    fontSize: "22px",
                    marginTop: "2rem",
                }}>Không tìm thấy nội dung bạn muốn truy cập</p>
                <p>Có thể nội dung đã bị xóa, hoặc bạn không có quyền truy cập.</p>
                <p>Vui lòng liên hệ admin hoặc quay lại
                    <Link href="/profile">
                        <a style={{
                            color: "#00b46e",
                            textDecoration: "none"
                        }}>{" "}Trang chủ</a>
                    </Link>
                </p>
            </Paper>
        </Box >
    )
}

export default PageError