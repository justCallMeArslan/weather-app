import './style.css'
import { inputAutoComplete, geoWeatherHandler, getWeatherData } from './components/api';
import { userRequest, setupAutocomplete, getGeolocation, renderWeather } from './components/ui';

userRequest(getWeatherData);
setupAutocomplete(inputAutoComplete);
getGeolocation(async (lat, lon) => {
    const data = await geoWeatherHandler(lat, lon);
    renderWeather(data);
});