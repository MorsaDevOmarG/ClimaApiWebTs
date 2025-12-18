import axios from "axios";
import { SearchType } from "../../types";

export default function useWeather() {

  const fetchWeather = async (search: SearchType) => {
    // console.log('Consultando...');

    const appId = "24b6bad0cf51efb21e488f10ea0f2d2d";

    try {
      // const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}`;
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&&appid=${appId}`;
      // console.log(geoUrl);

      const data = await axios(geoUrl);
      console.log(data);

    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchWeather
  };
};