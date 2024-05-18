import {
  BankTransferPaymentStrategy,
  CreditCardPaymentStrategy,
  IPaymentStrategy,
  PaymentContext,
  PayPalPaymentStrategy,
} from "./paymentStrategy";

describe("Payment Processing System", () => {
  let paymentContext: PaymentContext;
  let mockAmount: number;

  beforeEach(() => {
    paymentContext = new PaymentContext();
    mockAmount = 100; // Example amount for all transactions
  });

  test("should process payment with Credit Card", () => {
    const strategy = new CreditCardPaymentStrategy();
    paymentContext.setPaymentStrategy(strategy);
    const result = paymentContext.executePayment(mockAmount);
    expect(result).toBe(
      `Payment of $${mockAmount} processed with Credit Card.`,
    );
  });

  test("should process payment with PayPal", () => {
    const strategy = new PayPalPaymentStrategy();
    paymentContext.setPaymentStrategy(strategy);
    const result = paymentContext.executePayment(mockAmount);
    expect(result).toBe(`Payment of $${mockAmount} processed with PayPal.`);
  });

  test("should process payment with Bank Transfer", () => {
    const strategy = new BankTransferPaymentStrategy();
    paymentContext.setPaymentStrategy(strategy);
    const result = paymentContext.executePayment(mockAmount);
    expect(result).toBe(
      `Payment of $${mockAmount} processed with Bank Transfer.`,
    );
  });

  test("should allow switching payment strategies", () => {
    const creditCardStrategy = new CreditCardPaymentStrategy();
    const payPalStrategy = new PayPalPaymentStrategy();
    paymentContext.setPaymentStrategy(creditCardStrategy);
    let result = paymentContext.executePayment(mockAmount);
    expect(result).toBe(
      `Payment of $${mockAmount} processed with Credit Card.`,
    );

    // Switch to PayPal strategy and test again
    paymentContext.setPaymentStrategy(payPalStrategy);
    result = paymentContext.executePayment(mockAmount);
    expect(result).toBe(`Payment of $${mockAmount} processed with PayPal.`);
  });
});
