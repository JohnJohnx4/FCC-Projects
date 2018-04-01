class WeatherApp {
    constructor() {
        this.getWeatherApi();
    }
      
    getWeatherApi() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            //x.innerHTML = "Geolocation is not supported by this browser.";
            console.log("cant get location");
        }
    }
    
    showPosition(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var x;
        const weatherURL = 'https://fcc-weather-api.glitch.me/api/current?lon='+lon+'&lat='+lat+'';
        axios.get(weatherURL).then((response)=>{
            attachWeather(response.data);
        })
        .catch((error)=>{
            console.log(error);
        });
        console.log(x);
        
        function attachWeather(results) {
            var city = results.name, 
            country = results.sys.country, 
            celTemp = results.main.temp,
            tempunit = "C",
            maxTemp = results.main.temp_max, 
            minTemp = results.main.temp_min,
            description = results.weather[0].description.replace(/(^|\s)\S/g, (L) => L.toUpperCase()), 
            icon = results.weather[0].icon;
            var location = city + "\, " + country;
            var temps ="Current: " + celTemp + String.fromCharCode(176) + ", High: " + maxTemp + String.fromCharCode(176) + ", Low: " + minTemp + String.fromCharCode(176) + " Celcius";
            
            var target = document.getElementById("weatherAppRoot");
            var weatherContainer = document.createElement("div");
            var locationDiv = document.createElement("div");
            var tempsDiv = document.createElement("div");
            var tempButton = document.createElement("button");
            var descDiv = document.createElement("div");
            var iconDiv = document.createElement("img");
            
            locationDiv.id = "location__container__id";
            locationDiv.className = "location__container";
            weatherContainer.className = "weather__container";
            tempsDiv.id = "temps__container__id";
            tempButton.id = "tempButton";
            tempButton.className = "temp__button";
            descDiv.id = "desc__container__id";
            iconDiv.className = "icon__container";
            iconDiv.src = icon;
            iconDiv.alt = "icon";

            locationDiv.appendChild(document.createTextNode(location));
            tempsDiv.appendChild(document.createTextNode(temps));
            tempButton.appendChild(document.createTextNode(tempunit));
            descDiv.appendChild(document.createTextNode(description));

            weatherContainer.appendChild(locationDiv);
            weatherContainer.appendChild(tempsDiv);
            weatherContainer.appendChild(descDiv);
            weatherContainer.appendChild(iconDiv);
            tempsDiv.appendChild(tempButton);
            target.appendChild(weatherContainer);
            
            tempButton.addEventListener("click", function(){
                var degree = String.fromCharCode(176);
                var currentTempUnit = tempunit;
                var newTempUnit = currentTempUnit == "C" ? "F" : "C";
                tempButton.removeChild(tempButton.childNodes[0]);
                tempButton.appendChild(document.createTextNode(newTempUnit));
                tempunit = newTempUnit;
                if (newTempUnit == "F") {
                    var fahTemp = Math.round(parseInt(celTemp) * 9 / 5 + 32);
                    var fahmax = Math.round(parseInt(maxTemp) * 9 / 5 + 32);
                    var fahmin = Math.round(parseInt(minTemp) * 9 / 5 + 32);
                    temps = "Current: " + fahTemp + degree + ", High: " + fahmax + degree + ", Low: " + fahmin + degree + " Fahrenheit";  
                    tempsDiv.removeChild(tempsDiv.childNodes[0]);
                    tempsDiv.insertBefore(document.createTextNode(temps), tempsDiv.childNodes[0]);
                } else {
                    temps = "Current: " + celTemp + degree + ", High: " + maxTemp + degree + ",Low:  " + minTemp + degree + " Celcius";  
                    tempsDiv.removeChild(tempsDiv.childNodes[0]);
                    tempsDiv.insertBefore(document.createTextNode(temps), tempsDiv.childNodes[0]);
                }
            });
            
        }

    }
}
let weatherAppRooter = document.getElementById("weatherAppRoot");
let weatherAppTarget = new WeatherApp();