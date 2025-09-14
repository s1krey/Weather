const form = document.getElementById('weatherForm');
const input = document.getElementById('cityInput');
const card = document.getElementById('weatherCard');

const API_KEY = "73031bb755032c2209b2a1a5e422663d";

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const city = input.value.trim();
  if (!city) return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=uk`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Мисто не знайдено");
      }
      return response.json();
    })
    .then(data => {
      card.innerHTML = `
        <div class="weather-card">
          <h2>${data.name}, ${data.sys.country}</h2>
          <p><strong>Температура:</strong> ${Math.round(data.main.temp)}°C</p>
          <p><strong>Видчуваеться як:</strong> ${Math.round(data.main.feels_like)}°C</p>
          <p><strong>Погода:</strong> ${data.weather[0].description}</p>
          <p><strong>Влажнисть:</strong> ${data.main.humidity}%</p>
          <p><strong>Витер:</strong> ${data.wind.speed} м/с</p>
        </div>
      `;
    })
    .catch(error => {
      console.error("Error:", error.message);
      card.innerHTML = `
        <div class="weather-card">
          <h2>Error</h2>
          <p>${error.message}. Try another city.</p>
        </div>
      `;
    });
});