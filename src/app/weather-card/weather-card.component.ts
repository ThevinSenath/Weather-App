import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent {

    @Input() weatherList: any = [];
    public card_colour: string | undefined;
    public city_name: string | undefined;
    public curr_time: any | undefined;
    public country: string | undefined;
    public humidity: string | undefined;
    public pressure: string | undefined;
    public visibility: string | undefined;
    public sunrise: string | undefined;
    public sunset: string | undefined;
    public temp_min: string | undefined;
    public temp_max: string | undefined;
    public temp: string | undefined;
    public wind_speed: string | undefined;
    public wind_deg: string | undefined;
    public description: string | undefined;
    options = {
        year: 'number',
        month: 'string',
        day: 'number',
        weekday: 'string',
      };

    constructor() {}

    ngOnInit() {   
        this.city_name = this.weatherList.name;
        this.country = this.weatherList.sys.country;
        this.card_colour = this.weatherList.colour;
        this.curr_time = new Date(this.weatherList.dt).toLocaleString();
        this.humidity = this.weatherList.main.humidity;
        this.pressure = this.weatherList.main.pressure;
        this.visibility = this.weatherList.visibility;
        this.temp_max = this.weatherList.main.temp_max;
        this.temp_min = this.weatherList.main.temp_min;
        this.temp = this.weatherList.main.temp;
        this.wind_speed = this.weatherList.wind.speed;
        this.wind_deg = this.weatherList.wind.deg;
        this.description = this.weatherList.weather[0].description;
        this.sunrise = new Date(this.weatherList.sys.sunrise).toLocaleTimeString();
        this.sunset = new Date(this.weatherList.sys.sunset).toLocaleTimeString();
    }

    getBackgroundColor(): string | undefined{
        return this.card_colour; 
    }       
}
