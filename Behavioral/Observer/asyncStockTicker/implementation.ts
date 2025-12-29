// 1. The Async Contract
export interface Observer {
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
export class StockTicker {
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
	// 1. Create an array of promises by calling .update() on all observers
	const promises: Promise<void>[] = this.observers.map(observer => observer.update(symbol, price));

	// 2. Await them using Promise.allSettled
	const results = await Promise.allSettled(promises)
		
	// 3. (Bonus) Loop through results and console.error() if any were 'rejected'
	const rejected = results.filter(result => result.status === 'rejected') as PromiseRejectedResult[];

	if (rejected.length > 0) {
		console.log(`[Error] ${rejected.length} observer(s) failed to update:`);
		rejected.forEach(rej => console.error(` - Reason: ${rej.reason}`));
	}
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
  await ticker.setPrice('MSFT', 100);
  await ticker.setPrice('AAPL', 187);
  await ticker.setPrice('MSFT', 104);
  await ticker.setPrice('AAPL', 90);
  await ticker.setPrice('MSFT', 89);
  await ticker.setPrice('MSFT', 100);
  await ticker.setPrice('AAPL', 82);
  await ticker.setPrice('MSFT', 79);
  await ticker.setPrice('AAPL', 100);
  await ticker.setPrice('MSFT', 84);
}

// run();

