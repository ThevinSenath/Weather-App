import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class LocalStorageHandlerService {

    constructor() { }

    setCachedData(weatherData: any) {
        weatherData[0].fetched_time = Date.now();
        localStorage.setItem('weatherData', JSON.stringify(weatherData));
    }

    getCachedData(): any {
        const weatherData = localStorage.getItem('weatherData');
        if (weatherData) {
            return JSON.parse(weatherData);
        }
        return null;
    }

    isExpired(cached_data: any){
        const currentTime = Date.now();
        return (currentTime - cached_data[0].fetched_time >= 5 * 2 * 1000);
    };

}





