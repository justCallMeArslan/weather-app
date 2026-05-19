
export const getWeatherData = async (location) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const unitGroup = "metric";
    const contentType = "json";
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=${API_KEY}&contentType=${contentType}`;


    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Weather data:", data);
        return data;
    } catch (err) {
        console.error("Failed to fetch data", err);
    }
}


export const inputAutoComplete = async (query) => {
    if (!query || query.length < 2) return [];

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=7`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        // [] fallback used as safety precaution that received data can be corrupted
        console.log(data.results);
        return data.results || []; // open-meteo provides API example with results responsibe for data



    } catch (err) {
        console.error("Failed to fetch", err);
    }

}

