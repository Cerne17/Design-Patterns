import {
  AdultTicketStrategy,
  ChildrenTicketStrategy,
  SeniorTicketStrategy,
  Ticket,
} from "./ticketStrategy";

describe("Ticket Strategy Tests", () => {
  describe("Strategy Execution", () => {
    test("ChildrenTicketStrategy returns correct price", () => {
      const strategy = new ChildrenTicketStrategy();
      expect(strategy.execute()).toBe(10);
    });

    test("AdultTicketStrategy returns correct price", () => {
      const strategy = new AdultTicketStrategy();
      expect(strategy.execute()).toBe(15);
    });

    test("SeniorTicketStrategy returns correct price", () => {
      const strategy = new SeniorTicketStrategy();
      expect(strategy.execute()).toBe(12);
    });
  });

  describe("Ticket Class", () => {
    test("Correctly selects ChildrenTicketStrategy for age <= 16", () => {
      const ticket = new Ticket(16);
      expect(ticket.getTicketPrice()).toBe(10);
    });

    test("Correctly selects AdultTicketStrategy for ages 17 to 64", () => {
      const ticket = new Ticket(30);
      expect(ticket.getTicketPrice()).toBe(15);
    });

    test("Correctly selects SeniorTicketStrategy for age >= 65", () => {
      const ticket = new Ticket(65);
      expect(ticket.getTicketPrice()).toBe(12);
    });
  });
});
