// Import your Channel and User classes that implement IChannel and IUser interfaces respectively.
import { Channel, IChannel, IUser, User } from "./youtube";

describe("YouTube Subscription System", () => {
  let channel: Channel;
  let user: IUser;

  beforeEach(() => {
    channel = new Channel("Tech Reviews");
    user = new User("John Doe");
  });

  test("User subscribes to a channel", () => {
    user.subscribeTo(channel);
    expect(channel["subscribers"]).toContain(user); // Assuming Channel class has a 'subscribers' property for testing
  });

  test("User unsubscribes from a channel", () => {
    user.subscribeTo(channel);
    user.unsubscribeFrom(channel);
    expect(channel["subscribers"]).not.toContain(user);
  });

  test("User receives update when a new video is uploaded", () => {
    const videoTitle = "iPhone 13 Review";
    user.subscribeTo(channel);

    // Mock the update method to spy on its call and arguments
    const updateSpy = jest.spyOn(user, "update");
    channel.uploadVideo(videoTitle);

    expect(updateSpy).toHaveBeenCalledWith(channel["channelName"], videoTitle);
    expect(updateSpy).toHaveBeenCalledTimes(1);
  });

  test("User does not receive update when unsubscribed before a new video upload", () => {
    const videoTitle = "iPhone 13 Review";
    user.subscribeTo(channel);
    user.unsubscribeFrom(channel);

    const updateSpy = jest.spyOn(user, "update");
    channel.uploadVideo(videoTitle);

    expect(updateSpy).not.toHaveBeenCalled();
  });
});

describe("YouTube Subscription System - Extended Tests", () => {
  let techChannel: Channel;
  let cookingChannel: Channel;
  let user1: User;
  let user2: User;

  beforeEach(() => {
    techChannel = new Channel("Tech Reviews");
    cookingChannel = new Channel("Cooking 101");
    user1 = new User("John Doe");
    user2 = new User("Jane Doe");
  });

  test("Multiple users subscribe to the same channel", () => {
    user1.subscribeTo(techChannel);
    user2.subscribeTo(techChannel);
    expect(techChannel["subscribers"]).toContain(user1);
    expect(techChannel["subscribers"]).toContain(user2);
  });

  test("Users receive updates only from channels they are subscribed to", () => {
    user1.subscribeTo(techChannel);
    // Note: user2 does not subscribe to techChannel

    const updateSpyUser1 = jest.spyOn(user1, "update");
    const updateSpyUser2 = jest.spyOn(user2, "update");

    techChannel.uploadVideo("New Tech Gadget Review");

    expect(updateSpyUser1).toHaveBeenCalledTimes(1);
    expect(updateSpyUser2).not.toHaveBeenCalled();
  });

  test("User subscribes to multiple channels and receives updates from each", () => {
    user1.subscribeTo(techChannel);
    user1.subscribeTo(cookingChannel);

    const updateSpy = jest.spyOn(user1, "update");

    techChannel.uploadVideo("Latest Smartphone Review");
    cookingChannel.uploadVideo("Easy Pasta Recipe");

    expect(updateSpy).toHaveBeenCalledTimes(2);
    expect(updateSpy).toHaveBeenCalledWith(
      "Tech Reviews",
      "Latest Smartphone Review",
    );
    expect(updateSpy).toHaveBeenCalledWith("Cooking 101", "Easy Pasta Recipe");
  });

  test("User unsubscribes from one channel and stops receiving updates from it", () => {
    user1.subscribeTo(techChannel);
    user1.subscribeTo(cookingChannel);
    user1.unsubscribeFrom(techChannel);

    const updateSpy = jest.spyOn(user1, "update");

    techChannel.uploadVideo("New Tech Gadget Review");
    cookingChannel.uploadVideo("Homemade Bread Recipe");

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith(
      "Cooking 101",
      "Homemade Bread Recipe",
    );
    expect(updateSpy).not.toHaveBeenCalledWith(
      "Tech Reviews",
      "New Tech Gadget Review",
    );
  });

  test("No users receive updates when no one is subscribed to the channel", () => {
    const updateSpyUser1 = jest.spyOn(user1, "update");
    const updateSpyUser2 = jest.spyOn(user2, "update");

    techChannel.uploadVideo("Latest Tech News");

    expect(updateSpyUser1).not.toHaveBeenCalled();
    expect(updateSpyUser2).not.toHaveBeenCalled();
  });
});
