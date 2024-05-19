/*
 * This is the application of the Strategy Pattern.
 * This one is rather simple, since we are implementing
 * a simple "calculator" like program, in which the
 * operation the calculator can do is chosen via the
 * strategy pattern.
 */
export interface IOperationStrategy {
  execute(a: number, b: number): number;
}

export class ConcreteStrategyAdd implements IOperationStrategy {
  execute(a: number, b: number): number {
    return a + b;
  }
}

export class ConcreteStrategySubtract implements IOperationStrategy {
  execute(a: number, b: number): number {
    return a - b;
  }
}

export class ConcreteStrategyMultiplication implements IOperationStrategy {
  execute(a: number, b: number): number {
    return a * b;
  }
}

export class Context {
  private Strategy: IOperationStrategy;
  constructor(strategy: IOperationStrategy) {
    this.Strategy = strategy;
  }
  executeStrategy(a: number, b: number): number {
    return this.Strategy.execute(a, b);
  }
  setStrategy(strategy: IOperationStrategy) {
    this.Strategy = strategy;
  }
}
