/* Interfaces */

export interface IEventHandlers { // The Observers
  update(): void;
}

export interface IStockMarketTracker { // The Observable
  stockSymbol: string;
  volume: number;
  price: number;
  addAlertSystem(Alert: IEventHandlers): void;
  removeAlertSystem(Alert: IEventHandlers): void;
  removeAllAlertSystems(): void;
  trackStockChange(stockSymbol: string, newValue: number): void;
}

/* -- Interfaces -- */

/* Observable */

export class StockMarketTracker implements IStockMarketTracker {
  private alertSystems: IEventHandlers[] = [];
  constructor(
    public readonly stockSymbol: string,
    public volume: number,
    public price: number,
  ) {}
  public addAlertSystem(Alert: IEventHandlers): void {
    this.alertSystems.push(Alert);
  }
  public removeAlertSystem(Alert: IEventHandlers): void {
    this.alertSystems = this.alertSystems.filter((_) => _ !== Alert);
  }
  public removeAllAlertSystems(): void {
    this.alertSystems = [];
  }
  public trackStockChange(): void {
    this.alertSystems.forEach((_) => _.update());
  }
}

/* -- Observable -- */

/* Observers */

export class PriceThresholdAlert implements IEventHandlers {
  private currentPrice: number = 0;
  // private minimumPrice: number;
  // private maximumPrice: number;
  constructor(
    private Stock: IStockMarketTracker,
    private minimumPrice: number,
    private maximumPrice: number,
  ) {}
  public update() {
    this.currentPrice = this.Stock.price;
    if (this.currentPrice <= this.minimumPrice) {
      console.log(
        `The ${this.Stock.stockSymbol}'s Price is Below your minimum! It's a good time to buy: $${this.Stock.price}`,
      );
    } else if (this.currentPrice >= this.maximumPrice) {
      console.log(
        `The ${this.Stock.stockSymbol}'s Price is Above your maximum! It's a good time to sell: $${this.Stock.price}`,
      );
    }
  }
}

export class VolumeAlert implements IEventHandlers {
  private previousVolume: number = 0;
  private currentVolume: number = 0;
  constructor(
    private Stock: IStockMarketTracker,
  ) {}
  public update() {
    this.previousVolume = this.currentVolume;
    this.currentVolume = this.Stock.volume;
    if (this.previousVolume != this.currentVolume) {
      console.log(
        `The ${this.Stock.stockSymbol}'s Volume has changed from ${this.previousVolume} to ${this.currentVolume}`,
      );
    }
  }
}

// export class PercentageChangeAlert implements IEventHandlers {
//
// }

/* -- Observers -- */
