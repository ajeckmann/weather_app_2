import React from 'react';

import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import LocationForm from './components/locationform';
import Weather from './components/weather';

import 'weather-icons/css/weather-icons.css';

const api_key = "e3b131865eee01b289ec2755b46f2d7c";


class App extends React.Component {




  getIcon(rangeID) {
    switch (true) {
      case rangeID >= 200 && rangeID <= 232:
        this.setState({ icon: this.icon.Thunderstorm });
        break;
      case rangeID >= 300 && rangeID <= 321:
        this.setState({ icon: this.icon.Drizzle });
        break;
      case rangeID >= 500 && rangeID <= 531:
        this.setState({ icon: this.icon.Rain });
        break;

      case rangeID >= 600 && rangeID <= 622:
        this.setState({ icon: this.icon.Snow });
        break;
      case rangeID >= 701 && rangeID <= 781:
        this.setState({ icon: this.icon.Atmosphere });
        break;

      case rangeID === 800:
        this.setState({ icon: this.icon.Clear });
        break;
      case rangeID >= 801 && rangeID <= 804:
        this.setState({ icon: this.icon.Clouds });
        break;
      default:
        this.setState({ icon: this.icon.Clear });
    }
  }




  state = {
    isRequested: false,
    city: null,
    country: null,
    icon: null,
    main: null,
    celsius: null,
    maxtempC: null,
    mintempC: null,
    temptype: "farenheight"

  };
  icon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Clear: "wi-day-sunny",
    Snow: "wi-snow",
    Clouds: "wi-day-fog",
    Atmosphere: "wi-day-fog"
  };

  onChangeHandler1 = (e) => {
    this.setState({
      citytosearch: e.target.value,

    })
  }
  onChangeHandler2 = (e) => {
    this.setState({

      countrytosearch: e.target.value
    })
  }


  handleSubmit = (e) => {
    this.getWeather();
  }
  switchTempTypeToF = (e) => {
    this.setState({
      temptype: "farenheight"
    })
  }

  switchTempTypeToC = (e) => {
    this.setState({
      temptype: "celsius"
    })
  }

  getWeather = (e) => {

    e.preventDefault();

    console.log('ok, yea');
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.citytosearch},${this.state.countrytosearch}&appid=${api_key}`)
      // axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Jerusalem,il&appid=${api_key}`)
      .then(res => {
        const weather = res.data;
        console.log(weather);
        this.setState({
          isRequested: true,
          city: weather.name,
          country: weather.sys.country,
          celsius: Math.round(weather.main.temp - 273.15),
          farenheit: Math.round((weather.main.temp - 273.15) * 9 / 5 + 32),
          feelslikeC: Math.round(weather.main.feels_like) - 273,
          feelslikeF: Math.round((weather.main.feels_like - 273.15) * 9 / 5 + 32),
          mintempC: Math.round(weather.main.temp_min - 273.15),
          mintempF: Math.round((weather.main.temp_min - 273.15) * 9 / 5 + 32),
          maxtempC: Math.round(weather.main.temp_max - 273.15),
          maxtempF: Math.round((weather.main.temp_max - 273.15) * 9 / 5 + 32),
          humidity: weather.main.humidity,
          description: this.capitalize(weather.weather[0].description)


        });
        this.getIcon(weather.weather[0].id);
      })





  };

  capitalize = (word) => {

    let newword = "";
    newword += word[0].toUpperCase();

    for (var i = 1; i < word.length; i++) {

      if (word[i - 1] == " ") {
        newword += word[i].toUpperCase();
      }
      else {
        newword += word[i];
      }

    }


    console.log('chickenb');
    console.log(newword);
    return newword;
  }




  render() {
    if (this.state.temptype === "celsius") {
      return (
        <div className="App" >
          <h1 className="weather_heading inline-block">How is the Weather?  </h1><a className="inline-block" href="#" onClick={(e) => { this.switchTempTypeToF(e) }}>F</a> |  <a>C</a>
          <LocationForm
            type="input"
            cityname="City"
            countryname="Country"
            label1="Enter City: "
            label2="Enter Country: "
            weatherfunction={this.getWeather}
            onChangeHandler1={this.onChangeHandler1}
            onChangeHandler2={this.onChangeHandler2}
          />


          {/* ternary operator */}
          {this.state.isRequested === true ?
            <Weather
              city={this.state.city}
              country={this.state.country}
              currenttemp={this.state.currenttemp}
              temperature={this.state.celsius}
              tempsymbol="C"
              feelslike={this.state.feelslikeC}
              minTemp={this.state.mintempC}
              maxTemp={this.state.maxtempC}
              humidity={this.state.humidity}
              description={this.state.description}
              icon={this.state.icon} />
            :
            null
          }












        </div>

      );
    }
    else if (this.state.temptype = "farenheight") {
      return (
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>

        <div className="App" >
          <h1 className="weather_heading">How is the Weather?  </h1><a>F</a> |  <a href="#" onClick={(e) => { this.switchTempTypeToC(e) }}>C</a >
          <LocationForm
            type="input"
            cityname="City"
            countryname="Country"
            label1="Enter City: "
            label2="Enter Country: "
            weatherfunction={this.getWeather}
            onChangeHandler1={this.onChangeHandler1}
            onChangeHandler2={this.onChangeHandler2}
          />

          {this.state.isRequested === true ?
            <Weather
              city={this.state.city}
              country={this.state.country}
              currenttemp={this.state.currenttemp}
              temperature={this.state.farenheit}
              tempsymbol="F"
              feelslike={this.state.feelslikeF}
              minTemp={this.state.mintempF}
              maxTemp={this.state.maxtempF}
              humidity={this.state.humidity}
              description={this.state.description}
              icon={this.state.icon}
            />
            :
            null}
        </div >



      );
    }
  }

}




export default App;
