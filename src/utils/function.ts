export function fibonacci(n: number) {
  const values = [0, 1];
  for (let x = 2; x < n + 1; x += 1) {
    values.push(values[x - 2] + values[x - 1]);
  }
  return values[n];
}

export function randomNumberFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
