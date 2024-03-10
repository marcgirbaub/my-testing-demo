import { beforeEach, describe, expect, test } from "vitest";
import { Discount } from "./discount";

class MockMoney {
  constructor(public value: number) {}

  reduceBy(percentage: number) {
    const reducedValue = this.value - (this.value * percentage) / 100;
    return new MockMoney(reducedValue);
  }

  moreThan(other: MockMoney) {
    return this.value > other.value;
  }
}

describe("Given a discount", () => {
  describe("When applying a discount for a 100 price", () => {
    describe("and we are in a crazy sales day", () => {
      test("Then the price should be 15% off", () => {
        const initialPrice = new MockMoney(100);
        const expectedPrice = new MockMoney(85);

        const discount = new Discount({
          isCrazySalesDay: () => true,
          isActive: () => true,
        });

        const finalPrice = discount.discountFor(initialPrice);

        expect(finalPrice.value).toEqual(expectedPrice.value);
      });
    });
  });

  describe("When applying a discount", () => {
    let discount: Discount;

    beforeEach(() => {
      discount = new Discount({
        isCrazySalesDay: () => false,
        isActive: () => true,
      });
    });

    describe("and the price is more than 1000", () => {
      test("Then the price should be 10% off", () => {
        const initialPrice = new MockMoney(1001);
        const expectedPrice = new MockMoney(900.9);

        const finalPrice = discount.discountFor(initialPrice);

        expect(finalPrice.value).toEqual(expectedPrice.value);
      });

      describe("and the price is more than 100", () => {
        test("Then the price should be 5% off", () => {
          const initialPrice = new MockMoney(101);
          const expectedPrice = new MockMoney(95.95);

          const finalPrice = discount.discountFor(initialPrice);

          expect(finalPrice.value).toEqual(expectedPrice.value);
        });
      });
    });
  });

  describe("When not applying a discount for a 100 price", () => {
    test("Then the price should be the same", () => {
      const initialPrice = new MockMoney(100);
      const expectedPrice = new MockMoney(100);

      const discount = new Discount({
        isCrazySalesDay: () => false,
        isActive: () => false,
      });

      const finalPrice = discount.discountFor(initialPrice);

      expect(finalPrice.value).toEqual(expectedPrice.value);
    });
  });
});
