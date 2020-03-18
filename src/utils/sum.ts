/**
 * Return the sum of its arguments
 *
 * @param numbers the numbers to sum
 *
 * @returns sum
 */
export function sum(...numbers: number[]): number {
  return numbers.reduce((acc: number, num: number) => {
    return acc + num;
  }, 0);
}
