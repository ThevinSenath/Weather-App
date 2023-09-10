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
}





