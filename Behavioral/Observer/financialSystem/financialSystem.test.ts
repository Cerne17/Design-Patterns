import {
  PriceThresholdAlert,
  StockMarketTracker,
  VolumeAlert,
} from "./financialSystem";

describe("StockMarketTracker with Alerts", () => {
  let tracker: StockMarketTracker;
  let priceAlert: PriceThresholdAlert;
  let volumeAlert: VolumeAlert;

  beforeEach(() => {
    tracker = new StockMarketTracker("AAPL", 1000, 150);
    priceAlert = new PriceThresholdAlert(tracker, 100, 200);
    volumeAlert = new VolumeAlert(tracker);
  });

  test("should add alert systems correctly", () => {
    tracker.addAlertSystem(priceAlert);
    tracker.addAlertSystem(volumeAlert);
    expect(tracker["alertSystems"]).toContain(priceAlert);
    expect(tracker["alertSystems"]).toContain(volumeAlert);
  });

  test("should remove alert system correctly", () => {
    tracker.addAlertSystem(priceAlert);
    tracker.removeAlertSystem(priceAlert);
    expect(tracker["alertSystems"]).not.toContain(priceAlert);
  });

  test("should remove all alert systems correctly", () => {
    tracker.addAlertSystem(priceAlert);
    tracker.addAlertSystem(volumeAlert);
    tracker.removeAllAlertSystems();
    expect(tracker["alertSystems"].length).toBe(0);
  });

  test("should notify PriceThresholdAlert correctly", () => {
    tracker.addAlertSystem(priceAlert);
    const consoleSpy = jest.spyOn(console, "log");
    tracker.price = 90; // Below minimum price
    tracker.trackStockChange();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("It's a good time to buy"),
    );

    tracker.price = 210; // Above maximum price
    tracker.trackStockChange();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("It's a good time to sell"),
    );
  });

  test("should notify VolumeAlert correctly", () => {
    tracker.addAlertSystem(volumeAlert);
    const consoleSpy = jest.spyOn(console, "log");
    tracker.volume = 1500; // Change volume
    tracker.trackStockChange();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Volume has changed"),
    );
  });
});
