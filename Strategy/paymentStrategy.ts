// IPaymentStrategy
export interface IPaymentStrategy {
  processPayment(amount: number): string;
}
// BankTransferPaymentStrategy
export class BankTransferPaymentStrategy implements IPaymentStrategy {
  processPayment(amount: number) {
    return `Payment of $${amount} processed with Bank Transfer.`;
  }
}
// CreditCardPaymentStrategy
export class CreditCardPaymentStrategy implements IPaymentStrategy {
  processPayment(amount: number) {
    return `Payment of $${amount} processed with Credit Card.`;
  }
}
// PayPalPaymentStrategy
export class PayPalPaymentStrategy implements IPaymentStrategy {
  processPayment(amount: number) {
    return `Payment of $${amount} processed with PayPal.`;
  }
}
// PaymentContext
export class PaymentContext {
  private PaymentStrategy!: IPaymentStrategy;
  setPaymentStrategy(strategy: IPaymentStrategy) {
    if (typeof strategy.processPayment !== "function") {
      throw new Error("Invalid strategy");
    }
    this.PaymentStrategy = strategy;
  }
  executePayment(amount: number) {
    return this.PaymentStrategy.processPayment(amount);
  }
}
