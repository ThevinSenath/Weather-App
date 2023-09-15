import { Component } from '@angular/core';
import { WeatherService } from "../_services/weather.service";
import { COLOUR_ARRAY } from '../_constants/constants';
import { EXPIRATION_DATA } from '../_constants/constants';
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
            this.addExpirationDuartion();
            this.getWeatherList();
        });
    }

    getWeatherList() {

        if (this.city_data) {

            let temp_arr: any = [];
            let expired_data: any = [];
            const cached_data = this.localStorageHandlerService.getCachedData();
            
            if (cached_data) {
                for (let data of cached_data) {
                    if (this.localStorageHandlerService.isExpired(data.fetched_time, data.exp_duration)) {
                        expired_data.push(data);
                    } else {
                        temp_arr.push(data);
                    }
                }
                
                if (expired_data && expired_data.length > 0) {
                    this.getExpiredWeatherData(temp_arr, expired_data)
                    setTimeout(() => {
                        this.weather_data = temp_arr;
                        this.localStorageHandlerService.setCachedData(temp_arr);
                    }, 1000);
                } else {
                    this.weather_data = cached_data;
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
                Response.list[0].exp_duration = city.exp_duration;
                Response.list[0].fetched_time = Date.now();
                index++;
                temp_arr.push(Response.list[0]);
            })
        }

        setTimeout(() => {
            this.weather_data = temp_arr;
            this.localStorageHandlerService.setCachedData(temp_arr);
        }, 2000);
    }

    getExpiredWeatherData(temp_arr: any, expired_data: any) {
        for (let data of expired_data) {
            this.weatherService.getWeather(data.id).subscribe((Response: any) => {
                Response.list[0].colour = data.colour;
                Response.list[0].exp_duration = data.exp_duration;
                Response.list[0].fetched_time = Date.now();
                temp_arr.push(Response.list[0]);
            })
        }
    }

    addExpirationDuartion() {
        const dataList = this.city_data.List;
        for (let i = 0; i < dataList.length; i++) {
            dataList[i].exp_duration = EXPIRATION_DATA[i];
        }
        console.log(dataList);
    }

}
