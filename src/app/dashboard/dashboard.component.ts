import { Component } from '@angular/core';
import { WeatherService } from "../_services/weather.service";
import { forkJoin } from 'rxjs';
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
            const dataList = this.city_data.List;
            let temp_arr: any = [];
            const observables = [];

            let index = 0;

            for (let city of dataList) {
                observables.push(
                    this.weatherService.getWeather(city.CityCode).subscribe((Response: any) => {
                        Response.list[0].colour = COLOUR_ARRAY[index % dataList.length];
                        index++;
                        temp_arr.push(Response.list[0]);
                    })
                );
            }

            this.weather_data = temp_arr;
        }
    }

}
