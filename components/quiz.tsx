type QuizProps = {
  title: string;
  numQuestions: number;
  link: string;
};

export const Quiz = ({ title, numQuestions, link }: QuizProps) => {
  return (
    <div className=" bg-blue-400/70 space-y-2 rounded-md p-4 w-fit">
      <h2>
        Quiz title: <span className="font-semibold">{title}</span>
      </h2>
      <p>
        Number of Questions:
        <span className="font-semibold">{numQuestions}</span>
      </p>
      <div>
        <a href={link} className="bg-black p-2 rounded-md">
          <span className="text-white text-xs">Start quiz</span>
        </a>
      </div>
    </div>
  );
};

// type WeatherProps = {
//   temperature: number;
//   weather: string;
//   location: string;
// };

// export const Weather = ({ temperature, weather, location }: WeatherProps) => {
//   return (
//     <div>
//       <h2>Current Weather for {location}</h2>
//       <p>Condition: {weather}</p>
//       <p>Temperature: {temperature}°C</p>
//     </div>
//   );
// };
