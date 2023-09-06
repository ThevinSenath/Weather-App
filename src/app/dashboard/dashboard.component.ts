import { Component } from '@angular/core';
import { WeatherService } from "../services/weather.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    public data: any;
    public weather: any;
  
    constructor(private weatherService:WeatherService) {
  
    }
  
    ngOnInit() {   
      this.weatherService.getJsonData('./assets/data/cities.json').subscribe(data => {
              this.data = data;
              this.getWeatherList();
        }); 
    }
  
    getWeatherList(){
      if (this.data) {
        const dataList = this.data.List;
        let tempArr : any = [];

        const colour_arr = ["#89CFF0", "#452c63", "#008B8B", "#FFC72C", "#E52B50", "#6699CC", "#662d91", "#F9629F"]
        let index = 0;

        for (let temp of dataList) {
          this.weatherService.getWeather(temp.CityCode).subscribe((Response: any) => {
            Response.list[0].colour = colour_arr[index];
            index++;
            console.log(Response.list[0]);
            tempArr.push(Response.list[0]);  
          })        
        }
        this.weather = tempArr;
      }
    }

}
