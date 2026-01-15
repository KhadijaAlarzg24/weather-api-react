import axios from "axios";
import { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import WeatherCard from "./WeatherCard";
import Forecast from "./Forecast";

//✔ Import backgrounds from assets
import bg1 from "../assets/weather-bg.jpg";
import bg2 from "../assets/weather-2-bg.jpg";
import bg3 from "../assets/weather-3-bg.jpg";

const backgrounds = [bg1, bg2, bg3];

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [bgIndex, setBgIndex] = useState(0);
  const [cityInput, setCityInput] = useState("");
  
  const apikey = import.meta.env.VITE_OPENWEATHER_KEY;

  const handleSearch = () => {
    if (cityInput.trim()) {
      fetchWeather(cityInput);
    }
  };

  // ✔ Image background updates every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

// ✔ Fetching weather data
  const fetchWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;

    try {
      const res = await axios.get(url);
      const data = res.data;
      const today = data.list[0];

      setWeather({
        city: data.city.name,
        temp: Math.round(today.main.temp),
        desc: today.weather[0].description,
        humidity: today.main.humidity,
        wind: today.wind.speed,
      });

      const daily = data.list
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .map((day) => ({
          date: new Date(day.dt_txt).toLocaleDateString("en-US", {
            weekday: "short",
          }),
          temp: Math.round(day.main.temp),
          desc: day.weather[0].description,
        }));

      setForecast(daily);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("City Not Found!");
    }
  };

 // ✔ Download weather for a virtual city
  useEffect(() => {
    fetchWeather("Agadir");
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center px-5 transition-all duration-1000"
      style={{
        backgroundImage: `url(${backgrounds[bgIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay light */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* The main modification: the main container (rebuilt).*/}
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
        
        {/* Title: Centering it (due to items-center in the parent container) */}
        <h1 className="
          text-white 
          text-4xl 
          font-extrabold 
          mt-12 
          mb-4 
          tracking-widest 
          drop-shadow-xl
         
        ">
          Weather Forecast
        </h1>
        
        {/* Search bar: Centered (due to items-center in the parent container)) */}
        <SearchBox onSearch={fetchWeather} /> 
      </div>

      {weather && <WeatherCard weather={weather} />}
      {forecast.length > 0 && <Forecast forecast={forecast} />}

    </div>
  );
}

export default App;