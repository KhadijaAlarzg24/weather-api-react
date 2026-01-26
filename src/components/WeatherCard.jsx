import { Thermometer, Wind, Droplet, Cloud } from "lucide-react";

function WeatherCard({ weather }) {
  return (
    <div
      className="
       w-full max-w-lg mt-8 p-6
    bg-white/30
    backdrop-blur-none
    rounded-3xl shadow-xl
    border border-white/20
    text-gray-800
    font-bold
      "
    >
      <h2 className="text-2xl font-bold text-center">{weather.city}</h2>

      {/* Temperature section  */}
<div className="flex items-center justify-center gap-3 text-6xl font-black text-gray-900">
  <Thermometer className="w-10 h-10 stroke-[3px]" /> {/* زيادة سُمك حدود الأيقونة */}
  {weather.temp}°C
</div>

{/* Weather description section  */}
<p className="text-center font-bold capitalize flex items-center gap-3 justify-center mt-2 text-gray-700">
  <Cloud className="w-7 h-7 stroke-[2px]" />
  {weather.desc}
</p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex items-center gap-3">
          <Droplet className="w-6 h-6" />
          <span>{weather.humidity}% Humidity</span>
        </div>

        <div className="flex items-center gap-3">
          <Wind className="w-6 h-6" />
          <span>{weather.wind} km/h Wind</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
