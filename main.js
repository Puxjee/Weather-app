const apiKey = "769f2d90707cafcf21aada644cc29b15"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="

let inputEl = document.getElementById("cityName")
const buttonEl = document.getElementById("searchButton")
const weatherIcon = document.querySelector(".weather-icon")


async function checkWeather(cityName)  {
    const response = await fetch(apiUrl + cityName + "&appid=" + apiKey)
    
    if(response.status === 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    } else {
        let data = await response.json();

        document.querySelector(".city").innerHTML = data.name
        document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`
        document.querySelector(".wind").innerHTML = `${data.wind.speed}Km/h`
        
        

        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none"


        
        const timezoneOffset = data.timezone;
        const currentTime = new Date().getTime() / 1000 + timezoneOffset;
        const cityTime = new Date(currentTime * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });

        document.querySelector(".city-time").innerHTML = cityTime;

        const sunriseTime = new Date((data.sys.sunrise + timezoneOffset) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
        const sunsetTime = new Date((data.sys.sunset + timezoneOffset) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC'})



        let dayStatus = "";
        if (cityTime > sunriseTime && cityTime < sunsetTime) {
            dayStatus = "Day";
        } else {
            dayStatus = "Night";
        }
        

        const weatherImages = {
            "Clear": {day: "images/clear_day.png", night: "images/clear_night.png"},
            "Clouds": {day: "images/cloud_day.png", night: "images/cloud_night.png"},
            "Drizzle": {day: "images/drizzle.png", night: "drizzle.png"},
            "Mist": {day: "images/fog_day.png", night: "images/fog_night.png"},
            "Rain": {day: "images/rain_day.png", night: "images/rain_night.png"},
            "Snow": {day: "images/snow.png", night: "images/snow.png"}
        }

        let weatherIconPath = "";
        if (weatherImages[data.weather[0].main]) {
            weatherIconPath = dayStatus === "Day" ? weatherImages[data.weather[0].main].day : weatherImages[data.weather[0].main].night;
        } else {
            weatherIconPath = "images/default.png";
        }

       weatherIcon.src = weatherIconPath;

    }

    
    
}

buttonEl.addEventListener("click", () =>{
    checkWeather(inputEl.value)
})
