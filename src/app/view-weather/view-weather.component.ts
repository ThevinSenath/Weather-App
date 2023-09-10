import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../_services/weather.service';
import { COLOUR_ARRAY } from '../_constants/constants';

@Component({
    selector: 'app-view-weather',
    templateUrl: './view-weather.component.html',
    styleUrls: ['./view-weather.component.css']
})
export class ViewWeatherComponent {

    public weather: any = [];

    constructor(private route: ActivatedRoute, private weatherService: WeatherService) { }

    ngOnInit() {

        const index = Math.floor(Math.random() * 8);

        this.route.paramMap.subscribe((params) => {
            const cityCode = params.get('id');
            this.weatherService.getWeather(cityCode).subscribe((Response: any) => {
                Response.list[0].colour = COLOUR_ARRAY[index];
                this.weather.push(Response.list[0]);
            })
        });
    }

}
