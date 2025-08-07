async function fetchWeather(){
    let searchInput = document.getElementById("search").value;
    const weatherDataSection = document.getElementById("weather-data");
    weatherDataSection.style.display = "block";
    const apiKey = "My_API_Key";
    if (searchInput == "") {
        weatherDataSection.innerHTML = `
        <div>
            <h2>Entrada Vacía!</h2>
            <p>Please try again with a valid <u>city name</u>.</p>
        </div>`;
        return;
    }
    async function getLonAndLat(){
        const countryCode = "ES";
        const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKey}`
        const response = await fetch(geocodeURL);
        if (!response.ok) {
            console.log("Respuesta incorrecta! ", response.status);
            return null;
        }
        const data = await response.json();
        if (data.length == 0) {
            console.log("Algo salió mal aquí.");
            weatherDataSection.innerHTML = `
            <div>
                <h2>Entrada Inválida: "${searchInput}"</h2>
                <p>Intentelo de nuevo con un <u>nombre de ciudad</u> válido por favor.</p>
            </div>`;
            return null;
        }else{
            return data[0];
        }
    }
    async function getWeatherData(lon, lat){  
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await fetch(weatherURL);
        if (!response.ok) {
            console.log("Respuesta incorrecta! ", response.status);
            return;
        }
        const data = await response.json();
        weatherDataSection.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100"
        <div>
            <h2>${data.name}</h2>
            <p><strong>Temperatura:</strong> ${Math.round(data.main.temp - 273.15)}ºC</p>
        </div>
        `
    }
    document.getElementById("search").value = "";
    const geocodeData = await getLonAndLat();
    if (geocodeData) {
    await getWeatherData(geocodeData.lon, geocodeData.lat);
    }
}