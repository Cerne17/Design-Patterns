import { StockTicker, Observer } from './implementation';
/**
 * 1. Mock Implementations
 * instead of using the real "Slow" logger that waits 2 seconds, 
 * we use Jest Mocks to simulate behavior instantly.
 */
const mockUpdate = jest.fn();

class TestObserver implements Observer {
  id: string;
  shouldFail: boolean;

  constructor(id: string, shouldFail = false) {
    this.id = id;
    this.shouldFail = shouldFail;
  }

  async update(symbol: string, price: number): Promise<void> {
    if (this.shouldFail) {
      throw new Error(`Observer ${this.id} crashed!`);
    }
    mockUpdate(this.id, symbol, price);
  }
}

// 3. The Test Suite
describe('StockTicker (Async Observer Pattern)', () => {
  let ticker: StockTicker;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    ticker = new StockTicker();
    mockUpdate.mockClear(); // Reset call counts before each test
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Silence console.error
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore(); // Restore console after test
  });

  test('should notify all observers successfully', async () => {
    const obs1 = new TestObserver('obs1');
    const obs2 = new TestObserver('obs2');

    ticker.attach(obs1);
    ticker.attach(obs2);

    await ticker.setPrice('AAPL', 150);

    // Assert that the mock was called twice (once for each observer)
    expect(mockUpdate).toHaveBeenCalledTimes(2);
    expect(mockUpdate).toHaveBeenCalledWith('obs1', 'AAPL', 150);
    expect(mockUpdate).toHaveBeenCalledWith('obs2', 'AAPL', 150);
  });

  test('should continue notifying others even if one fails (Fault Tolerance)', async () => {
    const safeObs = new TestObserver('safe');
    const failingObs = new TestObserver('fail', true); // This one throws Error

    ticker.attach(safeObs);
    ticker.attach(failingObs);

    // This should NOT throw an error because we handled it with allSettled
    await expect(ticker.setPrice('MSFT', 300)).resolves.not.toThrow();

    // The safe observer should still have been called!
    expect(mockUpdate).toHaveBeenCalledWith('safe', 'MSFT', 300);
    
    // Verify that our error handling logic ran (console.error was called)
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  test('should stop notifying an observer after it is detached', async () => {
    const obs1 = new TestObserver('obs1');
    
    ticker.attach(obs1);
    await ticker.setPrice('AAPL', 100);
    expect(mockUpdate).toHaveBeenCalledTimes(1);

    ticker.detach(obs1);
    mockUpdate.mockClear(); // Reset counter

    await ticker.setPrice('AAPL', 200);
    expect(mockUpdate).toHaveBeenCalledTimes(0); // Should not be called anymore
  });
});
