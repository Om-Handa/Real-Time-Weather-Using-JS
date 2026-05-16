import { get } from "./weather_api.js";
import { createGraph } from "./graph.js";
import { hourlyGraph } from "./hourly-graph.js";

//NAVBAR
let input = document.querySelector(".input");
let btn = document.querySelector(".searchbar");

//WEATHER CARD
let cityname= document.querySelector(".city")
let temp = document.querySelector(".temp");
let condition=document.querySelector(".description");
let max = document.querySelector(".max");
let min = document.querySelector(".min");
let rain= document.querySelector(".rain")

//CARD2 (EXTRA DETAILS)
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".windspeed");
let uv = document.querySelector(".UV");
let pressure = document.querySelector(".pressure");
let sunrise = document.querySelector(".sunrise");
let sunset = document.querySelector(".sunset");

//Body
let body= document.body

//BUTTON WORKING
btn.addEventListener("click",  () => {
    let city = input.value;
    getData(city);
})
input.addEventListener("keypress", (e)=>{
    if(e.key==="Enter"){
        e.preventDefault();
        let city = input.value;
        getData(city);
    }
})

async function getData(city) {
    const result= await get(city)
    console.log(result);
    dataentry(result)
    createGraph(result)
    hourlyGraph(result)
    getImage(result)
}
getData("Delhi,India")

//FILLING OF ALL DATA
function dataentry(result){
    //WEATHER CARD
    cityname.innerHTML=`${result.location.name}, ${result.location.country}`;
    temp.innerHTML=`${Math.floor(result.current.temp_c)}&#176;C`;
    condition.innerHTML=result.current.condition.text;
    max.innerHTML = `${Math.floor(result.forecast.forecastday[0].day.maxtemp_c)}&#176;C`;
    min.innerHTML=`${Math.floor(result.forecast.forecastday[0].day.mintemp_c)}&#176;C`;
    rain.innerHTML=`${result.forecast.forecastday[0].day.daily_chance_of_rain}%`;
    
    //CARD2 (EXTRA DETAILS)
    wind.innerHTML=`${result.current.wind_kph} Kph ${result.current.wind_degree}&#176; ${result.current.wind_dir}`;
    pressure.innerHTML=`${result.current.pressure_in}"`;
    humidity.innerHTML=`${result.current.humidity}%`
    sunrise.innerHTML=`${result.forecast.forecastday[0].astro.sunrise}`;
    sunset.innerHTML=`${result.forecast.forecastday[0].astro.sunset}`;
    
    let uvindex=result.current.uv;           
    if(uvindex>0 && uvindex<=2){
        uv.innerHTML=`LOW`;
    }
    else if(uvindex>2 && uvindex<=5){
        uv.innerHTML=`MEDIUM`;
    }
    else if(uvindex>5 && uvindex<=7){
        uv.innerHTML=`HIGH`;
    }
    else if(uvindex>7 && uvindex<=10){
        uv.innerHTML=`VERY HIGH`;
    }
    else{
        uv.innerHTML=`DANGEROUS`;
    }

}

const setImage=(link)=>{
    body.style.background=`url(${link})`;
    body.style.backgroundSize= 'cover';
    body.style.backgroundPosition= 'center';
    body.style.backgroundRepeat= 'no-repeat';
}

const getImage=(result)=>{
    let condition=result.current.condition.text;
    let day=result.current.is_day;
    switch (condition) {
        case"Clear":
        case"Sunny":
        case"Overcast":
            if(day==1){
                setImage('public/clear.avif')
                break; 
            }
            else{
                setImage('public/clear-night.jpeg')
                break;    
            }

        case"Cloudy":
        case"Partly Cloudy":
        case"Partly cloudy":
            if(day==1){
                setImage('public/default.jpg')
                break; 
            }
            else{
                setImage('public/cloudy-night.jpeg')
                break;    
            }
        case"Patchy freezing drizzle possible":
        case"Patchy rain possible":
        case"Patchy light rain":
        case"Patchy rain nearby":
        case"Light rain":
        case"Light rain shower":
        case"Moderate rain at times":
        case"Moderate rain":
        case"Light sleet":
        case"Fog":
        case"Freezing fog":
        case"Moderate or heavy snow showers":
        case"Patchy light snow with thunder":
        case"Moderate or heavy snow in area with thunder":
        case"Ice pellets":
        case"Patchy heavy snow":
        case"Heavy snow":
        case"Bllizard":        
        case"Patchy snow possible":
        case"Blowing snow":
        case"Patchy light snow":
        case"Light snow":
        case"Moderate snow":
        case"Light freezing rain":
        case"Light snow showers":
        case"Mist":
        case"Torrential rain shower":
        case"Moderate or heavy rain shower":
        case"Moderate or heavy sleet":
        case"Moderate or heavy freezing rain":
        case"Patchy light rain with thunder":
        case"Moderate or heavy rain with thunder":
        case"Heavy rain":
        case"Heavy rain at times":
        case"Thundery outbreaks in nearby":
            if(day==1){
                setImage('public/rain.jpg')
                break; 
            }
            else{
                setImage('public/cloudy-night.jpeg')
                break;    
            }

        default:
            if(day==1){
                setImage('public/default.jpg')
                break; 
            }
            else{
                setImage('public/clear-night.jpeg')
                break;    
            }
        }
}
        
        