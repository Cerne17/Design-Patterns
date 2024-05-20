Prompt: 
Can you create an exercise for me to practice the observer pattern, having in 
mind the common Observer principles and their implications (such as different 
Observers responding differently to the update structure)? In the exercise 
include use cases, examples of inputs and outputs and a solid and simple 
explanation of the scenario.

Output: """
### Exercise: Auction System with Observer Pattern

#### Scenario
You are tasked with designing a simple Auction System where bidders can place 
bids on an item. The system should notify all registered bidders about the 
current highest bid and inform them who won the auction when it ends.

#### Objectives

1. **Define an Observer Interface (`IAuctionObserver`):** This interface should include methods for updating bidders about a new highest bid and notifying them of the auction's outcome.

2. **Implement a Bidder Class:** This class should implement the `IAuctionObserver` interface. Each bidder should be able to receive updates about bid changes and the auction's conclusion.

3. **Create an Auction Class:** This class acts as the subject. It should manage the auction's state, including registering bidders (observers), receiving bids, updating all bidders about the current highest bid, and concluding the auction.

#### Functional Requirements

- Bidders should be able to register for an auction.
- When a bid is placed that is higher than the current highest bid, all registered bidders should be notified of the new highest bid.
- When the auction ends, all bidders should be notified of the winning bidder and the final bid amount.

### Unit Tests to Validate Your Code

To validate your implementation, consider writing the following unit tests:

1. **Test Bidder Registration:**
   - Register a bidder and verify that they are added to the auction's list of observers.

2. **Test Placing a Higher Bid:**
   - Place a bid higher than the current highest bid and verify that all bidders are notified of the new highest bid.

3. **Test Auction Conclusion:**
   - End the auction and verify that all bidders are notified of the auction's outcome, including the winning bidder's name and the final bid amount.

#### Development Steps

1. Start by defining the `IAuctionObserver` interface and the methods it should contain based on the objectives.
2. Implement the `Bidder` class, ensuring it can receive and process notifications from the auction.
3. Develop the `Auction` class with functionalities to add bidders, accept bids, notify bidders of updates, and conclude the auction.
4. Write the unit tests as specified above to validate your implementation.

### Tips in case of difficulty

#### IAuctionObserver Interface
- **Methods:**
  - `updateBid(newBid: number, bidderName: string)`: Notifies the observer about a new highest bid.
  - `notifyWinner(winnerName: string, finalBid: number)`: Notifies the observer about the auction's outcome.

#### Bidder Class (implements IAuctionObserver)
- **Properties:**
  - `name`: The name of the bidder.
- **Methods:**
  - `constructor(name: string)`: Initializes a new instance of the `Bidder` with a name.
  - `updateBid(newBid: number, bidderName: string)`: Implementation of the `updateBid` method from `IAuctionObserver`. Logs a message about the new highest bid.
  - `notifyWinner(winnerName: string, finalBid: number)`: Implementation of the `notifyWinner` method from `IAuctionObserver`. Logs a message about the auction's winner.

#### Auction Class
- **Properties:**
  - `bidders`: An array of `IAuctionObserver` instances registered to the auction.
  - `highestBid`: The current highest bid in the auction.
  - `highestBidder`: The name of the bidder who placed the highest bid.
- **Methods:**
  - `registerBidder(bidder: IAuctionObserver)`: Adds a new bidder to the `bidders` array.
  - `placeBid(bid: number, bidderName: string)`: Accepts a bid and updates the highest bid and bidder if the bid is higher than the current highest bid. Notifies all registered bidders about the new bid.
  - `endAuction()`: Concludes the auction. Notifies all registered bidders about the auction's outcome and the winner.
"""

Prompt: 
Can you create an exercise for me to practice the observer pattern, 
that simulates a simplified version of the youtube subscription and feed 
technologies, having in mind the common Observer principles and their implications 
(such as different Observers responding differently to the update structure)? 
In the exercise include use cases, examples of inputs and outputs and a solid 
and simple explanation of the scenario.

Output: """
### Exercise: YouTube Subscription and Feed System with Observer Pattern

#### Scenario
You are tasked with creating a simplified version of YouTube's subscription and feed system. In this system, users can subscribe to channels and receive updates in their feed whenever those channels upload new videos. Each user's feed can display updates differently, depending on the user's preferences.

#### Objectives

1. **Define a Channel Interface (`IChannel`):** This interface should include methods for uploading videos and managing subscribers.

2. **Implement a User Class:** This class should act as an observer, subscribing to channels to receive updates about new video uploads.

3. **Create a Channel Class:** This class acts as the subject. It should manage its subscribers and notify them whenever a new video is uploaded.

#### Functional Requirements

- Users should be able to subscribe and unsubscribe from channels.
- When a channel uploads a new video, all subscribed users should be notified and their feeds updated with the new video.
- Users' feeds can display the update differently, showcasing the flexibility of the observer pattern.

### Unit Tests to Validate Your Code

To ensure your implementation works as expected, consider writing the following unit tests:

1. **Test User Subscription:**
   - Subscribe a user to a channel and verify that the user is added to the channel's list of subscribers.

2. **Test Video Upload Notification:**
   - Upload a video to a channel and verify that all subscribed users receive an update in their feed.

3. **Test User Unsubscription:**
   - Unsubscribe a user from a channel and verify that they no longer receive updates when new videos are uploaded.

#### Development Steps

1. Start by defining the `IChannel` interface with the necessary methods for video uploads and subscriber management.
2. Implement the `User` class, ensuring it can subscribe to channels, receive updates, and display those updates in a feed.
3. Develop the `Channel` class with functionalities to manage subscribers, upload videos, and notify subscribers of new content.
4. Write the specified unit tests to validate your system's functionality.

### Tips in case of difficulty

#### IChannel Interface
- **Methods:**
  - `uploadVideo(videoTitle: string)`: Uploads a new video to the channel.
  - `addSubscriber(subscriber: IUser)`: Adds a new subscriber to the channel.
  - `removeSubscriber(subscriber: IUser)`: Removes a subscriber from the channel.

#### User Class (implements IUser)
- **Properties:**
  - `name`: The name of the user.
  - `feed`: An array of video titles representing the user's feed.
- **Methods:**
  - `constructor(name: string)`: Initializes a new instance of the `User` with a name.
  - `update(videoTitle: string)`: Adds a new video title to the user's feed.
  - `subscribeTo(channel: IChannel)`: Subscribes the user to a channel.
  - `unsubscribeFrom(channel: IChannel)`: Unsubscribes the user from a channel.

#### Channel Class (implements IChannel)
- **Properties:**
  - `channelName`: The name of the channel.
  - `subscribers`: An array of `IUser` instances subscribed to the channel.
- **Methods:**
  - `constructor(channelName: string)`: Initializes a new instance of the `Channel` with a name.
  - `uploadVideo(videoTitle: string)`: Notifies all subscribers about the new video.
  - `addSubscriber(subscriber: IUser)`: Adds a new subscriber to the channel.
  - `removeSubscriber(subscriber: IUser)`: Removes a subscriber from the channel.

This exercise provides a practical application of the Observer Pattern, simulating a real-world system where subjects (channels) notify observers (users) about state changes (new video uploads).
"""

Prompt: 
Can you create an exercise for me to practice the observer pattern, having
in mind the common Observer principles and their implications (such as
different Observers responding differently to the update structure)? 
In the exercise include use cases, examples of inputs and outputs 
and a solid and simple explanation of the scenario.

Output: """
### Exercise: Smart Home System with Observer Pattern

#### Scenario
Imagine you are developing a Smart Home System where various devices (observers) react to environmental changes (events) reported by sensors (subjects). Each device in the smart home can respond differently to the same event, demonstrating the flexibility of the observer pattern.

#### Objectives

1. **Define a Sensor Interface (`ISensor`):** This interface should include methods for detecting changes in the environment (e.g., temperature change, motion detected) and managing devices that need to be notified of these changes.

2. **Implement a Device Class:** This class should act as an observer, reacting to notifications from sensors. Examples of devices include a Thermostat, Lights, and Security Cameras.

3. **Create Sensor Classes:** Implement different sensors as subjects that detect specific changes in the environment, such as a TemperatureSensor and a MotionSensor. These sensors notify all registered devices when a change is detected.

#### Functional Requirements

- Devices can subscribe to and unsubscribe from sensors.
- When a sensor detects a change, it should notify all subscribed devices, providing them with the data they need to react appropriately.
- Devices should react to notifications according to their functionality (e.g., a Thermostat adjusts the temperature, Lights turn on/off).

### Unit Tests to Validate Your Code

Consider writing the following unit tests to ensure your implementation meets the requirements:

1. **Test Device Subscription:**
   - Subscribe a device to a sensor and verify that the device is added to the sensor's list of observers.

2. **Test Device Notification:**
   - Simulate an environmental change detected by a sensor and verify that all subscribed devices receive the notification and react accordingly.

3. **Test Device Unsubscription:**
   - Unsubscribe a device from a sensor and verify that it no longer receives updates when the sensor detects changes.

#### Development Steps

1. Start by defining the `ISensor` interface with the necessary methods for environmental detection and observer management.
2. Implement various `Device` classes, ensuring each can subscribe to sensors, receive updates, and perform actions based on those updates.
3. Develop different `Sensor` classes that detect specific environmental changes and notify subscribed devices.
4. Write the specified unit tests to validate the functionality of your smart home system.

### Tips in case of difficulty

#### ISensor Interface
- **Methods:**
  - `detectChange(data: any): void`: Simulates the detection of an environmental change.
  - `addDevice(device: IDevice): void`: Registers a device to be notified of changes.
  - `removeDevice(device: IDevice): void`: Unregisters a device.

#### Device Classes (implements IDevice)
- **Examples:**
  - **Thermostat:** Reacts to temperature changes.
  - **Lights:** Reacts to motion detection.
  - **SecurityCamera:** Records when motion is detected.
- **Common Methods:**
  - `update(data: any): void`: Reacts to a notification from a sensor.

#### Sensor Classes (implements ISensor)
- **Examples:**
  - **TemperatureSensor:** Notifies devices of temperature changes.
  - **MotionSensor:** Notifies devices when motion is detected.
- **Properties:**
  - `devices`: An array of `IDevice` instances subscribed to the sensor.
- **Methods:**
  - `detectChange(data: any): void`: Notifies all subscribed devices about the detected change.
"""

Prompt: 
Can you create an exercise for me to practice the observer pattern, having
in mind the common Observer principles and their implications (such as
different Observers responding differently to the update structure)? 
In the exercise include use cases, examples of inputs and outputs 
and a solid and simple explanation of the scenario.

Output: 

