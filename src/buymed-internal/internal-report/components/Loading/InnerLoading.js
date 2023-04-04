import React from 'react'
import LoadingBars from './LoadingBars'
import styles from './Loading.module.css'

const InnerLoading = () => {
    return (
        <div className={styles.loaderScreen + " " + styles.softLoading}>
            <div className={styles.skeleton}>
                <LoadingBars color="#00b46e" size={100}/>
            </div>
        </div>
    )
}

export default InnerLoading