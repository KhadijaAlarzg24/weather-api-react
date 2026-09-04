import axios from "axios";
import { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import WeatherCard from "./WeatherCard";
import Forecast from "./Forecast";
import { getClothingAdvice } from "../services/aiService";
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
  const [clothingAdvice, setClothingAdvice] = useState({ text: "", icon: "👕" });
  const [loadingAdvice, setLoadingAdvice] = useState(false);
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

      const currentTemp = Math.round(today.main.temp);
      const currentDesc = today.weather[0].description;

      setWeather({
        city: data.city.name,
        temp: currentTemp,
        desc: currentDesc,
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

      // ✔ Fetch Clothing Advice & Icon
      setLoadingAdvice(true);
      const adviceObj = await getClothingAdvice(data.city.name, currentTemp, currentDesc);
      setClothingAdvice(adviceObj);
      setLoadingAdvice(false);

    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("City Not Found!");
      setLoadingAdvice(false);
    }
  };

  // ✔ Download weather for a virtual city
  useEffect(() => {
    fetchWeather("Agadir");
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center px-5 transition-all duration-1000 pb-10"
      style={{
        backgroundImage: `url(${backgrounds[bgIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay light */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
        
        {/* Title */}
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
        
        {/* Search bar */}
        <SearchBox onSearch={fetchWeather} /> 
      </div>

      {weather && <WeatherCard weather={weather} />}

      {/* AI Clothing Recommendation Card */}
      {weather && (
        <div className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 mt-4 text-white text-center shadow-lg">
          <h3 className="text-lg font-bold mb-1 flex items-center justify-center gap-2">
            <span>{clothingAdvice.icon || "💡"}</span> Smart Outfit Advice
          </h3>
          {loadingAdvice ? (
            <p className="text-sm italic text-gray-200 animate-pulse">Generating recommendation...</p>
          ) : (
            <p className="text-sm font-medium">{clothingAdvice.text || clothingAdvice}</p>
          )}
        </div>
      )}

      {forecast.length > 0 && <Forecast forecast={forecast} />}

    </div>



  );
}

export default App;