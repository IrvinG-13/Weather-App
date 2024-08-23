
function content() {
    const content = document.getElementById('content');

    
    const pageContent = document.createElement('div');
    pageContent.classList.add('page-content');
    pageContent.setAttribute('id', 'page-content-main');

    //const title = document.createElement('h1');
    //title.setAttribute('id', 'title');
    //title.textContent = 'App Weather';
    //pageContent.appendChild(title);

    const boxWeather = document.createElement('div');
    boxWeather.setAttribute('id', 'boxWeather');
    pageContent.appendChild(boxWeather);

    const boxSearch = document.createElement('div');
    boxSearch.setAttribute('id', 'boxSearch');
    boxWeather.appendChild(boxSearch);

    const inputSearch = document.createElement('input');
    inputSearch.setAttribute('id', 'inputS');
    boxSearch.appendChild(inputSearch);

    const btnSearch = document.createElement('button');
    btnSearch.setAttribute('id', 'btnS');
    btnSearch.innerHTML = '<i class="bi bi-search"></i>';
    boxSearch.appendChild(btnSearch);

    const nameCity = document.createElement('h2');
    nameCity.setAttribute('id', 'nameCity');
    nameCity.innerText ='Panama'
    boxWeather.appendChild(nameCity);

    const tempt = document.createElement('p');
    tempt.setAttribute('id', 'tempt');
    tempt.innerText = '27°'
    boxWeather.appendChild(tempt);

    const boxStats = document.createElement('div');
    boxStats.setAttribute('id', 'boxStats');
    boxWeather.appendChild(boxStats);

    const boxHumidity = document.createElement('div');
    boxHumidity.setAttribute('id', 'boxHumidity');
    boxStats.appendChild(boxHumidity);

    const humidityTitle = document.createElement('p');
    humidityTitle.setAttribute('id', 'humidityTitle');
    humidityTitle.innerHTML = '<i class="bi bi-droplet"></i> Humidity';
    boxHumidity.appendChild(humidityTitle);

    const humidity = document.createElement('p');
    humidity.setAttribute('id', 'humidity');
    humidity.innerText = '56%'
    boxHumidity.appendChild(humidity);

    const boxWind = document.createElement('div');
    boxWind.setAttribute('id', 'boxWind');
    boxStats.appendChild(boxWind);

    const windTitle = document.createElement('p');
    windTitle.setAttribute('id', 'windTitle');
    windTitle.innerHTML = '<i class="bi bi-wind"></i> Wind Speed';
    boxWind.appendChild(windTitle);

    const windSpeed = document.createElement('p');
    windSpeed.setAttribute('id', 'windSpeed');
    windSpeed.innerText = '2.87km/h'
    boxWind.appendChild(windSpeed);

    const apiKey = '88c6baf6718d580ad5a111c0d7bf9f98';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

    async function checkWeather(city) {
        try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            if (!response.ok) throw new Error('City not found or API request failed');
            const data = await response.json();
             console.log(data)
            document.getElementById('nameCity').innerHTML = data.name;
            document.getElementById('tempt').innerHTML = Math.round(data.main.temp) + '°C';
            document.getElementById('humidity').innerHTML = data.main.humidity + '%';
            document.getElementById('windSpeed').innerHTML = data.wind.speed + 'km/h';

            
            let weatherCondition = data.weather[0].main;
            let imagePath;
            tempt.style.display = 'block'
            boxStats.style.display = 'flex'

            if (weatherCondition == 'Clouds') {
                imagePath = require('./assets/clouds.jpg');

            } else if (weatherCondition == 'Clear') {
                imagePath = require('./assets/clear.jpg');

            } else if (weatherCondition == 'Rain') {
                imagePath = require('./assets/rain.jpg');

            } else if (weatherCondition == 'Drizzle') {
                imagePath = require('./assets/drizzle.jpg');

            } else if (weatherCondition == 'Mist') {
                imagePath = require('./assets/mist.jpg');

            } else {
                imagePath = require('./assets/mist.jpg'); 
            }

            pageContent.style.backgroundImage = `url(${imagePath})`;

        } catch (error) {
            nameCity.innerHTML= 'City not found'
            tempt.style.display = 'none'
            boxStats.style.display = 'none'
        }
    }

    btnSearch.addEventListener('click', () => {
        checkWeather(inputSearch.value);
    });

    content.appendChild(pageContent);
}

export default content;
