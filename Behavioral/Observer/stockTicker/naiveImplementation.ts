// 1. Concrete System: Analytics Dashboard
class AnalyticsDashboard {
	display(symbol: string, price: number): void {
		console.log(`[Dashboard] Updated chart for ${symbol}: $${price}`);
	}
}

// 2. Concrete System: Audit Logger
class AuditLogger {
	log(symbol: string, price: number): void {
		console.log(`[Logger] Recorded transaction: ${symbol} at $${price}`);
	}
}

// 3. The Source: Stock Ticker
class StockTicker {
	// ISSUE: Hard Dependencies
	private dashboard: AnalyticsDashboard;
	private logger: AuditLogger;

	constructor() {
		this.dashboard = new AnalyticsDashboard();
		this.logger = new AuditLogger();
	}

	setPrice(symbol: string, price: number): void {
		console.log(`--- Price Update: ${symbol} is now $${price} ---`)

		// NOTE: We need to manually update every dependent system here;
		// If we are to add the AlertSystem later, we have to change the 
		// StockTicker code!
		this.dashboard.display(symbol, price);
		this.logger.log(symbol, price);
	}
}

// 4. Usage
const ticker = new StockTicker();
ticker.setPrice('AAPL', 150);
ticker.setPrice('GOOGL', 2790);
