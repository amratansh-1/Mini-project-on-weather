
const apiKey = "c862e5e547f78de9a7051f5e5c070bc6";

function getWeather() {
    const city = document.getElementById("city-input").value;
    const weatherInfo = document.getElementById("weather-info");

    if (city === "") {
        alert("Please enter a city name");
        return;
    }


    weatherInfo.style.display = "none";
    weatherInfo.innerHTML = "";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                weatherInfo.style.display = "block";
                weatherInfo.className = "error";
                weatherInfo.innerHTML = "City not found!";
            } else {
                const temp = data.main.temp;
                const description = data.weather[0].description;
                const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

                weatherInfo.style.display = "block";
                weatherInfo.className = "";
                weatherInfo.innerHTML = `
                    <h2>${city}</h2>
                    <img src="${icon}" alt="${description}">
                    <p>${temp}°C</p>
                    <p>${description}</p>
                `;
            }
        })
        .catch(error => {
            weatherInfo.style.display = "block";
            weatherInfo.className = "error";
            weatherInfo.innerHTML = "Error fetching weather data.";
        });
}
