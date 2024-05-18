/* Baltimore Orioles Stadium Ticket Office invites software
 * firms to bid for a project. They want to have a
 * class library (with classes and interface) to calculate
 * ticket sale price. Here are the rules for ticket sale
 * at Stadium:
 * - Ticket sale price consist of two parts: ticket
 * price and sale tax.
 * - Ticket price varies between children (age under
 * 16 - $10 ), adults ($15) and seniors (age 65+ - $12).
 * Baltimore Orioles Stadium Ticket Office will award
 * the project to the design that allows users to add
 * more ticket categories and tax rate calculation
 * changes easily.
 */
export interface ITicket {
  execute(): number;
}

export class ChildrenTicketStrategy implements ITicket {
  execute(): number {
    return 10;
  }
}
export class AdultTicketStrategy implements ITicket {
  execute(): number {
    return 15;
  }
}
export class SeniorTicketStrategy implements ITicket {
  execute(): number {
    return 12;
  }
}

export class Ticket {
  private ticketStrategy: ITicket;
  private clientAge: number;
  constructor(age: number) {
    this.clientAge = age;
    if (this.clientAge <= 16) {
      this.ticketStrategy = new ChildrenTicketStrategy();
    } else if (this.clientAge < 65) {
      this.ticketStrategy = new AdultTicketStrategy();
    } else {
      this.ticketStrategy = new SeniorTicketStrategy();
    }
  }
  getTicketPrice(): number {
    this.setTicketStrategy();
    const price: number = this.ticketStrategy.execute();
    return price;
  }
  setTicketStrategy() {
    if (this.clientAge <= 16) {
      this.ticketStrategy = new ChildrenTicketStrategy();
    } else if (this.clientAge < 65) {
      this.ticketStrategy = new AdultTicketStrategy();
    } else {
      this.ticketStrategy = new SeniorTicketStrategy();
    }
  }
}
