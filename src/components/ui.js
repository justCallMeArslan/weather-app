import { format } from "date-fns";

export function userRequest(handler) {

    const form = document.querySelector(".userForm");
    const input = document.querySelector("#locationInput");


    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const userInput = input.value.trim(); // sends userInput

        const data = await handler(userInput); //returns data
        renderWeather(data);

        input.value = "";
        document.querySelector(".suggest").innerHTML = ""
    })
}


export function renderWeather(data) {

    const localTimeData = data.currentConditions.datetime;
    const localTime = new Date(`1969-01-01T${localTimeData}`).getHours();
    console.log(localTime);

    const feelsLikeData = data.days[0].hours[localTime].feelslike;

    const sunriseData = data.currentConditions.sunrise;
    const sunriseTime = new Date(`1969-01-01T${sunriseData}`);
    const sunsetData = data.currentConditions.sunset;
    const sunsetTime = new Date(`1969-01-01T${sunsetData}`);

    // current conditions
    const body = document.querySelector("#app");

    body.innerHTML = "";

    const renderContainer = document.createElement("div");
    const address = document.createElement("p");
    address.textContent = data.address;
    const temp = document.createElement("p");
    temp.textContent = Math.round(data.currentConditions.temp) + " °C";
    const feelsLike = document.createElement("p");
    feelsLike.textContent = `Feels like: ${Math.round(feelsLikeData)} °C`;
    const conditions = document.createElement("p");
    conditions.textContent = data.currentConditions.conditions;
    const humidity = document.createElement("p");
    humidity.textContent = "Air humidity: " + Math.round(data.currentConditions.humidity) + "%";
    const windspeed = document.createElement("p");
    windspeed.textContent = "Windspeed: " + Math.round(data.currentConditions.windspeed) + " km/h";
    const sunrise = document.createElement("p");
    sunrise.textContent = "Sunrise : " + format(sunriseTime, "HH:mm");
    const sunset = document.createElement("p");
    sunset.textContent = "Sunset: " + format(sunsetTime, "HH:mm");


    body.appendChild(renderContainer);
    renderContainer.append(address, temp, feelsLike, conditions, humidity, windspeed, sunrise, sunset);


}


export function setupAutocomplete(handler) {
    const input = document.querySelector("#locationInput");

    input.addEventListener("input", async (e) => {
        const value = e.target.value.trim();
        const results = await handler(value);
        renderSuggestions(results)
    })
}


export function renderSuggestions(cities) {
    const list = document.querySelector(".suggest");
    if (!list) return;
    list.innerHTML = "";
    cities.forEach(city => {
        const li = document.createElement("li");
        li.textContent = `${city.name}, ${city.country}`;

        li.addEventListener("click", () => {
            document.querySelector("#locationInput").value = city.name + ", " + city.country;
            list.innerHTML = "";
        })

        list.appendChild(li);
    });
}