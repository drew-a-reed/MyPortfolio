import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from '../interfaces/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(location: string | number) {
    let apiUrl;
    let latLong;

    if (typeof location === 'string' && /^\d+$/.test(location)) {
      latLong = 'http://api.openweathermap.org/geo/1.0/zip?zip=' + location + '&appid=d3aae32fea1193504888da921fe7538b&units=imperial'
      apiUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=' + location + ',US&APPID=d3aae32fea1193504888da921fe7538b&units=imperial';
    } else if (typeof location === 'string' && location.includes(',')) {
      latLong = 'http://api.openweathermap.org/geo/1.0/direct?q=' + location + ',us&appid=d3aae32fea1193504888da921fe7538b&units=imperial';
      apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + ',US&appid=d3aae32fea1193504888da921fe7538b&units=imperial';
    } else if (typeof location === 'string') {
      apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=d3aae32fea1193504888da921fe7538b&units=imperial';
    } else {
      throw new Error('Invalid location type');
    }
    if (latLong){
      this.getForcast(latLong);
    };
    return this.http.get(apiUrl);
  }

  getForcast(url: string) {
    let apiUrl;

    this.http.get<Weather>(url).subscribe(
      (response) => {
        const { lat, lon } = response;
        console.log('Latitude:', lat);
        console.log('Longitude:', lon);
        apiUrl = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=d3aae32fea1193504888da921fe7538b&units=imperial';
        console.log(apiUrl);
      },
      (error) => {
        console.error('Error fetching forecast data:', error);
      }
    );
  }

}
