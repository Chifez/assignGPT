type WeatherProps = {
  temperature: number;
  weather: string;
  location: string;
};

export const Weather = ({ temperature, weather, location }: WeatherProps) => {
  return (
    <div className=" bg-blue-400/70 rounded-md p-2">
      <h2>
        Current Weather in <span className="font-semibold">{location}</span>
      </h2>
      <p>
        Condition: <span className="font-semibold">{weather}</span>
      </p>
      <p>
        Temperature: <span className="font-semibold">{temperature}°C</span>
      </p>
    </div>
  );
};
