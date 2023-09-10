import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    url = environment.apiUrl;
    apiKey = environment.apiKey;

    constructor(private http: HttpClient) { }

    public getWeather(cityCode: string | null) {
        try {
            return this.http.get(this.url + cityCode + '&units=metric&appid=' + this.apiKey);
        } catch (error) {
            console.log("Error fetching weather data:", error);
            throw error;
        }

    }

    public getJsonData(filePath: string) {
        try {
            return this.http.get(filePath);
        } catch (error) {
            console.log("Error extracting city data:", error);
            throw error;
        }

    }

}
