import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherService } from "./services/weather.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  public weatherSearchForm!: FormGroup;
  public weatherData: any;

  constructor(private formBuilder: FormBuilder,
              private weatherService: WeatherService
            ) {}

  ngOnInit() {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
  }

  sendToOpenWeather(formValues: any) {
    this.weatherService
      .getWeather(formValues.location)
      .subscribe(data => {
        console.log(data);
        this.weatherData = data;
      });
  }

}
