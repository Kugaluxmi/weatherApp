import React, { useState } from 'react'
import './WeatherApp.css'
import searchbutton from '../asset/search.png'
import clearicon from '../asset/sun.png'
import cloudicon from '../asset/cloud.png'
import drizzleicon from '../asset/drizzel.png'
import rainicon from '../asset/rain.png'
import snowicon from '../asset/snow.png'
import windicon from '../asset/wind.png'
import humidityicon from '../asset/humididy.png'

const WeatherApp = () => {
  let api_key = '37acabec059e74afc7f28753a433d615';
  const [wicon, setWicon] = useState(cloudicon);

  const search = async () => {
    const element = document.getElementsByClassName("cityinput");
    if(element[0].value ===""){
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`


    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName('humiditypercent')
    const wind = document.getElementsByClassName('windrate')
    const temprature = document.getElementsByClassName("weathertemp")
    const location = document.getElementsByClassName('weatherlocation')

    humidity[0].innerHTML = Math.floor(data.main.humidity) + "%";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
    temprature[0].innerHTML = Math.floor(data.main.temp) + "°c";
    location[0].innerHTML = data.name;

    if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
      setWicon(clearicon);
    }else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
      setWicon(cloudicon);
    }else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
      setWicon(drizzleicon);
    }else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
      setWicon(drizzleicon);
    }else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
      setWicon(rainicon);
    }else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
      setWicon(rainicon);
    }else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
      setWicon(snowicon);
    }else{
      setWicon(clearicon);
    }
  }

  return (
    <div className='container'>
        <div className='top-bar'>
            <input type='text' className='cityinput' placeholder='Search a city'></input>
            <div className='searchicon' onClick={()=>{search()}}>
              <img src={searchbutton} alt="" className='search'/>
            </div>
        </div>
        <div className="weatherimg">
          <img src={wicon} alt="" />
        </div>
        <div className="weathertemp"></div>
        <div className="weatherlocation"></div>
        <div className="datacontainer">
          <div className="element">
            <img src={humidityicon} alt="" className="icon" />
            <div className="data">
              <div className="humiditypercent"></div>
              <div className="text">Humididy</div>
            </div>
          </div>
          <div className="element">
            <img src={windicon} alt="" className="icon" />
            <div className="data">
              <div className="windrate"></div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default WeatherApp