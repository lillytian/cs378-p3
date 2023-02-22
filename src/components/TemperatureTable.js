import { useEffect, useState } from "react";

function TemperatureTable(props) {
  const [times, setTimes] = useState([]);
  const [temperatures, setTemperatures] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);

  useEffect(() => {
    const geocodeURL = `https://geocoding-api.open-meteo.com/v1/search?name=${props.city}`;

    fetch(geocodeURL)
      .then((res) => res.json())
      .then((data) => {
        const cityInfo = data["results"][0];
        const latitude = cityInfo["latitude"];
        const longitude = cityInfo["longitude"];

        const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&temperature_unit=fahrenheit&timezone=auto`;

        fetch(weatherURL)
          .then((res) => res.json())
          .then((data) => {
            setTimes(data["hourly"]["time"]);
            setTemperatures(data["hourly"]["temperature_2m"]);
            setFetchedData(true);
          });
      });
  });

  const renderTemperatureRows = () => {
    return times.map((time, index) => {
      return (
        <tr key={time}>
          <td>{time}</td>
          <td>{temperatures[index]}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      {fetchedData ? (
        <table>
          <thead>
            <tr>
              <td>Time</td>
              <td>Temperature</td>
            </tr>
          </thead>
          <tbody>{renderTemperatureRows()}</tbody>
        </table>
      ) : null}
    </div>
  );
}

export default TemperatureTable;
