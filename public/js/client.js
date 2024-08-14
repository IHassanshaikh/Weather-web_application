const button = document.querySelector(".searchbutton");
const input = document.querySelector(".input");
const city = document.querySelector(".city-name");
const temprature = document.querySelector(".temprature");
const icon = document.querySelector("#icon");
const time = document.querySelector(".time");
const container = document.querySelector(".container-lg");
const today = new Date();

let api_info;
let cityname;
let temp;
let maincondition;

const info = async (event) => {
    event.preventDefault();
    if (input.value === "") {
        city.innerHTML = "Enter city name";
    } else {
        // try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=0c7ba391097bfc9ba0deb4ada8934da3`
        let response = await fetch(url)
        api_info = await response.json();
        cityname = api_info.name;
        city.innerHTML = cityname

        temp = api_info.main.temp;
        let temprature_status = Math.floor(temp - 273.15);
        temprature.innerHTML = `<span>${temprature_status}</span><sup>o</sup>C`;

        maincondition = api_info.weather[0].main;
        console.log(maincondition);

        if (maincondition === "Clear") {
            icon.innerHTML = '<div><i id="icon" class="fa-solid fa-sun" style="color: #eccc68;"></i></div>';
        }
        else if (maincondition === "Clouds") {
            icon.innerHTML = '<div><i id="icon" class="fa-solid fa-cloud" style="color: #f1f2f6;"></i></div>';
        }
        else if (maincondition === "Rain") {
            icon.innerHTML = '<div><i id="icon" class="fa-solid fa-cloud-rain" style="color: #0374f6;"></i></div>';
        }
        else {
            icon.innerHTML = '<div><i id="icon" class="fa-solid fa-cloud" style="color: #0374f6;"></i></div>';
        }

        // for time
        const monthname = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
        const month = today.getMonth();

        const date = today.getDate();
        const day = today.getDay();
        const year = today.getFullYear();
        const hours = today.getHours();
        console.log(hours);

        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = daysOfWeek[day];

        time.innerHTML = `${dayName}, ${monthname[month]} ${date}, ${year}`

        if (hours < 6) {
            container.style.backgroundImage = "url('/img/night.avif')";
            container.style.color = 'White';
        } else if (hours <= 20) {
            container.style.backgroundImage = "url('/img/dawn.avif')";
        } else {
            container.style.backgroundImage = "url('/img/sunny.jpg')";

        }

    }
    // catch (error) {
    //     city.innerHTML = "Invalid City Name";
    // }
}


button.addEventListener("click", info);
