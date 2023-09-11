import { Component } from '@angular/core';
import { WeatherService } from "../_services/weather.service";
import { COLOUR_ARRAY } from '../_constants/constants';
import { LocalStorageHandlerService } from '../_utils/local-storage-handler.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    public city_data: any;
    public weather_data: any;

    constructor(private weatherService: WeatherService, private localStorageHandlerService: LocalStorageHandlerService) {

    }

    ngOnInit() {
        this.weatherService.getJsonData('./assets/data/cities.json').subscribe(data => {
            this.city_data = data;
            this.getWeatherList();
        });
    }

    getWeatherList() {
        if (this.city_data) {
            let temp_arr: any = [];

            const cached_data = this.localStorageHandlerService.getCachedData();

            if (cached_data) {
                if (!this.localStorageHandlerService.isExpired(cached_data)) {
                    for (let weather of cached_data) {
                        temp_arr.push(weather);
                    }
                    this.weather_data = temp_arr;
                } else {
                    this.getInitialData(temp_arr);
                }
            } else {
                this.getInitialData(temp_arr);
            }
        }
    }

    getInitialData(temp_arr: any) {
        let index = 0;
        const dataList = this.city_data.List;
        for (let city of dataList) {
            this.weatherService.getWeather(city.CityCode).subscribe((Response: any) => {
                Response.list[0].colour = COLOUR_ARRAY[index % dataList.length];
                index++;
                temp_arr.push(Response.list[0]);
            })
        }

        this.weather_data = temp_arr;
        setTimeout(() => {
            this.localStorageHandlerService.setCachedData(temp_arr);
        }, 3000);
    }

}
