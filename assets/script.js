// Where city inputs will be stored
let cityName = [];


// Buttons to populated with city history. On click event to create search
function createButtons (array) {
    $('#history').empty();

    array.forEach(el => {
        $('#history').append(
            $(`<button type="button" class="cities btn btn-secondary btn-lg btn-block">${el}</button>`));
    });

    $("button.cities").on("click", function(event) {
        event.preventDefault();
        let click = $(this)[0].innerText;
        $('#search-input').val(click);
        $('#search-button').trigger("click");
        $('#search-input').val('');
    });
}
// pulls city from local storage
function start () {
    cityName = JSON.parse(localStorage.getItem('cityName')) || [];
    createButtons(cityName);
}

// if button is empty, a new city is pushed onto the button
function buttonsCity (city) {
    if (city != '' && cityName.includes(city) != true) {        
        cityName.push(city); 
        localStorage.setItem('cityName', JSON.stringify(cityName));
        createButtons(cityName);
    }
}

// Div created to hold the data of the forecast
function forecastDiv (day, icon,image, temp, wind, humidity) {
    let weather = $(`<div class="col forecast-tiles">
                        <h3>${day}</h3>
                        <img src="https://openweathermap.org/img/w/${icon}.png" alt="weather icon">
                        <p>Temp: ${temp} C</p>
                        <p>Wind: ${wind} KPH</p>
                        <p>Humidity: ${humidity}</p>
                    </div>`);
    $('#forecast').append(weather);
}
// forecast from the API is updated every 3 hours
function getIndexDay1 (currentHour) {
    let index = 0
    if (currentHour >= 0 && currentHour <= 2) {
        index = 0;   
    } else if (currentHour >= 3 && currentHour <= 5) {
        index = 1;        
    } else if (currentHour >= 6 && currentHour <= 8) {
        index = 2;
    } else if (currentHour >= 9 && currentHour <= 11) {
        index = 3;
    } else if (currentHour >= 12 && currentHour <= 14) {
        index = 4;
    } else if (currentHour >= 15 && currentHour <= 17) {
        index = 5;
    } else if (currentHour >= 18 && currentHour <= 20) {
        index = 6;
    } else if (currentHour >= 21 && currentHour <= 23) {
        index = 7;
    } return index;
}

function getIndexDay2 (currentHour) {
    let index = 8
    if (currentHour >= 0 && currentHour <= 2) {
        index = 8;   
    } else if (currentHour >= 3 && currentHour <= 5) {
        index = 9;        
    } else if (currentHour >= 6 && currentHour <= 8) {
        index = 10;
    } else if (currentHour >= 9 && currentHour <= 11) {
        index = 11;
    } else if (currentHour >= 12 && currentHour <= 14) {
        index = 12;
    } else if (currentHour >= 15 && currentHour <= 17) {
        index = 13;
    } else if (currentHour >= 18 && currentHour <= 20) {
        index = 14;
    } else if (currentHour >= 21 && currentHour <= 23) {
        index = 15;
    } return index;
}

function getIndexDay3 (currentHour) {
    let index = 16
    if (currentHour >= 0 && currentHour <= 2) {
        index = 16;   
    } else if (currentHour >= 3 && currentHour <= 5) {
        index = 17;        
    } else if (currentHour >= 6 && currentHour <= 8) {
        index = 18;
    } else if (currentHour >= 9 && currentHour <= 11) {
        index = 19;
    } else if (currentHour >= 12 && currentHour <= 14) {
        index = 20;
    } else if (currentHour >= 15 && currentHour <= 17) {
        index = 21;
    } else if (currentHour >= 18 && currentHour <= 20) {
        index = 22;
    } else if (currentHour >= 21 && currentHour <= 23) {
        index = 23;
    } return index;
}

function getIndexDay4 (currentHour) {
    let index = 24
    if (currentHour >= 0 && currentHour <= 2) {
        index = 24;   
    } else if (currentHour >= 3 && currentHour <= 5) {
        index = 25;        
    } else if (currentHour >= 6 && currentHour <= 8) {
        index = 26;
    } else if (currentHour >= 9 && currentHour <= 11) {
        index = 27;
    } else if (currentHour >= 12 && currentHour <= 14) {
        index = 28;
    } else if (currentHour >= 15 && currentHour <= 17) {
        index = 29;
    } else if (currentHour >= 18 && currentHour <= 20) {
        index = 30;
    } else if (currentHour >= 21 && currentHour <= 23) {
        index = 31;
    } return index;
}

function getIndexDay5 (currentHour) {
    let index = 32
    if (currentHour >= 0 && currentHour <= 2) {
        index = 32;   
    } else if (currentHour >= 3 && currentHour <= 5) {
        index = 33;        
    } else if (currentHour >= 6 && currentHour <= 8) {
        index = 34;
    } else if (currentHour >= 9 && currentHour <= 11) {
        index = 35;
    } else if (currentHour >= 12 && currentHour <= 14) {
        index = 36;
    } else if (currentHour >= 15 && currentHour <= 17) {
        index = 37;
    } else if (currentHour >= 18 && currentHour <= 20) {
        index = 38;
    } else if (currentHour >= 21 && currentHour <= 23) {
        index = 39;
    } return index;
}
// calling API
$("#search-button").on("click", function(event) {
    event.preventDefault();

    let city = $('#search-input').val();
    buttonsCity(city);   

    let queryGeoURL = "https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid=9fd6a1347f49828c432e8937391a3380";


    $.ajax({
        url: queryGeoURL,
        method: "GET"
    })
    .then(function(response) {
        let lat = response[0].lat;            
        let lon = response[0].lon;
        let iconcode = response[0].icon;

        // API for current weather
        let queryCurrentURL = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid=9fd6a1347f49828c432e8937391a3380";

        // API for 5 day forecasr
        let queryWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=metric&appid=9fd6a1347f49828c432e8937391a3380";

        //API for icon image
        let queryIconURL =   "https://openweathermap.org/img/w/" + iconcode + ".png"

        $.ajax({
            url: queryCurrentURL,
            method: "GET"
        })
        .then(function(response) {
            
            
            $('#today').empty();
            let currentDay = moment().format("dddd, MMMM YYYY, h:mm:ss a");
            let currentIcon = response.weather[0].icon;
            let currentTemp = response.main.temp;
            let currentWind = response.wind.speed;
            let currentHumidity = response.main.humidity;
            
            let currentWeather = $(`<div>
                                        <h2>${city} (${currentDay})</h2>
                                        <img src="https://openweathermap.org/img/w/${currentIcon}.png" alt="weather icon">
                                        <p>Temp: ${currentTemp} C</p>
                                        <p>Wind: ${currentWind} KPH</p>
                                        <p>Humidity: ${currentHumidity}</p>
                                    </div>`);
            $('#today').append(currentWeather);
            
            
            $.ajax({
                url: queryWeatherURL,
                method: "GET"
            })
            .then(function(response) {

                                
                $('#forecast').empty();                
                let currentHour = moment().format("H");
                
                 
                let day1 = moment(response.list[1].dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD/M/YYYY");
                let i1 = getIndexDay1(currentHour);
                let icon1 = response.list[i1].weather[0].icon;
                let image1 = response.list[i1].weather[0].description;
                let temp1 = response.list[i1].main.temp;
                let wind1 = response.list[i1].wind.speed;
                let humidity1 = response.list[i1].main.humidity;

                forecastDiv(day1,icon1, image1, temp1, wind1, humidity1);
                
                
                let day2 = moment(response.list[9].dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD/M/YYYY");
                let i2 = getIndexDay2(currentHour);
                let icon2 = response.list[i2].weather[0].icon;
                let image2 = response.list[i2].weather[0].description;
                let temp2 = response.list[i2].main.temp;
                let wind2 = response.list[i2].wind.speed;
                let humidity2 = response.list[i2].main.humidity;

                forecastDiv(day2, icon2, image2, temp2, wind2, humidity2);

                
                let day3 = moment(response.list[17].dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD/M/YYYY");
                let i3 = getIndexDay3(currentHour);
                let icon3 = response.list[i3].weather[0].icon;
                let image3 = response.list[i3].weather[0].description;
                let temp3 = response.list[i3].main.temp;
                let wind3 = response.list[i3].wind.speed;
                let humidity3 = response.list[i3].main.humidity;

                forecastDiv(day3, icon3, image3, temp3, wind3, humidity3);

                
                let day4 = moment(response.list[25].dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD/M/YYYY");
                let i4 = getIndexDay4(currentHour);
                let icon4 = response.list[i4].weather[0].icon;
                let image4 = response.list[i4].weather[0].description;
                let temp4 = response.list[i4].main.temp;
                let wind4 = response.list[i4].wind.speed;
                let humidity4 = response.list[i4].main.humidity;

                forecastDiv(day4, icon4, image4, temp4, wind4, humidity4);

                
                let day5 = moment(response.list[33].dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD/M/YYYY");
                let i5 = getIndexDay5(currentHour);
                let icon5 = response.list[i5].weather[0].icon;
                let image5 = response.list[i5].weather[0].description;
                let temp5 = response.list[i5].main.temp;
                let wind5 = response.list[i5].wind.speed;
                let humidity5 = response.list[i5].main.humidity;

                forecastDiv(day5, icon5, image5, temp5, wind5, humidity5);                
            });
        });
    });
});


start();