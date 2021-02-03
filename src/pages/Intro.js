import React from 'react';
import Header from '../components/common/Header';
import '../styles/intro.css';

const Intro = () => {

    return (
        <div className = "IntroContainer">
            <Header/>
            <div className = "Intro">
                <div className="advertisement">
                    광고1
                </div>
                <div className="advertisement">
                    광고2
                </div>
                <div className="advertisement">
                    광고3
                </div>
                <div className="advertisement">
                    광고4
                </div>
                <div className="advertisement">
                    광고5
                </div>
            </div>
        </div>
    )
}

export default Intro;