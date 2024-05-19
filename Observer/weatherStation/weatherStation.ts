export interface IObservable {
  addObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
  removeAllObservers(): void;
  notifyObservers(): void;
}

export interface IObserver {
  update(): void;
}

/* Observable (Subject)*/
export class WeatherStation implements IObservable {
  private observers: IObserver[] = [];
  private temperature: number = 0;
  public addObserver(Observer: IObserver) {
    this.observers.push(Observer);
  }
  public removeObserver(Observer: IObserver) {
    this.observers = this.observers.filter((Obs) => Obs !== Observer);
  }
  public removeAllObservers() {
    this.observers = [];
  }
  public notifyObservers() {
    for (const Observer of this.observers) {
      Observer.update();
    }
  }
  public setTemperature(temp: number) {
    this.temperature = temp;
    this.notifyObservers();
  }
  public getTemperature() {
    return this.temperature;
  }
}
/* ---------- */

/* Implementing the Observers */
export class PhoneDisplay implements IObserver {
  private WeatherStation: WeatherStation;
  constructor(Station: WeatherStation) {
    this.WeatherStation = Station;
  }
  update() {
    console.log("Phone Display Updated!");
    console.log(
      `Weather Station's Temperature: ${this.WeatherStation.getTemperature()}`,
    );
  }
}

export class WindowDeviceDisplay implements IObserver {
  private WeatherStation: WeatherStation;
  constructor(Station: WeatherStation) {
    this.WeatherStation = Station;
  }
  update() {
    console.log("Window's Display Updated!");
    console.log(
      `Weather Station's Temperature: ${this.WeatherStation.getTemperature()}`,
    );
  }
}
/* ---------- */
