import {
  IObserver,
  PhoneDisplay,
  WeatherStation,
  WindowDeviceDisplay,
} from "./weatherStation";

describe("WeatherStation", () => {
  let weatherStation: WeatherStation;
  let phoneDisplay: IObserver;
  let windowDeviceDisplay: IObserver;

  beforeEach(() => {
    weatherStation = new WeatherStation();
    phoneDisplay = new PhoneDisplay(weatherStation);
    windowDeviceDisplay = new WindowDeviceDisplay(weatherStation);
  });

  test("should add observers correctly", () => {
    weatherStation.addObserver(phoneDisplay);
    weatherStation.addObserver(windowDeviceDisplay);
    expect(weatherStation["observers"]).toContain(phoneDisplay);
    expect(weatherStation["observers"]).toContain(windowDeviceDisplay);
  });

  test("should remove observer correctly", () => {
    weatherStation.addObserver(phoneDisplay);
    weatherStation.addObserver(windowDeviceDisplay);
    weatherStation.removeObserver(phoneDisplay);
    expect(weatherStation["observers"]).not.toContain(phoneDisplay);
    expect(weatherStation["observers"]).toContain(windowDeviceDisplay);
  });

  test("should remove all observers correctly", () => {
    weatherStation.addObserver(phoneDisplay);
    weatherStation.addObserver(windowDeviceDisplay);
    weatherStation.removeAllObservers();
    expect(weatherStation["observers"].length).toBe(0);
  });

  test("should notify observers correctly when temperature changes", () => {
    const mockPhoneDisplayUpdate = jest.spyOn(phoneDisplay, "update");
    const mockWindowDeviceDisplayUpdate = jest.spyOn(
      windowDeviceDisplay,
      "update",
    );

    weatherStation.addObserver(phoneDisplay);
    weatherStation.addObserver(windowDeviceDisplay);
    weatherStation.setTemperature(25);

    expect(mockPhoneDisplayUpdate).toHaveBeenCalled();
    expect(mockWindowDeviceDisplayUpdate).toHaveBeenCalled();
  });

  test("should update temperature correctly", () => {
    weatherStation.setTemperature(30);
    expect(weatherStation.getTemperature()).toBe(30);
  });
});
