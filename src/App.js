import './App.css';
import React, {useState} from 'react'
// image 
import searchIcon from './assets/search.png'
import ClearIcon from './assets/clear.jpg'
import CloudIcon from './assets/cloud.jpg'
import DrizzileIcon from './assets/drizzile.png'
import HumidityIcon from './assets/humidity.png'
import RainIcon from './assets/rain.png'
import SnowIcon from './assets/snow.png'
import WindIcon from './assets/wind.png'

const WeatherDetails=({icon,temp,city,country,lat,log,humidity,wind})=>{
  return(
    <>
  <div className="image">
    <img src={icon}/>
  </div>
  <div className='temp'>{temp}°C</div>
  <div className='location'>{city}</div>
  <div className='country'>{country}</div>
  <div className='cord'>
    <div>
      <span className='lat'>Latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className='log'>Longitude</span>
      <span>{log}</span>
    </div>
  </div>
  <div className='data-container'>
    <div className='element'>
      <img src={HumidityIcon} className='icon'/>
      <div className='data'>
        <div className='humidity-presentage'>{humidity}%</div>
        <div className='text'>Humidity</div>
      </div>
    </div>
    <div className='element'>
      <img src={WindIcon} className='icon'/>
      <div className='data'>
        <div className='humidity-presentage'>{wind}km/h</div>
        <div className='text'>Wind Speed</div>
      </div>
    </div>
  </div>
  </>
  )
}

function App() {
  const [tcity,setTcity]=useState('')
  const [icon,setIcon]=useState(ClearIcon);
  const [temp,setTemp]=useState(0)
  const [city,setCity]=useState('')
  const [country,setCountry]=useState('IN')
  const [lat,setLat]=useState(0)
  const [log,setLog]=useState(0)
  const [humidity,setHumidity]=useState(0)
  const [wind,setWind]=useState(0)
  const [cityNotFound,setCityNotFound]=useState(false)
  const [loading,setLoading]=useState(true)
  const[error,setError]=useState(null)

  const weatherIconMap={
    "01d":ClearIcon,
    "01n":ClearIcon,

    "02d":CloudIcon,
    "02n":CloudIcon,

    "03d":DrizzileIcon,
    "03n":DrizzileIcon,

    "04d":DrizzileIcon,
    "04n":DrizzileIcon,

    "09d":RainIcon,
    "09n":RainIcon,

    "10d":RainIcon,
    "10n":RainIcon,

    "13d":SnowIcon,
    "13n":SnowIcon,

  }
 
//API
  //API
const search = async () => {
  setLoading(true);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${tcity}&appid=aed29d533d78028d15686fec50521752&units=Metric`
  try {
    let res = await fetch(url);
    let data = await res.json()
    if (data.cod === "404") {
      setCityNotFound(true);
      setLoading(false);
      return;
    }
    console.log(data)
    setHumidity(data.main.humidity)
    setWind(data.wind.speed)
    setTemp(Math.floor(data.main.temp))
    setCity(data.name)
    setCountry(data.sys.country)
    setLog(data.coord.lon)
    setLat(data.coord.lat)

    const weatherIconCode = data.weather[0].icon;
    setIcon(weatherIconMap[weatherIconCode] || ClearIcon); //default clearIcon
    setCityNotFound(false)

  } catch (error) {
    console.error("An error occurred", error.message);
    setError("An error occurred while fetching weather data.");
  } finally {
    setLoading(false);
  }
}

  const handle=(e)=>{
    setTcity(e.target.value)
  }
  // enter button work
  const handlekeydown=(e)=>{
    if(e.key==="Enter"){
      search();
    }
  }
  
  return (
    <div className="container">
      <div className='input-container'>
        <input type='text ' className='cityInput' placeholder='search cities' onChange={handle} value={tcity}
        onKeyDown={handlekeydown}
        ></input>
        <div>
        <img src={searchIcon}  alt='search' onClick={()=>{search()}}></img>
      </div>
      </div>
      
      {loading &&<div className='loading-message'>Loading.....</div>}
      {error &&<div className='error-message'>{error}</div>}
      {cityNotFound &&<div className='city-error'>City not found</div>}
      <p className='copyright'>

        {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city}
      country={country} lat={lat} log={log} humidity={humidity}
      wind={wind}
      />}
        Designed by <span>Krishnamoorthi</span>
      </p>
    </div>
  );
}
export default App;
