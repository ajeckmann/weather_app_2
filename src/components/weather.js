import React from 'react';
import './weather.css';


const Weather = (props) => {
    return (
        <div className="container">
            <div className="cards">
                <h1>{props.city}, {props.country}</h1>
                <h4>{props.description}</h4>
                <h5><i className={`wi ${props.icon} display-1`}></i></h5>
                <h1 className="py-2">{props.temperature}&deg;{props.tempsymbol}</h1>
                <h2>Feels like: {props.feelslike}&deg;{props.tempsymbol}</h2>
                <h2><span>Low: {props.minTemp}&deg;{props.tempsymbol}</span> | <span>High: {props.maxTemp}&deg;{props.tempsymbol}</span></h2>
                <h4>Humidity: {props.humidity}%</h4>

            </div>
        </div >


    );
};







function minmaxtemp(min, max) {
    return (
        <div>
            <h3>
                <span> Today's Low: {min} &deg;</span>
                <span>Today's High: {max} &deg;</span>
            </h3>
        </div>
    );
}






export default Weather;