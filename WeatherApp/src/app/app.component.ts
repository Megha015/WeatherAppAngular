import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'WeatherApp';
  myWeather: any;
  temperature: number = 0;
  mintemp: number = 0;
  maxtemp: number = 0;
  humidity: number = 0;
  wind: number = 0;
  initialcity: string = '';
  cityName: string = '';
  defaultCityName: string = 'Columbus';

  constructor(private WeatherService: WeatherService) {
    this.cityName = '';
  }

  ngOnInit(): void {
    this.cityName = this.defaultCityName;
    this.getWeather(this.cityName);
  }

  onSubmit(event: Event) {
    event.preventDefault(); // Prevent form submission from refreshing the page
    if (this.cityName.trim() !== '') {
      this.getWeather(this.cityName);
    }
  }

  private getWeather(cityName: string) {
    this.WeatherService.getWeather(cityName).subscribe({
      next: (res) => {
        console.log(res);
        this.myWeather = res;
        console.log(this.myWeather);
        this.cityName = this.myWeather.name;
        this.temperature = this.myWeather.main.temp;
        this.mintemp = this.myWeather.main.temp_min;
        this.maxtemp = this.myWeather.main.temp_max;
        this.humidity = this.myWeather.main.humidity;
        this.wind = this.myWeather.wind.speed;
      },
      error: (error) => console.log(error.message),
      complete: () => console.log('API call completed'),
    });
  }
}
