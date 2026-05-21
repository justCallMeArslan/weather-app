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
    const feelsLikeData = data.days[0].hours[localTime].feelslike;
    const sunriseData = data.currentConditions.sunrise;
    const sunriseTime = new Date(`1969-01-01T${sunriseData}`);
    const sunsetData = data.currentConditions.sunset;
    const sunsetTime = new Date(`1969-01-01T${sunsetData}`);

    // current conditions
    const body = document.querySelector("#app");
    body.innerHTML = "";
    const renderContainer = document.createElement("div");
    renderContainer.classList.add("output")
    const main = document.createElement("div")
    main.classList.add("main")
    const address = document.createElement("p");
    address.textContent = data.address;
    const temp = document.createElement("p");
    temp.textContent = Math.round(data.currentConditions.temp) + " °C";
    const subOne = document.createElement("div");
    subOne.classList.add("subOne")
    const feelsLike = document.createElement("p");
    feelsLike.textContent = `Feels like: ${Math.round(feelsLikeData)} °C`;
    const conditions = document.createElement("p");
    conditions.textContent = data.currentConditions.conditions;
    const subTwo = document.createElement("div");
    subTwo.classList.add("subTwo")
    const humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + Math.round(data.currentConditions.humidity) + "%";
    const windspeed = document.createElement("p");
    windspeed.textContent = "Wind: " + Math.round(data.currentConditions.windspeed) + " km/h";
    const subThree = document.createElement("div");
    subThree.classList.add("subThree")
    const sunrise = document.createElement("p");
    sunrise.textContent = "Sunrise : " + format(sunriseTime, "HH:mm");
    const sunset = document.createElement("p");
    sunset.textContent = "Sunset: " + format(sunsetTime, "HH:mm");


    body.appendChild(renderContainer);
    renderContainer.append(main, subOne, subTwo, subThree);
    main.append(address, temp);
    subOne.append(feelsLike, conditions);
    subTwo.append(humidity, windspeed);
    subThree.append(sunrise, sunset)

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
    const input = document.querySelector("#locationInput");
    if (!list || !input) return;
    const getFlag = (countryCode) => {
        return countryCode
            .toUpperCase()
            .split("")
            .map(c => String.fromCodePoint(127397 + c.charCodeAt(0)))
            .join("");
    }
    list.innerHTML = "";
    cities.forEach(city => {
        const li = document.createElement("li");
        const flag = getFlag(city.country_code);
        li.textContent = `${flag} ${city.name}, ${city.country}`;
        li.addEventListener("click", () => {
            input.value = city.name + ", " + city.country;
            list.innerHTML = ""; //clear dropdown
            input.form.requestSubmit(); // to proc submit 
        })

        list.appendChild(li);
    });
}

export function getGeolocation(handler) {
    window.addEventListener("load", () => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(async (pos) => {
            handler(pos.coords.latitude, pos.coords.longitude);
        });
    });
}