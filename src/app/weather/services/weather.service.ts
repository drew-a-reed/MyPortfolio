import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';  // Import map and catchError
import { Weather } from '../interfaces/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = 'd3aae32fea1193504888da921fe7538b';

  constructor(private http: HttpClient) { }

  getWeather(location: string | number): Observable<Weather> {
    const apiUrl = this.buildWeatherUrl(location);
    return this.http.get<Weather>(apiUrl);
  }

  private buildWeatherUrl(location: string | number): string {
    if (typeof location === 'string' && /^\d+$/.test(location)) {
      return `https://api.openweathermap.org/data/2.5/weather?zip=${location},US&APPID=${this.apiKey}&units=imperial`;
    } else if (typeof location === 'string' && location.includes(',')) {
      return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.apiKey}&units=imperial`;
    } else if (typeof location === 'string') {
      return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.apiKey}&units=imperial`;
    } else {
      throw new Error('Invalid location type');
    }
  }

  getForecast(location: string | number): Observable<string> {
    const apiUrl = this.buildWeatherUrl(location);

    return this.http.get<Weather>(apiUrl).pipe(
      map((response: Weather) => {
        const { lat, lon } = response;
        return `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=imperial`;
      }),
      catchError((error: any) => {
        console.error('Error fetching forecast data:', error);
        throw error;
      })
    );
  }
}
