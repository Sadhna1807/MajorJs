async function getWeather(city) {
  document.getElementById("cityName").textContent = city; // Set the city name in the header

  const url = 'https://weather-api99.p.rapidapi.com/weather?city=' + city;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY',
      'x-rapidapi-host': 'weather-api99.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Construct the weather data display
    const weatherInfo = `
      <p>Temperature: ${data.main.temp} K</p>
      <p>Feels Like: ${data.main.feels_like} K</p>
      <p>Min Temperature: ${data.main.temp_min} K</p>
      <p>Max Temperature: ${data.main.temp_max} K</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Cloudiness: ${data.clouds ? data.clouds.all : 'N/A'}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
      <p>Wind Direction: ${data.wind.deg}°</p>
      <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
      <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
    `;
    
    document.getElementById("weatherData").innerHTML = weatherInfo;

  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.getElementById("weatherData").innerHTML = `<p>Error fetching weather data for ${city}.</p>`;
  }
}


// Event listener for the submit button
document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();  // Prevents the form from submitting and reloading the page
  const city = document.getElementById("city").value;  // Gets the value of the input field
  getWeather(city);  // Calls the getWeather function with the city name as an argument
});

  
  
