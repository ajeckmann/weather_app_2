import React from "react";

import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import LocationForm from "./components/locationform";
import Weather from "./components/weather";
import Attire from "./components/Attire";

import "weather-icons/css/weather-icons.css";

const api_key = "e3b131865eee01b289ec2755b46f2d7c";

class App extends React.Component {
  getIcon(rangeID) {
    switch (true) {
      case rangeID >= 200 && rangeID <= 232:
        this.setState({ icon: this.icon.Thunderstorm });
        break;
      case rangeID >= 300 && rangeID <= 321:
        this.setState({
          icon: this.icon.Drizzle,
          isRain: true
        });
        break;
      case rangeID >= 500 && rangeID <= 531:
        this.setState({
          icon: this.icon.Rain,
          isRain: true
        });
        break;

      case rangeID >= 600 && rangeID <= 622:
        this.setState({
          icon: this.icon.Snow,
          isSnow: true
        });
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
    temptype: "farenheight",
    Errors: null
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

  onChangeHandler1 = e => {
    this.setState({
      citytosearch: e.target.value
    });
  };
  onChangeHandler2 = e => {
    this.setState({
      countrytosearch: e.target.value
    });
  };

  handleSubmit = e => {
    this.getWeather();
  };
  switchTempTypeToF = e => {
    this.setState({
      temptype: "farenheight"
    });
  };

  switchTempTypeToC = e => {
    this.setState({
      temptype: "celsius"
    });
  };

  getdistance = () => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=41.9507292,-87.6473925&destinations=41.93928529999999,-87.6408702&key=AIzaSyAHNBneZs4FKuxpMyNUmH7qRr-Xl78IAM8`
      )
      .then(res => {
        console.log("yeaaaaa");
        console.log(res);
      });
  };
  getWeather = e => {
    e.preventDefault();
    this.getdistance();

    console.log("ok, yea");
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${this.state.citytosearch},${this.state.countrytosearch}&appid=${api_key}`
      )
      // axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Jerusalem,il&appid=${api_key}`)
      .then(res => {
        const weather = res.data;
        console.log(weather);
        console.log("/////////");
        console.log(weather.weather[0].id);
        this.setState({
          tooHot: Math.round(weather.main.temp - 273.15) > 35 ? true : false,
          isRain: false,
          isSnow: false,
          Errors: null,
          isRequested: true,
          city: weather.name,
          country: weather.sys.country,
          celsius: Math.round(weather.main.temp - 273.15),
          farenheit: Math.round(((weather.main.temp - 273.15) * 9) / 5 + 32),
          feelslikeC: Math.round(weather.main.feels_like) - 273,
          feelslikeF: Math.round(
            ((weather.main.feels_like - 273.15) * 9) / 5 + 32
          ),
          mintempC: Math.round(weather.main.temp_min - 273.15),
          mintempF: Math.round(((weather.main.temp_min - 273.15) * 9) / 5 + 32),
          maxtempC: Math.round(weather.main.temp_max - 273.15),
          maxtempF: Math.round(((weather.main.temp_max - 273.15) * 9) / 5 + 32),
          humidity: weather.main.humidity,
          weatherID: weather.weather[0].id,
          description: this.capitalize(weather.weather[0].description)
        });
        this.getIcon(weather.weather[0].id);
      })
      .catch(err => {
        this.setState({
          Errors: err.response.data.message
        });
        console.log("oops");
        console.log(err.response.data);
      });
  };

  capitalize = word => {
    let newword = "";
    newword += word[0].toUpperCase();

    for (var i = 1; i < word.length; i++) {
      if (word[i - 1] == " ") {
        newword += word[i].toUpperCase();
      } else {
        newword += word[i];
      }
    }

    console.log("chickenb");
    console.log(newword);
    return newword;
  };

  render() {
    if (this.state.temptype === "celsius") {
      return (
        <div className="App">
          <h1 className="weather_heading inline-block">How is the Weather? </h1>
          <a
            className="inline-block"
            href="#"
            onClick={e => {
              this.switchTempTypeToF(e);
            }}
          >
            F
          </a>{" "}
          | <a>C</a>
          <LocationForm
            type="input"
            cityname="City"
            countryname="Country"
            label1="Enter City: "
            label2="Enter Country: "
            weatherfunction={this.getWeather}
            onChangeHandler1={this.onChangeHandler1}
            onChangeHandler2={this.onChangeHandler2}
            errors={
              this.state.Errors != null ? this.state.Errors.message : null
            }
          />
          {/* ternary operator */}
          {this.state.isRequested === true ? (
            <Weather
              city={this.state.city}
              country={this.state.country}
              temperature={this.state.celsius}
              tempsymbol="C"
              feelslike={this.state.feelslikeC}
              minTemp={this.state.mintempC}
              maxTemp={this.state.maxtempC}
              humidity={this.state.humidity}
              description={this.state.description}
              icon={this.state.icon}
            />
          ) : null}
          <br />
          <br />
          {this.state.isRequested === true ? (
            <Attire
              minTemp={this.state.mintempF}
              isRequested={this.state.isRequested}
              weatherID={this.state.weatherID}
              tooHot={this.state.tooHot}
              farenheit={this.state.farenheit}
              isRain={this.state.isRain}
            />
          ) : null}
        </div>
      );
    } else if ((this.state.temptype = "farenheight")) {
      return (
        <div className="App">
          <h1 className="weather_heading">How is the Weather? </h1>
          <a>F</a> |{" "}
          <a
            href="#"
            onClick={e => {
              this.switchTempTypeToC(e);
            }}
          >
            C
          </a>
          <LocationForm
            type="input"
            cityname="City"
            countryname="Country"
            label1="Enter City: "
            label2="Enter Country: "
            weatherfunction={this.getWeather}
            onChangeHandler1={this.onChangeHandler1}
            onChangeHandler2={this.onChangeHandler2}
            errors={this.state.Errors}
          />
          {this.state.isRequested === true ? (
            <Weather
              city={this.state.city}
              country={this.state.country}
              temperature={this.state.farenheit}
              tempsymbol="F"
              feelslike={this.state.feelslikeF}
              minTemp={this.state.mintempF}
              maxTemp={this.state.maxtempF}
              humidity={this.state.humidity}
              description={this.state.description}
              icon={this.state.icon}
            />
          ) : null}
          <br />
          <br />
          {this.state.isRequested === true ? (
            <Attire
              minTemp={this.state.mintempF}
              isRequested={this.state.isRequested}
              weatherID={this.state.weatherID}
              tooHot={this.state.tooHot}
              farenheit={this.state.farenheit}
              isRain={this.state.isRain}
            />
          ) : null}
        </div>
      );
    }
  }
}

export default App;
