import React from 'react'
import styles from './Loading.module.css'
const LoadingBars = ({ color, style, size }) => {
    const circles = [...Array(3)].map((_, index) => <div key={index} style={{ background: `${color}` }}></div>)

    return (
        <div className={styles.ldsFacebook} style={{ width: size, height: size, ...style }}>
            {circles}
        </div>
    )
}

export default LoadingBars