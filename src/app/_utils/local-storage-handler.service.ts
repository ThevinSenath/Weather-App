import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class LocalStorageHandlerService {

    constructor() { }

    setCachedData(weatherData: any) {
        localStorage.setItem('weatherData', JSON.stringify(weatherData));
    }

    getCachedData(): any {
        const weatherData = localStorage.getItem('weatherData');
        if (weatherData) {
            return JSON.parse(weatherData);
        }
        return null;
    }

    isExpired(fetched_time: number, exp_duration: number){
        const currentTime = Date.now();
        return (currentTime - fetched_time >= exp_duration * 60 * 1000);
    };

}





