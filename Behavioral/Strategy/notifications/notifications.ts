export interface INotificationStrategy {
  id: number;
  execute(): void;
}
export interface INotificationContext {
  id: number;
  setStrategy(strategy: INotificationStrategy): void;
  getStrategy(): INotificationStrategy;
  execute(): void;
}

export class NotificationContext implements INotificationContext {
  constructor(
    public readonly id: number,
    private Strategy: INotificationStrategy,
  ) {}
  public setStrategy(strategy: INotificationStrategy): void {
    this.Strategy = strategy;
  }
  public getStrategy(): INotificationStrategy {
    return this.Strategy;
  }
  public execute(): void {
    this.Strategy.execute();
  }
}

export class EmailNotification implements INotificationStrategy {
  constructor(
    public readonly id: number,
  ) {}
  public execute(): void {
    console.log("Email Notification sent...");
  }
}
export class SMSNotification implements INotificationStrategy {
  constructor(
    public readonly id: number,
  ) {}
  public execute(): void {
    console.log("SMS Notification sent...");
  }
}
export class PushNotification implements INotificationStrategy {
  constructor(
    public readonly id: number,
  ) {}
  public execute(): void {
    console.log("Push Notification sent...");
  }
}
