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

Prompt: Can you create an exercise for me to practice the observer pattern, 
that simulates a simplified version of the youtube subscription and feed 
technologies, having in mind the common Observer principles and their implications 
(such as different Observers responding differently to the update structure)? 
In the exercise include use cases, examples of inputs and outputs and a solid 
and simple explanation of the scenario.
