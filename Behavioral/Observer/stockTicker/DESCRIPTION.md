Imagine we are building a financial system. We have a **Stock Ticker** (the source of truth) that receives real-time price updates.

Whenever a stock price changes, several downstream systems need to react immediately:
1. **Analytics Dashboard:** Re-calculates trends.
2. **Audit Logger:** Saves the price change to a file for compliance.
3. **Alert System:** Sends a notification if the price drops too low.

**The Problem:** In a naïve implementation, the Stock Ticker is "hard-coded" to call each of these systems directly. Every time we add a new system (e.g., a Mobile App), we have to modify the Stock Ticker's code. This makes the system fragile and hard to maintain.
