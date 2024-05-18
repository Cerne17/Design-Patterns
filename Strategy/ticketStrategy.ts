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
