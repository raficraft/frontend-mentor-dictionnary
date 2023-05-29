function sum(a: number, b: number): number {
  return a + b;
}


test('sum adds two numbers correctly', () => {
  expect(sum(2, 3)).toBe(5);
});
