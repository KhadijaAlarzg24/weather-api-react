import { Sun, CloudSun, CloudRain, CloudSnow } from "lucide-react";

function Forecast({ forecast }) {
  const getIcon = (desc) => {
    const d = desc.toLowerCase();
    if (d.includes("rain")) return <CloudRain className="w-9 h-9 text-blue-500" />;
    if (d.includes("cloud")) return <CloudSun className="w-9 h-9 text-gray-500" />;
    if (d.includes("snow")) return <CloudSnow className="w-9 h-9 text-indigo-500" />;
    return <Sun className="w-9 h-9 text-yellow-500" />;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6 w-full max-w-lg">
      {forecast.map((day, index) => (
        <div
          key={index}
          className="p-4 bg-white/30 rounded-xl text-center shadow-md flex flex-col items-center"
        >
          <p className="font-bold">{day.date}</p>
          <div className="flex items-center gap-2 mt-2">
            {getIcon(day.desc)}
            <p className="text-lg">{day.temp}°C</p>
          </div>
          <p className="capitalize text-sm mt-1">{day.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default Forecast;
