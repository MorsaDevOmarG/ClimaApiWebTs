import axios from "axios";
import { SearchType, Weather } from "../types";

// unknown: desconocido, representa un valor cuyo tipo no conoces en el tiempo de compilación
function isWeatherResponse(weather : unknown) : weather is Weather {
  return (
    Boolean(weather) &&
    typeof weather === 'object' &&
    typeof (weather as Weather).name === 'string' &&
    typeof (weather as Weather).main.temp === 'number' &&
    typeof (weather as Weather).main.temp_max === 'number' &&
    typeof (weather as Weather).main.temp_min === 'number'
  );
}

export default function useWeather() {

  const fetchWeather = async (search: SearchType) => {
    // console.log('Consultando...');

    // const appId = "24b6bad0cf51efb21e488f10ea0f2d2d";
    const appId = import.meta.env.VITE_API_KEY;

    try {
      // Geocoding API - const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}`;
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;
      // console.log(geoUrl);

      const { data } = await axios(geoUrl);
      // console.log(data);

      const lat = data[0].lat;
      const lon = data[0].lon;

      // Current Weather Data - const watherURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      // Castear el TYPE
      // const { data: weatherResult } = await axios<Weather>(weatherUrl);
      // console.log(weatherResult);
      // console.log(weatherResult.main.temp);

      // Type Guardas
      const { data: weatherResult } = await axios(weatherUrl);
      const result = isWeatherResponse(weatherResult);
      // console.log(result);

      if (result) {
        console.log(weatherResult.name);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchWeather
  };
}
