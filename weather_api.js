import { API_KEY } from "./config.js";

export async function get(city){
    let searchcity= city||"Delhi, India"
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${searchcity}&days=6`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    try {        
        const response = await fetch(url, options);
        const result = await response.json();
        return result;

    } catch (error) {
        console.log(error);
    }
}