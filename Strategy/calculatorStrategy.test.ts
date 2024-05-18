const {
  ConcreteStrategyAdd,
  ConcreteStrategySubtract,
  ConcreteStrategyMultiplication,
  Context,
} = require("./calculatorStrategy");

describe("Strategy Pattern Implementation", () => {
  test("ConcreteStrategyAdd adds two numbers", () => {
    const strategy = new ConcreteStrategyAdd();
    expect(strategy.execute(3, 4)).toBe(7);
  });

  test("ConcreteStrategySubtract subtracts two numbers", () => {
    const strategy = new ConcreteStrategySubtract();
    expect(strategy.execute(5, 2)).toBe(3);
  });

  test("ConcreteStrategyMultiply multiplies two numbers", () => {
    const strategy = new ConcreteStrategyMultiplication();
    expect(strategy.execute(3, 4)).toBe(12);
  });

  describe("Context class", () => {
    let context: typeof Context;

    beforeEach(() => {
      context = new Context(new ConcreteStrategyAdd());
    });

    test("executes strategy correctly", () => {
      expect(context.executeStrategy(3, 4)).toBe(7);
    });

    test("switches strategy correctly", () => {
      context.setStrategy(new ConcreteStrategyMultiplication());
      expect(context.executeStrategy(3, 4)).toBe(12);
    });
  });
});
