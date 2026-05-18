export function userRequest(handler) {

    const form = document.querySelector(".userForm");
    const input = document.querySelector("#locationInput");


    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const location = input.value.trim();

        handler(location)
    })
}