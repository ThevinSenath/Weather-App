import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    url = environment.apiUrl;
    apiKey = '2440935d94ffa4d8dd71620f0a022a2e';

    constructor(private http: HttpClient) {}

    public getWeather(cityCode: string) {
        return this.http.get(this.url + cityCode + '&units=metric&appid=' + this.apiKey);
    }

    public getJsonData(filePath: string){
        return this.http.get(filePath);
  }

}
