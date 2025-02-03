type WeatherProps = {
  title: string;
  numQuestion: number;
  link: string;
};

export const Quiz = ({ title, numQuestion, link }: WeatherProps) => {
  return (
    <div className=" bg-blue-400/70 rounded-md p-2">
      <h2>
        <span className="font-semibold">{title}</span>
      </h2>
      <p>
        <span className="font-semibold">{numQuestion}</span>
      </p>
      <a href={link}>
        <span className="font-semibold">Start quiz</span>
      </a>
    </div>
  );
};
