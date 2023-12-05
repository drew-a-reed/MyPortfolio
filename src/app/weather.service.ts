import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(location: string | number) {
    let apiUrl;

    if (typeof location === 'string' && /^\d+$/.test(location)) {
      apiUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=' + location + ',US&APPID=d3aae32fea1193504888da921fe7538b&units=imperial';
    } else if (typeof location === 'string' && location.includes(',')) {
      apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + ',US&appid=d3aae32fea1193504888da921fe7538b&units=imperial';
    } else if (typeof location === 'string') {
      apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=d3aae32fea1193504888da921fe7538b&units=imperial';
    } else {
      throw new Error('Invalid location type');
    }

    return this.http.get(apiUrl);
  }



}
