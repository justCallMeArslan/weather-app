
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
        return data.results || []; // open-meteo provides API example with results responsibe for data
    } catch (err) {
        console.error("Failed to fetch", err);
    }
}

export async function getCityName(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const res = await fetch(url, {
        headers: { // required for API
            "Accept": "application/json",
            "User-Agent": "weather-app-demo"
        }
    });
    if (!res.ok) throw new Error("Reverse geocoding failed");
    const data = await res.json();
    return {
        name: data.address?.city || data.address?.town || data.address?.village,
        country: data.address?.country
    };
}

export async function geoWeatherHandler(lat, lon) {
    const city = await getCityName(lat, lon);
    const location =
        city?.name && city?.country
            ? `${city.name}, ${city.country}`
            : `${lat},${lon}`;
    return await getWeatherData(location);
}
