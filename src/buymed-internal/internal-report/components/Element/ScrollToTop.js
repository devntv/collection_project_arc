import React, { useEffect, useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Grow from '@material-ui/core/Grow';

const ScrollToTop = () => {

    const [isDisplay, setIsDisplay] = useState(false);

    const handleScroll = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            setIsDisplay(true);
        }
        else {
            setIsDisplay(false);
        }
    }

    useEffect(()=>{
        document.addEventListener("scroll", handleScroll)        
        return () => {
            document.removeEventListener("scroll", handleScroll);
        }
    }, [])

    const scrollToTop = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }    

    return (
        <Grow
            in={isDisplay}
        >
            <Paper
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '100%',
                    position: 'fixed',
                    right: '1rem',
                    bottom: '2rem',
                    background: '#00b46e'
                }}
            >
                <IconButton onClick={scrollToTop}>
                    <KeyboardArrowUpIcon sx={{
                        color: '#fff'
                    }}></KeyboardArrowUpIcon>
                </IconButton>
            </Paper>
        </Grow>
    )
}

export default ScrollToTop