import { Auction, Bidder } from "./auction";

describe("Auction System", () => {
  let auction: Auction;
  let bidder1: Bidder;
  let bidder2: Bidder;

  beforeEach(() => {
    auction = new Auction();
    bidder1 = new Bidder("Bidder1");
    bidder2 = new Bidder("Bidder2");

    auction.registerBidder(bidder1);
    auction.registerBidder(bidder2);
  });

  test("should notify all bidders of a new highest bid", () => {
    // Mock the updateBid method on both bidders
    const mockUpdateBid1 = jest.spyOn(bidder1, "updateBid");
    const mockUpdateBid2 = jest.spyOn(bidder2, "updateBid");

    // Simulate placing a higher bid
    auction.placeBid(100, bidder1.name);

    // Verify that both bidders were notified of the new highest bid
    expect(mockUpdateBid1).toHaveBeenCalledWith(100, "Bidder1");
    expect(mockUpdateBid2).toHaveBeenCalledWith(100, "Bidder1");
  });

  test("should notify all bidders of the auction's conclusion", () => {
    // Mock the notifyWinner method on both bidders
    const mockNotifyWinner1 = jest.spyOn(bidder1, "notifyWinner");
    const mockNotifyWinner2 = jest.spyOn(bidder2, "notifyWinner");

    // Assuming the auction concludes with bidder1 as the winner
    auction.placeBid(100, bidder1.name);
    auction.endAuction();

    // Verify that both bidders were notified of the auction's conclusion
    expect(mockNotifyWinner1).toHaveBeenCalledWith("Bidder1", 100);
    expect(mockNotifyWinner2).toHaveBeenCalledWith("Bidder1", 100);
  });
});
