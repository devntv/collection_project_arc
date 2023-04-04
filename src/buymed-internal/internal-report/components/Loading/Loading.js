import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';


import Box from "@material-ui/core/Box"
import LoadingBars from './LoadingBars';
import styles from './Loading.module.css'


const Loading = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const isPopstateRef = useRef(false)

    useEffect(() => {
        const handleStart = (url) => {
            const base = (url || "").split("?")[0];
            if(url && base === "/chat" && router.pathname === base && !isPopstateRef.current){

            }
            else{
                setLoading(true)
                isPopstateRef.current = false;
            }
        };
        const handleComplete = (url) => {
            setLoading(false)
        };
        router.beforePopState((e)=>{
            isPopstateRef.current = true;
            return true;
        })
        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    }, [router]);
    return loading && (
        <div className={styles.loaderScreen + " " + styles.softLoading}>
            <div className={styles.skeleton}>
                <LoadingBars color="#00b46e" size={100}/>
            </div>
        </div>
    );
}

export default Loading