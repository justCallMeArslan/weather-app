import './style.css'
import { inputAutoComplete, geoWeatherHandler } from './components/api';
import { userRequest, setupAutocomplete, getGeolocation, renderWeather } from './components/ui';

userRequest(geoWeatherHandler);
setupAutocomplete(inputAutoComplete);
getGeolocation(async (lat, lon) => {
    const data = await geoWeatherHandler(lat, lon);
    renderWeather(data);
});