### Exercise: Financial Market Alert System with Observer Pattern

#### Scenario
You are tasked with developing a Financial Market Alert System where different types of alerts (observers) respond to changes in stock prices (events) reported by a Stock Market Tracker (subject). Each type of alert can respond differently to the same stock price change, demonstrating the observer pattern's flexibility.

#### Objectives

1. **Define a Stock Market Tracker Interface (`IStockMarketTracker`):** This interface should include methods for tracking stock price changes and managing alert systems that need to be notified of these changes.

2. **Implement Alert System Classes:** These classes should act as observers, each designed to respond to notifications from the Stock Market Tracker. Examples of alert systems include a `PriceThresholdAlert`, `VolumeAlert`, and `PercentageChangeAlert`.

3. **Create a Stock Market Tracker Class:** This class acts as the subject. It should manage its alert systems (observers) and notify them whenever a significant change in stock prices is detected.

#### Functional Requirements

- Alert systems can subscribe to and unsubscribe from the Stock Market Tracker.
- When the Stock Market Tracker detects a significant change (e.g., a stock price exceeds a certain threshold), it should notify all subscribed alert systems, providing them with the data they need to react appropriately.
- Alert systems should react to notifications according to their specific criteria (e.g., a `PriceThresholdAlert` might issue an alert if a stock price exceeds a predefined threshold).

### Unit Tests to Validate Your Code

Consider writing the following unit tests to ensure your implementation meets the requirements:

1. **Test Alert System Subscription:**
   - Subscribe an alert system to the Stock Market Tracker and verify that it is added to the Stock Market Tracker's list of observers.

2. **Test Stock Price Change Notification:**
   - Simulate a change in stock prices detected by the Stock Market Tracker and verify that all subscribed alert systems receive the notification and react according to their criteria.

3. **Test Alert System Unsubscription:**
   - Unsubscribe an alert system from the Stock Market Tracker and verify that it no longer receives updates when stock prices change.

#### Development Steps

1. Start by defining the `IStockMarketTracker` interface with the necessary methods for stock price tracking and observer management.
2. Implement various `AlertSystem` classes, ensuring each can subscribe to the Stock Market Tracker, receive updates, and issue alerts based on those updates.
3. Develop the `StockMarketTracker` class that detects specific changes in stock prices and notifies subscribed alert systems.
4. Write the specified unit tests to validate the functionality of your Financial Market Alert System.

### Tips in case of difficulty

#### IStockMarketTracker Interface
- **Methods:**
  - `trackStockChange(stockSymbol: string, newValue: number): void`: Simulates the detection of a change in a specific stock's price.
  - `addAlertSystem(alertSystem: IAlertSystem): void`: Registers an alert system to be notified of changes.
  - `removeAlertSystem(alertSystem: IAlertSystem): void`: Unregisters an alert system.

#### AlertSystem Classes (implements IAlertSystem)
- **Examples:**
  - **PriceThresholdAlert:** Issues an alert if a stock price exceeds a certain threshold.
  - **VolumeAlert:** Warns if trading volume for a stock exceeds or drops below specific thresholds.
  - **PercentageChangeAlert:** Alerts about significant percentage changes in a stock's price that could indicate a trend.
- **Common Methods:**
  - `update(stockSymbol: string, newValue: number): void`: Reacts to a notification from the Stock Market Tracker with specific alert logic.

#### StockMarketTracker Class (implements IStockMarketTracker)
- **Properties:**
  - `alertSystems`: An array of `IAlertSystem` instances subscribed to the Stock Market Tracker.
- **Methods:**
  - `trackStockChange(stockSymbol: string, newValue: number): void`: Notifies all subscribed alert systems about the detected change in stock prices.

This exercise offers a practical scenario to apply the Observer Pattern, simulating a Financial Market Alert System where a subject (Stock Market Tracker) notifies observers (Alert Systems) about changes in stock prices, allowing for a dynamic and responsive alerting mechanism.### Exercise: Financial Market Alert System with Observer Pattern

#### Scenario
You are tasked with developing a Financial Market Alert System where different types of alerts (observers) respond to changes in stock prices (events) reported by a Stock Market Tracker (subject). Each type of alert can respond differently to the same stock price change, demonstrating the observer pattern's flexibility.

#### Objectives

1. **Define a Stock Market Tracker Interface (`IStockMarketTracker`):** This interface should include methods for tracking stock price changes and managing alert systems that need to be notified of these changes.

2. **Implement Alert System Classes:** These classes should act as observers, each designed to respond to notifications from the Stock Market Tracker. Examples of alert systems include a `PriceThresholdAlert`, `VolumeAlert`, and `PercentageChangeAlert`.

3. **Create a Stock Market Tracker Class:** This class acts as the subject. It should manage its alert systems (observers) and notify them whenever a significant change in stock prices is detected.

#### Functional Requirements

- Alert systems can subscribe to and unsubscribe from the Stock Market Tracker.
- When the Stock Market Tracker detects a significant change (e.g., a stock price exceeds a certain threshold), it should notify all subscribed alert systems, providing them with the data they need to react appropriately.
- Alert systems should react to notifications according to their specific criteria (e.g., a `PriceThresholdAlert` might issue an alert if a stock price exceeds a predefined threshold).

### Unit Tests to Validate Your Code

Consider writing the following unit tests to ensure your implementation meets the requirements:

1. **Test Alert System Subscription:**
   - Subscribe an alert system to the Stock Market Tracker and verify that it is added to the Stock Market Tracker's list of observers.

2. **Test Stock Price Change Notification:**
   - Simulate a change in stock prices detected by the Stock Market Tracker and verify that all subscribed alert systems receive the notification and react according to their criteria.

3. **Test Alert System Unsubscription:**
   - Unsubscribe an alert system from the Stock Market Tracker and verify that it no longer receives updates when stock prices change.

#### Development Steps

1. Start by defining the `IStockMarketTracker` interface with the necessary methods for stock price tracking and observer management.
2. Implement various `AlertSystem` classes, ensuring each can subscribe to the Stock Market Tracker, receive updates, and issue alerts based on those updates.
3. Develop the `StockMarketTracker` class that detects specific changes in stock prices and notifies subscribed alert systems.
4. Write the specified unit tests to validate the functionality of your Financial Market Alert System.

### Tips in case of difficulty

#### IStockMarketTracker Interface
- **Methods:**
  - `trackStockChange(stockSymbol: string, newValue: number): void`: Simulates the detection of a change in a specific stock's price.
  - `addAlertSystem(alertSystem: IAlertSystem): void`: Registers an alert system to be notified of changes.
  - `removeAlertSystem(alertSystem: IAlertSystem): void`: Unregisters an alert system.

#### AlertSystem Classes (implements IAlertSystem)
- **Examples:**
  - **PriceThresholdAlert:** Issues an alert if a stock price exceeds a certain threshold.
  - **VolumeAlert:** Warns if trading volume for a stock exceeds or drops below specific thresholds.
  - **PercentageChangeAlert:** Alerts about significant percentage changes in a stock's price that could indicate a trend.
- **Common Methods:**
  - `update(stockSymbol: string, newValue: number): void`: Reacts to a notification from the Stock Market Tracker with specific alert logic.

#### StockMarketTracker Class (implements IStockMarketTracker)
- **Properties:**
  - `alertSystems`: An array of `IAlertSystem` instances subscribed to the Stock Market Tracker.
- **Methods:**
  - `trackStockChange(stockSymbol: string, newValue: number): void`: Notifies all subscribed alert systems about the detected change in stock prices.

This exercise offers a practical scenario to apply the Observer Pattern, simulating a Financial Market Alert System where a subject (Stock Market Tracker) notifies observers (Alert Systems) about changes in stock prices, allowing for a dynamic and responsive alerting mechanism.
