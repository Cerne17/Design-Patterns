This is a follow-up question on the Stock Ticker exercise:

This is a very common interview scenario: "Refactor this synchronous observer to handle slow or failing network calls."

# A. The New Constraints
- **Latency:** The `AuditLogger` now connects to a remote database. It simulates a 2-second delay.
- **Non-Blocking:** The `AnalyticsDashboard` (which is fast) must not wait for the slow Logger. It should update immediately.
- **Reliability:** If the `AuditLogger` crashes (throws an error), it must not break the Ticker or stop the other observers from receiving the update.

# B. Your Design Challenge (Mental Draft)
I want you to think about (or scratchpad) the answers to these three questions. **Don't implement the full class yet**, just focus on the architecture.

## The Interface Change:

The current interface is:

```ts
interface Observer {
    update(symbol: string, price: number): void;
}
```
*Question:* If `update` performs a network call, what should the return type change to?

**Answer:** We should change the `update` method to return a `Promise`, since we want the code to run asynchronously, as follows:
```ts
interface Observer {
    update(symbol: string, price: number): Promise<void>;
}
```

## The Notification Strategy (The Tricky Part)
In the `StockTicker` class, we currently loop like this:
```ts
for (const observer of this.observers) {
  observer.update(symbol, price); 
}
```
If we simply add `await` inside this loop, we create a bottleneck (Serial execution).

*Question:* How can we trigger all observers at roughly the same time (Parallel execution)?

**Answer:** In Typescript, that's easily achievable using two techniques: `Promise.all(promises)` and `Promise.allSettled(promises)`, the main difference being
that the later ensures that any Promises that were fullfiled, go through correctly, even though the first returns an error if any of the `promises` have failed.

## The Notification Strategy
If we run them in parallel and one fails (Promise rejects), `Promise.all()` typically fails for everyone.

*Question:* Which JavaScript Promise method waits for everyone to finish, regardless of whether they succeeded or failed? (Or how would you handle the catch block?)

**Answer:** The method we need to use is `Promise.allSettled(promises)`, which argument is the array of promises `promises` and it makes sure to keep track of all
the promises that were fullfiled correctly and that have failed, being a more robust approach.

# Phase 2: Implementation
Here is the "boilerplate" for our Async Ticker. I have set up the classes and the slow simulation for you.

Your Task: Write the notify method in the StockTicker class.
1. Map the observers to an array of promises.
2. Use Promise.allSettled to execute them.
3. (Optional but recommended) Log an error if any specific observer fails (check the status of the results).

Copy this code and fill in the TODO section:
```ts
// 1. The Async Contract
interface Observer {
  update(symbol: string, price: number): Promise<void>;
}

// 2. Concrete Observer: Fast Dashboard (Synchronous logic wrapped in Promise)
class AnalyticsDashboard implements Observer {
  async update(symbol: string, price: number): Promise<void> {
    // Even though this is fast, we mark it async to satisfy the interface
    console.log(`[Dashboard] 📈 Chart updated: ${symbol} $${price}`);
  }
}

// 3. Concrete Observer: Slow Logger (Simulating network latency)
class AuditLogger implements Observer {
  async update(symbol: string, price: number): Promise<void> {
    console.log(`[Logger] ⏳ Connecting to DB for ${symbol}...`);
    
    // Simulate a 2-second network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate a random crash (20% chance of failure)
    if (Math.random() < 0.2) {
      throw new Error("DB Connection Failed!");
    }

    console.log(`[Logger] ✅ Saved ${symbol} to database.`);
  }
}

// 4. The Async Subject
class StockTicker {
  private observers: Observer[] = [];

  attach(observer: Observer) {
    this.observers.push(observer);
  }

  detach(observer: Observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  async setPrice(symbol: string, price: number) {
    console.log(`\n--- Update: ${symbol} $${price} ---`);
    await this.notify(symbol, price);
    console.log("--- End of Update Cycle ---\n");
  }

  private async notify(symbol: string, price: number): Promise<void> {
    // TODO: IMPLEMENT THIS USING Promise.allSettled
    // 1. Create an array of promises by calling .update() on all observers
    // 2. Await them using Promise.allSettled
    // 3. (Bonus) Loop through results and console.error() if any were 'rejected'
  }
}

// --- TEST EXECUTION ---
async function run() {
  const ticker = new StockTicker();
  ticker.attach(new AnalyticsDashboard());
  ticker.attach(new AuditLogger());
  ticker.attach(new AnalyticsDashboard()); // Add another fast one to prove parallelism

  // This should trigger all 3. Dashboard should print IMMEDIATELY. 
  // Logger should print 2 seconds later.
  await ticker.setPrice('AAPL', 150);
}

run();
```
