export interface IChannel {
  uploadVideo(videoTitle: string): void;
  subscribeUser(subscriber: IUser): void;
  unsubscribeUser(subscriber: IUser): void;
}

export interface IUser {
  update(channelName: string, videoTitle: string): void;
  subscribeTo(channel: IChannel): void;
  unsubscribeFrom(channel: IChannel): void;
}

export class User {
  constructor(
    public readonly name: string,
  ) {}
  public update(channelName: string, videoTitle: string): void {
    console.log(
      `${this.name} is notified: ${channelName} has uploaded a new video: ${videoTitle}!`,
    );
  }
  public subscribeTo(channel: IChannel): void {
    channel.subscribeUser(this);
  }
  public unsubscribeFrom(channel: IChannel): void {
    channel.unsubscribeUser(this);
  }
}

export class Channel implements IChannel {
  private subscribers: IUser[] = [];
  constructor(
    public readonly channelName: string,
  ) {}

  public uploadVideo(videoTitle: string): void {
    this.subscribers.forEach((Subscriber) =>
      Subscriber.update(this.channelName, videoTitle)
    );
  }
  public subscribeUser(subscriber: IUser): void {
    this.subscribers.push(subscriber);
  }
  public unsubscribeUser(subscriber: IUser): void {
    this.subscribers = this.subscribers.filter((Subscriber) =>
      Subscriber !== subscriber
    );
  }
}
