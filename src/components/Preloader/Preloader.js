import React from 'react'
import './Preloader.css'

const Preloader = ({ fullScreen }) => {
    return (
        <div className={'preloader' + (fullScreen ? ' preloader_fullScreen' : '')}>
            <div className="preloader__container">
                <span className="preloader__round" />
            </div>
        </div>
    )
};

export default Preloader
