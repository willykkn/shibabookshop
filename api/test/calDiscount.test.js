const {calDiscount} = require("../index");
const Arr2 = [
  {
    id: 9781408855652,
    title: `Harry Potter and the Philosopher's Stone (I)`,
    qty: 2,
    price: 350,
    total: 350
  },
  {
    id: 9781408855669,
    title: `Harry Potter and the Chamber of Secrets (II)`,
    qty: 1,
    price: 350,
    total: 350
  }
];

const Arr3 = [
  {
    id: 9781408855652,
    title: `Harry Potter and the Philosopher's Stone (I)`,
    qty: 2,
    price: 350,
    total: 350
  },
  {
    id: 9781408855669,
    title: `Harry Potter and the Chamber of Secrets (II)`,
    qty: 1,
    price: 350,
    total: 350
  },
  {
    id: 9781408855676,
    title: `Harry Potter and the Prisoner of Azkaban (III)`,
    qty: 4,
    price: 340,
    total: 1360
  }
];
test("calDiscount 2 uniqe Harry, Discount is 70", () => {
  const result = 70;
  expect(calDiscount(Arr2)).toBe(result.toFixed(2));
});

test("calDiscount 3 uniqe Harry, Discount is 114.4", () => {
  const result = 114.4;
  expect(calDiscount(Arr3)).toBe(result.toFixed(2));
});
