import {
  EmailNotification,
  INotificationStrategy,
  NotificationContext,
  PushNotification,
  SMSNotification,
} from "./notifications";

describe("NotificationContext", () => {
  let emailNotification: INotificationStrategy;
  let smsNotification: INotificationStrategy;
  let pushNotification: INotificationStrategy;
  let notificationContext: NotificationContext;

  beforeEach(() => {
    emailNotification = new EmailNotification(1);
    smsNotification = new SMSNotification(2);
    pushNotification = new PushNotification(3);
    notificationContext = new NotificationContext(1, emailNotification);
  });

  test("should set and get notification strategy correctly", () => {
    notificationContext.setStrategy(smsNotification);
    expect(notificationContext.getStrategy()).toBe(smsNotification);

    notificationContext.setStrategy(pushNotification);
    expect(notificationContext.getStrategy()).toBe(pushNotification);
  });

  test("should execute email notification strategy correctly", () => {
    const consoleSpy = jest.spyOn(console, "log");
    notificationContext.execute();
    expect(consoleSpy).toHaveBeenCalledWith("Email Notification sent...");
    consoleSpy.mockRestore();
  });

  test("should execute SMS notification strategy correctly", () => {
    notificationContext.setStrategy(smsNotification);
    const consoleSpy = jest.spyOn(console, "log");
    notificationContext.execute();
    expect(consoleSpy).toHaveBeenCalledWith("SMS Notification sent...");
    consoleSpy.mockRestore();
  });

  test("should execute push notification strategy correctly", () => {
    notificationContext.setStrategy(pushNotification);
    const consoleSpy = jest.spyOn(console, "log");
    notificationContext.execute();
    expect(consoleSpy).toHaveBeenCalledWith("Push Notification sent...");
    consoleSpy.mockRestore();
  });
});
