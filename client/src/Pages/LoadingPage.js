import React from 'react'
import "../styles/LoadingPage.css"
const LoadingPage = () => {
    return (
        <div id="loader-wrapper">
            <div id="loader"></div>
            <div className="loader-section section-left"></div>
            <div className="loader-section section-right"></div>
        </div>
    )
}

export default LoadingPage
