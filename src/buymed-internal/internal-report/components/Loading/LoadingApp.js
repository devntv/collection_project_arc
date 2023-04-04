import React from 'react'
import LoadingBars from './LoadingBars';
import styles from './Loading.module.css'

const LoadingApp = () => {
    return (
        <div className={styles.loaderScreen}>
                <div>
                    <LoadingBars color="#00b46e" size={120}/>
                </div>
                <div className={styles.loaderText}>
                    Đang vào hệ thống ...
                </div>
            </div>
    )
}

export default LoadingApp