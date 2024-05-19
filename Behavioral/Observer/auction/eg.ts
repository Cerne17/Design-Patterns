export interface IAuctionObserver {
  updateBid(newBid: number, bidderName: string): void;
  notifyWinner(winnerName: string, finalBid: number): void;
}

export class Bidder implements IAuctionObserver {
  constructor(public name: string) {}

  updateBid(newBid: number, bidderName: string): void {
    console.log(
      `${this.name} is notified: New highest bid of $${newBid} by ${bidderName}`,
    );
  }

  notifyWinner(winnerName: string, finalBid: number): void {
    if (this.name === winnerName) {
      console.log(
        `${this.name}, you won the auction with a bid of $${finalBid}!`,
      );
    } else {
      console.log(
        `${this.name} is notified: The auction was won by ${winnerName} with a bid of $${finalBid}`,
      );
    }
  }
}

export class Auction {
  private bidders: IAuctionObserver[] = [];
  private highestBid: number = 0;
  private highestBidder: string = "";

  public registerBidder(bidder: IAuctionObserver): void {
    this.bidders.push(bidder);
  }

  public placeBid(bid: number, bidderName: string): void {
    if (bid > this.highestBid) {
      this.highestBid = bid;
      this.highestBidder = bidderName;
      this.bidders.forEach((bidder) => bidder.updateBid(bid, bidderName));
    }
  }

  public endAuction(): void {
    this.bidders.forEach((bidder) =>
      bidder.notifyWinner(this.highestBidder, this.highestBid)
    );
    console.log(
      `Auction ended. Winner: ${this.highestBidder} with $${this.highestBid}`,
    );
  }
}
