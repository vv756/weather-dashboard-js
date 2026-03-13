async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const result = document.getElementById("result");

  if (!city) {
    result.innerHTML = `<p class="error">Please enter a city name.</p>`;
    return;
  }

  const apiKey = "YOUR_API_KEY";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    result.innerHTML = `<p>Loading...</p>`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      result.innerHTML = `<p class="error">City not found. Please try again.</p>`;
      return;
    }

    result.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
      <p><strong>Weather:</strong> ${data.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    result.innerHTML = `<p class="error">Something went wrong. Please try again.</p>`;
  }
}