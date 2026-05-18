

export function userRequest(handler) {

    const form = document.querySelector(".userForm");
    const input = document.querySelector("#locationInput");


    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const userInput = input.value.trim(); // sends userInput

        const data = await handler(userInput); //returns data
        renderWeather(data)
    })
}


export function renderWeather(data) {
    const body = document.querySelector("#app");
    const renderContainer = document.createElement("div");
    const address = document.createElement("p");
    address.textContent = data.address;
    const conditions = document.createElement("p");
    
    const sunrise = document.createElement("p");
    const sunset = document.createElement("p");

    const temp = document.createElement("p");
    

    body.appendChild(renderContainer);

    renderContainer.append(address, conditions, sunrise, sunset, temp);

}