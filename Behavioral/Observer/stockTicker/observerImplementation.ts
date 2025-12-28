// Step 1: Define the Contract (Observer Interface)
// The Observer sets the default way for any system to receive notifications
interface Observer {
	update(symbol: string, price: number): void;
}

// Step 2: Decouple the Ticker (Subject)
// When we study The Observer Pattern, we basically have some *observers* (the systems that
// are to be notified) and a *subject / observable* (the 'source' system)
// In our case, the Ticker is the Subject
class StockTicker {
	private observers: Observer[] = []; // list of any sub-systems

	attach(observer: Observer): void {
		this.observers.push(observer); // Subscribes a new observer
	}
	
	detach(observer: Observer): void {
		const index = this.observers.indexOf(observer);
		if (index > -1) {
			this.observers.splice(index, 1); // removes the observer if matched
		}
	}

	setPrice(symbol: string, price: number) {
		console.log(`--- Price Update: ${symbol} is now $${price}`);
		this.notify(symbol, price);
	}

	private notify(symbol: string, price: number) {
		for (const observer of this.observers) {
			observer.update(symbol, price);
		}
	}
}

// Step 3: Implement the Concrete Observers
// They must implement correctly the Observer interface
class AnalyticsDashboard implements Observer {
	update(symbol: string, price: number): void {
		console.log(`[Dashboard] Updated chart for ${symbol}: $${price}`);
	}
}

class AuditLogger implements Observer {
	update(symbol: string, price: number): void {
		console.log(`[Logger] Recorded transaction for ${symbol} at $${price}`);
	}
}

class AlertSystem implements Observer {
	private flag: number;

	constructor (flag: number) {
		this.flag = flag;
	}

	update(symbol: string, price: number): void {
		if (price < this.flag) {
			console.log(`[Alert] 🚨 PRICE DROP! ${symbol} is below $${this.flag}`);
		}
	}
}

// CLIENT CODE
const stockTicker = new StockTicker();

const dashboard = new AnalyticsDashboard();
const logger = new AuditLogger();
const alerts = new AlertSystem(100);

// Subscribing Observers
stockTicker.attach(dashboard);
stockTicker.attach(logger);
stockTicker.attach(alerts);

// Simulation
stockTicker.setPrice('AAPL', 150);
stockTicker.setPrice('TSLA', 95);

// Unsubscribing Observers
stockTicker.detach(logger);

// Creates a new Alert Observer
const criticalAlerts = new AlertSystem(10);

stockTicker.attach(criticalAlerts);

// Simulation
stockTicker.setPrice('AAPL', 69);
stockTicker.setPrice('MSFT', 145);
stockTicker.setPrice('TSLA', 9);

