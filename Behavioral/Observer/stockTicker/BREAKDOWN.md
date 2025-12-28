# Pattern Breakdown

| Role | Name in Code | Responsibility |
| ---- | ------------ | -------------- |
| Subject | StockTicker | Holds the state (price) and the list of subscribers. |
| Observer |Observer (Interface) | Defines the contract so the Subject knows how to talk to subscribers. |
| Concrete Observer | "AnalyticsDashboard, AuditLogger", "AlertSystem" | Implementation of the logic that runs when an update happens. |

# Reflection Questions
1. What would happen if we removed the detach method? Would that cause issues in a long-running system (like a server running for months)?
    The Subject would stack dozens of Concrete Observers without the option to remove them later, causing the server to get really bloated, possibly
    even runnning into performance and safety issues (memory leaks). For example, if we were to refactor a Concrete Observer Class and change their
    name, the system could fail in production servers. Essentialy, since the StockTicker would still hold references to all observers in memory, the
    Garbage Collector (present in languages such as Java, Javascript, C#, etc.) would not be able to remove them from memory, staying in RAM "forever".
2. If AnalyticsDashboard takes 5 seconds to process an update, what happens to the AuditLogger? (Hint: Look at the notify loop).
    Since we did not code the notification system using promises, the AuditLogger system would need to wait for the AnalyticsDashboard notification
    to be fully processed to run their notification, probably causing the program to not notify all the systems in time and even "lose" some notifications,
    since the subsystems could not be notified in time for the next event. A better approach would be to change the interface to return a `Promise<void>`, so
    that we notify the observers assynchronously or push the data into a **Message Queue** such as RabbitMQ or Kafka, that way the StockTicker can just dump
    the data into another system and keep working.
3. How would you change this if you only wanted to listen to specific stocks (e.g., only listen to 'AAPL')?
    If all observers should only listen to AAPL, I would probably change the Subject code to only notify their Observers when that flag is updated, but if
    this exception did not apply to all Observers, then I would filter the flag in the specific sub-systems that are only to reflect on AAPL updates. In more
    complex cases, we can even change the `Observer[]` structure in the Subject (StockTicker) to a `Map` - `Map<string, Observer[]>` - so that we can apply the
    filtering process inside the subject itself.
