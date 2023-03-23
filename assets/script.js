// TODO: Style current HTML

const apiKey = 'bdc4b4130942cbaf0f27dca739d53c1a';
const history = JSON.parse(localStorage.getItem('history')) || [];
// TODO: Populate history list from local storage when page loads
const userInput = $('#search-input').val();

console.log()
// Search City
$('#search-form').on('submit', function(event) {
    event.preventDefault();
    const userInput = $('#search-input').val();

    const queryUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=5&appid=' + apiKey;
    // TODO: put the search value on the history list container

    // Add the history to local storage
    history.push(userInput);
    localStorage.setItem('history', JSON.stringify(history));

    // Call Geocoding API when search form is submitted to find city lat and long value
    $.ajax({ url: queryUrl })
        .then(function(response) {
            const lat = response[0].lat;
            const lon = response[0].lon;

            console.log(lat, lon);

            const weatherQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=meteric&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

            //display search list
            $('#history-list').prepend(`<li>${userInput}</li>`);
            
            $('#search-input').val('');

            //clear search list 
            


            // Call 5 day weather forecast API after we have city lat and lon value
            $.ajax({ url: weatherQueryUrl })
                .then(function(weatherResponse) {
                    // https://openweathermap.org/img/w/" + iconcode + ".png"
                    console.log(weatherResponse);

                    // Put the response on the HTML page
                    const weatherList = weatherResponse.list;
                    // Current forecast
                    const current = weatherList[0];
                   // console.log(today);
                    
                     const currentCity = response[0].name;
                     const currentTime = moment().format("dddd, MMMM YYYY, h:mm:ss a");
                     const currentIcon = current.weather[0].icon;
                     const currentTemp = current.main.temp;
                     const currentHumidity = current.main.humidity;
                     const currentWind = current.wind.speed;
                     const currentDescrip = current.weather[0].description;
                   
                     // TODO: put today's weather in container for today's weather
                    
                     $('#current').append(`
                     <p>City:${currentCity}</p>
                     <p>Date:${currentTime}</p>
                     <img src="http://openweathermap.org/img/wn/${currentIcon}.png"></img>');
                     <p>${currentDescrip}</p>
                     <p>Temperature: ${currentTemp.toFixed(0)}°C</p>
                     <p>Humidity: ${currentHumidity} %</p>
                     <p>Wind speed: ${currentWind}mph</p>
                     `);
                                        // 5 days forecas                                      
                        //console.log(weather);
                        // TODO: put 5 day's forecast weather in container for the 5 day forecast
                        $('#forecast').html('');
                        for (let i = 1; i < weatherList.length; i += 8) {
                            const weather = weatherList[i];
                            const timestamp = weather.dt;
                        
                            const forecastIconCode = weather.weather[0].icon;
                            const forecastIconUrl = "https://openweathermap.org/img/w/" + forecastIconCode + ".png";
                            const forecastTemperature = weather.main.temp;
                            const forecastWeatherDescription = weather.weather[0].description;
                            const forecastWindSpeed = weather.wind.speed;
                            const forecastHumidity = weather.main.humidity;
                            const forecastDate = new Date(timestamp * 1000);
                            const forecastFormattedDate = forecastDate.toLocaleDateString();

                            $('#forecast').append(`
                            <div class="card">
                                <div class="card-body">
                                    <p class="card-title">${forecastFormattedDate}</p>
                                    <img src="${forecastIconUrl}" class="card-img-top">
                                    <p class="card-text">${forecastWeatherDescription}</p>
                                    <p class="card-text">Temperature: ${forecastTemperature.toFixed(0)}°C</p>
                                    <p class="card-text">Humidity: ${forecastHumidity} %</p>
                                    <p class="card-text">Wind speed: ${forecastWindSpeed}mph</p>
                                    </div>
                                    `);
                                   
                    }
                });
        });
});