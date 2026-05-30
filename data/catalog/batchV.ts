import type { Problem } from "../types.ts";

/**
 * Batch V — supplemental math-geometry and bit-manipulation problems.
 *
 * Every `runner.jsReference` is named exactly `runner.entry` and passes all of
 * its `tests`. All prose is original paraphrasing (no LeetCode statement text).
 */
export const batchV: Problem[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // Math & Geometry
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 172,
    slug: "factorial-trailing-zeroes",
    title: "Factorial Trailing Zeroes",
    difficulty: "Medium",
    category: "math-geometry",
    patterns: ["Math"],
    companies: ["amazon", "bloomberg"],
    frequency: 45,
    leetcodeUrl: "https://leetcode.com/problems/factorial-trailing-zeroes/",
    description:
      "Count how many trailing zeroes appear at the end of n! without computing the factorial itself.",
    examples: [
      { input: "n = 5", output: "1", explanation: "5! = 120 ends in one zero." },
      { input: "n = 10", output: "2" },
    ],
    intuition:
      "A trailing zero comes from a factor of 10 = 2 × 5, and factors of 2 are far more plentiful than factors of 5. So the answer is simply how many 5s divide into n!. Count multiples of 5, then 25, then 125, and so on, summing each contribution.",
    approach: [
      "Initialize a running total of zero.",
      "Repeatedly divide n by 5 (integer division) and add the quotient to the total.",
      "Stop once the quotient reaches zero.",
      "Return the accumulated total.",
    ],
    complexity: { time: "O(log n)", space: "O(1)", note: "Divides by 5 each step." },
    solutions: [
      {
        language: "python",
        label: "Count factors of 5",
        code: `def trailing_zeroes(n: int) -> int:
    count = 0
    while n > 0:
        n //= 5
        count += n
    return count`,
      },
      {
        language: "typescript",
        label: "Count factors of 5",
        code: `function trailingZeroes(n: number): number {
  let count = 0;
  while (n > 0) {
    n = Math.floor(n / 5);
    count += n;
  }
  return count;
}`,
      },
    ],
    runner: {
      entry: "trailingZeroes",
      comparison: "deep",
      jsStarter: `function trailingZeroes(n) {
  // Count the trailing zeroes of n!.
  // TODO: implement
}`,
      jsReference: `function trailingZeroes(n) {
  let count = 0;
  while (n > 0) {
    n = Math.floor(n / 5);
    count += n;
  }
  return count;
}`,
    },
    tests: [
      { name: "small", args: [3], expected: 0 },
      { name: "five", args: [5], expected: 1 },
      { name: "ten", args: [10], expected: 2 },
      { name: "twenty-five", args: [25], expected: 6 },
    ],
  },
  {
    id: 504,
    slug: "base-7",
    title: "Base 7",
    difficulty: "Easy",
    category: "math-geometry",
    patterns: ["Math", "Number Conversion"],
    companies: ["google"],
    frequency: 30,
    leetcodeUrl: "https://leetcode.com/problems/base-7/",
    description:
      "Convert a signed base-10 integer into its base-7 representation, returned as a string.",
    examples: [
      { input: "num = 100", output: '"202"', explanation: "100 = 2·49 + 0·7 + 2." },
      { input: "num = -7", output: '"-10"' },
    ],
    intuition:
      "Repeatedly take the remainder when dividing by 7 to peel off the lowest base-7 digit, prepending each digit as you go. Handle zero as a special case and remember the sign so you can reattach a minus at the end.",
    approach: [
      "If the number is zero, return '0' directly.",
      "Record the sign and work with the absolute value.",
      "While the value is positive, prepend value % 7 and divide by 7.",
      "Reattach a leading '-' when the original number was negative.",
    ],
    complexity: { time: "O(log n)", space: "O(log n)", note: "One digit per division." },
    solutions: [
      {
        language: "python",
        label: "Repeated division",
        code: `def convert_to_base7(num: int) -> str:
    if num == 0:
        return "0"
    neg = num < 0
    num = abs(num)
    digits = ""
    while num > 0:
        digits = str(num % 7) + digits
        num //= 7
    return "-" + digits if neg else digits`,
      },
      {
        language: "typescript",
        label: "Repeated division",
        code: `function convertToBase7(num: number): string {
  if (num === 0) return "0";
  const neg = num < 0;
  num = Math.abs(num);
  let digits = "";
  while (num > 0) {
    digits = String(num % 7) + digits;
    num = Math.floor(num / 7);
  }
  return neg ? "-" + digits : digits;
}`,
      },
    ],
    runner: {
      entry: "convertToBase7",
      comparison: "deep",
      jsStarter: `function convertToBase7(num) {
  // Return the base-7 string for num.
  // TODO: implement
}`,
      jsReference: `function convertToBase7(num) {
  if (num === 0) return "0";
  const neg = num < 0;
  num = Math.abs(num);
  let digits = "";
  while (num > 0) {
    digits = String(num % 7) + digits;
    num = Math.floor(num / 7);
  }
  return neg ? "-" + digits : digits;
}`,
    },
    tests: [
      { name: "positive", args: [100], expected: "202" },
      { name: "negative", args: [-7], expected: "-10" },
      { name: "zero", args: [0], expected: "0" },
      { name: "seven", args: [7], expected: "10" },
    ],
  },
  {
    id: 537,
    slug: "complex-number-multiplication",
    title: "Complex Number Multiplication",
    difficulty: "Medium",
    category: "math-geometry",
    patterns: ["Math", "String Parsing"],
    companies: ["amazon"],
    frequency: 28,
    leetcodeUrl: "https://leetcode.com/problems/complex-number-multiplication/",
    description:
      "Given two complex numbers written as 'a+bi' strings, return their product in the same format.",
    examples: [
      { input: 'num1 = "1+1i", num2 = "1+1i"', output: '"0+2i"', explanation: "(1+i)(1+i) = 2i." },
      { input: 'num1 = "1+-1i", num2 = "1+-1i"', output: '"0+-2i"' },
    ],
    intuition:
      "Parse each string into its real and imaginary integer parts by splitting on the single '+'. Then apply the algebraic identity (a+bi)(c+di) = (ac−bd) + (ad+bc)i and reassemble the result string.",
    approach: [
      "Split each input on '+' to obtain the real part and the imaginary part (drop the trailing 'i').",
      "Convert both pieces to integers.",
      "Compute real = a·c − b·d and imag = a·d + b·c.",
      "Format the answer as `${real}+${imag}i`.",
    ],
    complexity: { time: "O(1)", space: "O(1)", note: "Fixed-size arithmetic." },
    solutions: [
      {
        language: "python",
        label: "Parse and multiply",
        code: `def complex_number_multiply(num1: str, num2: str) -> str:
    def parse(s: str) -> tuple[int, int]:
        a, b = s.split("+")
        return int(a), int(b[:-1])

    a, b = parse(num1)
    c, d = parse(num2)
    real = a * c - b * d
    imag = a * d + b * c
    return f"{real}+{imag}i"`,
      },
      {
        language: "typescript",
        label: "Parse and multiply",
        code: `function complexNumberMultiply(num1: string, num2: string): string {
  const parse = (s: string): [number, number] => {
    const [a, b] = s.split("+");
    return [parseInt(a, 10), parseInt(b, 10)];
  };
  const [a, b] = parse(num1);
  const [c, d] = parse(num2);
  const real = a * c - b * d;
  const imag = a * d + b * c;
  return \`\${real}+\${imag}i\`;
}`,
      },
    ],
    runner: {
      entry: "complexNumberMultiply",
      comparison: "deep",
      jsStarter: `function complexNumberMultiply(num1, num2) {
  // Multiply two 'a+bi' complex-number strings.
  // TODO: implement
}`,
      jsReference: `function complexNumberMultiply(num1, num2) {
  const parse = (s) => {
    const [a, b] = s.split("+");
    return [parseInt(a, 10), parseInt(b, 10)];
  };
  const [a, b] = parse(num1);
  const [c, d] = parse(num2);
  const real = a * c - b * d;
  const imag = a * d + b * c;
  return \`\${real}+\${imag}i\`;
}`,
    },
    tests: [
      { name: "i times i", args: ["1+1i", "1+1i"], expected: "0+2i" },
      { name: "negative imag", args: ["1+-1i", "1+-1i"], expected: "0+-2i" },
      { name: "real only", args: ["1+0i", "1+0i"], expected: "1+0i" },
      { name: "zeros", args: ["0+0i", "0+0i"], expected: "0+0i" },
    ],
  },
  {
    id: 628,
    slug: "maximum-product-of-three-numbers",
    title: "Maximum Product of Three Numbers",
    difficulty: "Easy",
    category: "math-geometry",
    patterns: ["Math", "Sorting"],
    companies: ["amazon", "microsoft"],
    frequency: 42,
    leetcodeUrl: "https://leetcode.com/problems/maximum-product-of-three-numbers/",
    description:
      "Find the largest product obtainable by multiplying any three numbers from the array.",
    examples: [
      { input: "nums = [1,2,3,4]", output: "24" },
      { input: "nums = [-4,-3,-2,-1,60]", output: "720", explanation: "(-4)·(-3)·60." },
    ],
    intuition:
      "The maximum is either the product of the three largest values, or the product of the two most-negative values (which multiply to a large positive) with the single largest value. Sort once and compare these two candidates.",
    approach: [
      "Sort the array ascending.",
      "Candidate A is the product of the last three elements.",
      "Candidate B is the product of the first two elements and the last element.",
      "Return the larger of the two candidates.",
    ],
    complexity: { time: "O(n log n)", space: "O(1)", note: "Dominated by the sort." },
    solutions: [
      {
        language: "python",
        label: "Sort and compare",
        code: `def maximum_product(nums: list[int]) -> int:
    nums.sort()
    return max(nums[-1] * nums[-2] * nums[-3], nums[0] * nums[1] * nums[-1])`,
      },
      {
        language: "typescript",
        label: "Sort and compare",
        code: `function maximumProduct(nums: number[]): number {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  return Math.max(
    nums[n - 1] * nums[n - 2] * nums[n - 3],
    nums[0] * nums[1] * nums[n - 1],
  );
}`,
      },
    ],
    runner: {
      entry: "maximumProduct",
      comparison: "deep",
      jsStarter: `function maximumProduct(nums) {
  // Return the largest product of any three numbers.
  // TODO: implement
}`,
      jsReference: `function maximumProduct(nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  return Math.max(
    nums[n - 1] * nums[n - 2] * nums[n - 3],
    nums[0] * nums[1] * nums[n - 1],
  );
}`,
    },
    tests: [
      { name: "all positive", args: [[1, 2, 3]], expected: 6 },
      { name: "four positive", args: [[1, 2, 3, 4]], expected: 24 },
      { name: "all negative", args: [[-1, -2, -3]], expected: -6 },
      { name: "two negatives win", args: [[-4, -3, -2, -1, 60]], expected: 720 },
    ],
  },
  {
    id: 1232,
    slug: "check-if-it-is-a-straight-line",
    title: "Check If It Is a Straight Line",
    difficulty: "Easy",
    category: "math-geometry",
    patterns: ["Geometry", "Math"],
    companies: ["amazon", "google"],
    frequency: 36,
    leetcodeUrl: "https://leetcode.com/problems/check-if-it-is-a-straight-line/",
    description:
      "Decide whether a list of 2-D points all lie on a single straight line.",
    examples: [
      { input: "coordinates = [[1,2],[2,3],[3,4]]", output: "true" },
      { input: "coordinates = [[1,1],[2,2],[3,4]]", output: "false" },
    ],
    intuition:
      "Take the direction vector of the first segment. Every other point must share that same direction, which we test with the cross product to avoid floating-point division. If any cross product is non-zero, the points are not collinear.",
    approach: [
      "Compute dx and dy from the first two points.",
      "For each remaining point, compute its offset from the first point.",
      "Check that dx·(offsetY) equals dy·(offsetX) via cross product.",
      "Return false on the first mismatch, otherwise true.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Single pass, no division." },
    solutions: [
      {
        language: "python",
        label: "Cross product",
        code: `def check_straight_line(coordinates: list[list[int]]) -> bool:
    x0, y0 = coordinates[0]
    x1, y1 = coordinates[1]
    dx, dy = x1 - x0, y1 - y0
    for x, y in coordinates[2:]:
        if dx * (y - y0) != dy * (x - x0):
            return False
    return True`,
      },
      {
        language: "typescript",
        label: "Cross product",
        code: `function checkStraightLine(coordinates: number[][]): boolean {
  const [x0, y0] = coordinates[0];
  const [x1, y1] = coordinates[1];
  const dx = x1 - x0, dy = y1 - y0;
  for (let i = 2; i < coordinates.length; i++) {
    const [x, y] = coordinates[i];
    if (dx * (y - y0) !== dy * (x - x0)) return false;
  }
  return true;
}`,
      },
    ],
    runner: {
      entry: "checkStraightLine",
      comparison: "deep",
      jsStarter: `function checkStraightLine(coordinates) {
  // Return true if every point is collinear.
  // TODO: implement
}`,
      jsReference: `function checkStraightLine(coordinates) {
  const [x0, y0] = coordinates[0];
  const [x1, y1] = coordinates[1];
  const dx = x1 - x0, dy = y1 - y0;
  for (let i = 2; i < coordinates.length; i++) {
    const [x, y] = coordinates[i];
    if (dx * (y - y0) !== dy * (x - x0)) return false;
  }
  return true;
}`,
    },
    tests: [
      { name: "diagonal line", args: [[[1, 2], [2, 3], [3, 4]]], expected: true },
      { name: "not collinear", args: [[[1, 1], [2, 2], [3, 4]]], expected: false },
      { name: "vertical", args: [[[0, 0], [0, 1], [0, -1]]], expected: true },
      { name: "two points", args: [[[1, 1], [2, 2]]], expected: true },
    ],
  },
  {
    id: 492,
    slug: "construct-the-rectangle",
    title: "Construct the Rectangle",
    difficulty: "Easy",
    category: "math-geometry",
    patterns: ["Math"],
    companies: ["apple"],
    frequency: 24,
    leetcodeUrl: "https://leetcode.com/problems/construct-the-rectangle/",
    description:
      "Given a target area, return [length, width] with length ≥ width whose difference is as small as possible.",
    examples: [
      { input: "area = 4", output: "[2,2]" },
      { input: "area = 37", output: "[37,1]", explanation: "37 is prime." },
    ],
    intuition:
      "The most square-like rectangle has its width near the square root of the area. Start the width at floor(sqrt(area)) and walk downward until it divides the area evenly; the matching length is area / width.",
    approach: [
      "Set the candidate width to the floor of the square root of the area.",
      "Decrease the width until it divides the area exactly.",
      "Compute the length as area divided by that width.",
      "Return [length, width].",
    ],
    complexity: { time: "O(sqrt(area))", space: "O(1)", note: "Scan down from the square root." },
    solutions: [
      {
        language: "python",
        label: "Search from sqrt",
        code: `import math

def construct_rectangle(area: int) -> list[int]:
    w = int(math.isqrt(area))
    while area % w != 0:
        w -= 1
    return [area // w, w]`,
      },
      {
        language: "typescript",
        label: "Search from sqrt",
        code: `function constructRectangle(area: number): number[] {
  let w = Math.floor(Math.sqrt(area));
  while (area % w !== 0) w--;
  return [area / w, w];
}`,
      },
    ],
    runner: {
      entry: "constructRectangle",
      comparison: "deep",
      jsStarter: `function constructRectangle(area) {
  // Return [length, width] closest to square.
  // TODO: implement
}`,
      jsReference: `function constructRectangle(area) {
  let w = Math.floor(Math.sqrt(area));
  while (area % w !== 0) w--;
  return [area / w, w];
}`,
    },
    tests: [
      { name: "perfect square", args: [4], expected: [2, 2] },
      { name: "prime", args: [37], expected: [37, 1] },
      { name: "one", args: [1], expected: [1, 1] },
      { name: "twelve", args: [12], expected: [4, 3] },
    ],
  },
  {
    id: 1281,
    slug: "subtract-the-product-and-sum-of-digits-of-an-integer",
    title: "Subtract the Product and Sum of Digits of an Integer",
    difficulty: "Easy",
    category: "math-geometry",
    patterns: ["Math"],
    companies: ["adobe"],
    frequency: 22,
    leetcodeUrl: "https://leetcode.com/problems/subtract-the-product-and-sum-of-digits-of-an-integer/",
    description:
      "Return the product of an integer's digits minus the sum of its digits.",
    examples: [
      { input: "n = 234", output: "15", explanation: "2·3·4 − (2+3+4) = 24 − 9." },
      { input: "n = 4421", output: "21" },
    ],
    intuition:
      "Walk the digits one at a time using mod 10 and integer division, maintaining a running product and a running sum. The answer is the final product minus the final sum.",
    approach: [
      "Initialize product to 1 and sum to 0.",
      "While the number is positive, peel off the last digit.",
      "Multiply it into the product and add it to the sum.",
      "Return product − sum.",
    ],
    complexity: { time: "O(log n)", space: "O(1)", note: "One pass over the digits." },
    solutions: [
      {
        language: "python",
        label: "Digit walk",
        code: `def subtract_product_and_sum(n: int) -> int:
    product, total = 1, 0
    while n > 0:
        d = n % 10
        product *= d
        total += d
        n //= 10
    return product - total`,
      },
      {
        language: "typescript",
        label: "Digit walk",
        code: `function subtractProductAndSum(n: number): number {
  let product = 1, total = 0;
  while (n > 0) {
    const d = n % 10;
    product *= d;
    total += d;
    n = Math.floor(n / 10);
  }
  return product - total;
}`,
      },
    ],
    runner: {
      entry: "subtractProductAndSum",
      comparison: "deep",
      jsStarter: `function subtractProductAndSum(n) {
  // Return product of digits minus sum of digits.
  // TODO: implement
}`,
      jsReference: `function subtractProductAndSum(n) {
  let product = 1, total = 0;
  while (n > 0) {
    const d = n % 10;
    product *= d;
    total += d;
    n = Math.floor(n / 10);
  }
  return product - total;
}`,
    },
    tests: [
      { name: "234", args: [234], expected: 15 },
      { name: "4421", args: [4421], expected: 21 },
      { name: "single digit", args: [1], expected: 0 },
      { name: "contains zero", args: [10], expected: -1 },
    ],
  },
  {
    id: 357,
    slug: "count-numbers-with-unique-digits",
    title: "Count Numbers with Unique Digits",
    difficulty: "Medium",
    category: "math-geometry",
    patterns: ["Math", "Combinatorics"],
    companies: ["google"],
    frequency: 26,
    leetcodeUrl: "https://leetcode.com/problems/count-numbers-with-unique-digits/",
    description:
      "Count how many non-negative integers below 10^n have all distinct digits.",
    examples: [
      { input: "n = 2", output: "91", explanation: "100 total minus the 9 repeats like 11, 22…" },
      { input: "n = 0", output: "1" },
    ],
    intuition:
      "Count by length using combinatorics. For a k-digit number the leading digit has 9 choices (1–9) and each subsequent digit has one fewer choice than the previous (9, 8, …). Sum these counts for every length up to n, starting from the single value 0.",
    approach: [
      "Start the answer at 1 to account for the number 0.",
      "If n is zero, return that base case.",
      "For each length from 1 to n, multiply 9 by the falling product 9·8·… for the remaining positions and add it.",
      "Return the accumulated count.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "At most 10 meaningful lengths." },
    solutions: [
      {
        language: "python",
        label: "Combinatorial count",
        code: `def count_numbers_with_unique_digits(n: int) -> int:
    if n == 0:
        return 1
    total = 10
    unique = 9
    available = 9
    for _ in range(n - 1):
        unique *= available
        total += unique
        available -= 1
    return total`,
      },
      {
        language: "typescript",
        label: "Combinatorial count",
        code: `function countNumbersWithUniqueDigits(n: number): number {
  if (n === 0) return 1;
  let total = 10;
  let unique = 9;
  let available = 9;
  for (let i = 0; i < n - 1; i++) {
    unique *= available;
    total += unique;
    available -= 1;
  }
  return total;
}`,
      },
    ],
    runner: {
      entry: "countNumbersWithUniqueDigits",
      comparison: "deep",
      jsStarter: `function countNumbersWithUniqueDigits(n) {
  // Count integers below 10^n with all distinct digits.
  // TODO: implement
}`,
      jsReference: `function countNumbersWithUniqueDigits(n) {
  if (n === 0) return 1;
  let total = 10;
  let unique = 9;
  let available = 9;
  for (let i = 0; i < n - 1; i++) {
    unique *= available;
    total += unique;
    available -= 1;
  }
  return total;
}`,
    },
    tests: [
      { name: "zero", args: [0], expected: 1 },
      { name: "one", args: [1], expected: 10 },
      { name: "two", args: [2], expected: 91 },
      { name: "three", args: [3], expected: 739 },
    ],
  },
  {
    id: 400,
    slug: "nth-digit",
    title: "Nth Digit",
    difficulty: "Medium",
    category: "math-geometry",
    patterns: ["Math"],
    companies: ["amazon", "bloomberg"],
    frequency: 25,
    leetcodeUrl: "https://leetcode.com/problems/nth-digit/",
    description:
      "Find the n-th digit in the infinite sequence formed by concatenating 1, 2, 3, 4, …",
    examples: [
      { input: "n = 3", output: "3" },
      { input: "n = 11", output: "0", explanation: "…91011… the 11th digit is the 0 of 10." },
    ],
    intuition:
      "Numbers group by digit length: 9 one-digit numbers, 90 two-digit, 900 three-digit, and so on. Subtract whole groups from n to find which length the target sits in, then pinpoint the exact number and the digit within it.",
    approach: [
      "Track length, the count of numbers with that length, and the first such number.",
      "While n exceeds length·count, subtract that block and advance to the next length.",
      "Compute the target number as start + floor((n−1)/length).",
      "Return the digit at position (n−1) mod length of that number.",
    ],
    complexity: { time: "O(log n)", space: "O(1)", note: "Few digit-length blocks." },
    solutions: [
      {
        language: "python",
        label: "Locate the block",
        code: `def find_nth_digit(n: int) -> int:
    length, count, start = 1, 9, 1
    while n > length * count:
        n -= length * count
        length += 1
        count *= 10
        start *= 10
    num = start + (n - 1) // length
    return int(str(num)[(n - 1) % length])`,
      },
      {
        language: "typescript",
        label: "Locate the block",
        code: `function findNthDigit(n: number): number {
  let length = 1, count = 9, start = 1;
  while (n > length * count) {
    n -= length * count;
    length++;
    count *= 10;
    start *= 10;
  }
  const num = start + Math.floor((n - 1) / length);
  return Number(String(num)[(n - 1) % length]);
}`,
      },
    ],
    runner: {
      entry: "findNthDigit",
      comparison: "deep",
      jsStarter: `function findNthDigit(n) {
  // Return the n-th digit of 123456789101112...
  // TODO: implement
}`,
      jsReference: `function findNthDigit(n) {
  let length = 1, count = 9, start = 1;
  while (n > length * count) {
    n -= length * count;
    length++;
    count *= 10;
    start *= 10;
  }
  const num = start + Math.floor((n - 1) / length);
  return Number(String(num)[(n - 1) % length]);
}`,
    },
    tests: [
      { name: "single digit", args: [3], expected: 3 },
      { name: "first of ten", args: [10], expected: 1 },
      { name: "zero of ten", args: [11], expected: 0 },
      { name: "inside twelve", args: [15], expected: 2 },
    ],
  },
  {
    id: 1344,
    slug: "angle-between-hands-of-a-clock",
    title: "Angle Between Hands of a Clock",
    difficulty: "Medium",
    category: "math-geometry",
    patterns: ["Geometry", "Math"],
    companies: ["amazon", "microsoft"],
    frequency: 27,
    leetcodeUrl: "https://leetcode.com/problems/angle-between-hands-of-a-clock/",
    description:
      "Compute the smaller angle, in degrees, between the hour and minute hands of an analog clock.",
    examples: [
      { input: "hour = 12, minutes = 30", output: "165" },
      { input: "hour = 3, minutes = 30", output: "75" },
    ],
    intuition:
      "The minute hand moves 6° per minute. The hour hand moves 30° per hour plus an extra 0.5° per minute. Take the absolute difference of the two angles, then return whichever of it or 360 minus it is smaller.",
    approach: [
      "Compute the minute-hand angle as minutes × 6.",
      "Compute the hour-hand angle as (hour mod 12) × 30 + minutes × 0.5.",
      "Take the absolute difference of the two angles.",
      "Return the minimum of that difference and 360 minus it.",
    ],
    complexity: { time: "O(1)", space: "O(1)", note: "Constant arithmetic." },
    solutions: [
      {
        language: "python",
        label: "Angle formula",
        code: `def angle_clock(hour: int, minutes: int) -> float:
    minute_angle = minutes * 6
    hour_angle = (hour % 12) * 30 + minutes * 0.5
    diff = abs(hour_angle - minute_angle)
    return min(diff, 360 - diff)`,
      },
      {
        language: "typescript",
        label: "Angle formula",
        code: `function angleClock(hour: number, minutes: number): number {
  const minuteAngle = minutes * 6;
  const hourAngle = (hour % 12) * 30 + minutes * 0.5;
  const diff = Math.abs(hourAngle - minuteAngle);
  return Math.min(diff, 360 - diff);
}`,
      },
    ],
    runner: {
      entry: "angleClock",
      comparison: "approx",
      jsStarter: `function angleClock(hour, minutes) {
  // Return the smaller angle between the clock hands.
  // TODO: implement
}`,
      jsReference: `function angleClock(hour, minutes) {
  const minuteAngle = minutes * 6;
  const hourAngle = (hour % 12) * 30 + minutes * 0.5;
  const diff = Math.abs(hourAngle - minuteAngle);
  return Math.min(diff, 360 - diff);
}`,
    },
    tests: [
      { name: "12:30", args: [12, 30], expected: 165, tolerance: 1e-6 },
      { name: "3:30", args: [3, 30], expected: 75, tolerance: 1e-6 },
      { name: "3:15", args: [3, 15], expected: 7.5, tolerance: 1e-6 },
      { name: "4:50", args: [4, 50], expected: 155, tolerance: 1e-6 },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // Bit Manipulation
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 405,
    slug: "convert-a-number-to-hexadecimal",
    title: "Convert a Number to Hexadecimal",
    difficulty: "Easy",
    category: "bit-manipulation",
    patterns: ["Bit Manipulation", "Number Conversion"],
    companies: ["amazon", "microsoft"],
    frequency: 30,
    leetcodeUrl: "https://leetcode.com/problems/convert-a-number-to-hexadecimal/",
    description:
      "Convert a 32-bit signed integer to its lowercase hexadecimal string, using two's complement for negatives.",
    examples: [
      { input: "num = 26", output: '"1a"' },
      { input: "num = -1", output: '"ffffffff"' },
    ],
    intuition:
      "Process the number four bits at a time from the bottom, mapping each nibble to a hex character. Treating the value as an unsigned 32-bit pattern handles negatives automatically via two's complement, so no special sign logic is needed beyond reinterpreting the bits.",
    approach: [
      "Return '0' immediately when the number is zero.",
      "Reinterpret the value as unsigned 32-bit.",
      "Repeatedly take the low 4 bits, map them to a hex digit, and shift right by 4.",
      "Prepend each digit and return the assembled string.",
    ],
    complexity: { time: "O(1)", space: "O(1)", note: "At most 8 hex digits." },
    solutions: [
      {
        language: "python",
        label: "Nibble by nibble",
        code: `def to_hex(num: int) -> str:
    if num == 0:
        return "0"
    digits = "0123456789abcdef"
    n = num & 0xFFFFFFFF
    res = ""
    while n > 0:
        res = digits[n & 15] + res
        n >>= 4
    return res`,
      },
      {
        language: "typescript",
        label: "Nibble by nibble",
        code: `function toHex(num: number): string {
  if (num === 0) return "0";
  const digits = "0123456789abcdef";
  let n = num >>> 0;
  let res = "";
  while (n > 0) {
    res = digits[n & 15] + res;
    n = n >>> 4;
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "toHex",
      comparison: "deep",
      jsStarter: `function toHex(num) {
  // Return the lowercase hex string for a 32-bit int.
  // TODO: implement
}`,
      jsReference: `function toHex(num) {
  if (num === 0) return "0";
  const digits = "0123456789abcdef";
  let n = num >>> 0;
  let res = "";
  while (n > 0) {
    res = digits[n & 15] + res;
    n = n >>> 4;
  }
  return res;
}`,
    },
    tests: [
      { name: "positive", args: [26], expected: "1a" },
      { name: "negative one", args: [-1], expected: "ffffffff" },
      { name: "zero", args: [0], expected: "0" },
      { name: "255", args: [255], expected: "ff" },
    ],
  },
  {
    id: 476,
    slug: "number-complement",
    title: "Number Complement",
    difficulty: "Easy",
    category: "bit-manipulation",
    patterns: ["Bit Manipulation"],
    companies: ["google", "bloomberg"],
    frequency: 31,
    leetcodeUrl: "https://leetcode.com/problems/number-complement/",
    description:
      "Flip every bit of a positive integer within its own bit length and return the result.",
    examples: [
      { input: "num = 5", output: "2", explanation: "101 → 010." },
      { input: "num = 1", output: "0" },
    ],
    intuition:
      "Build an all-ones mask exactly as wide as the number's highest set bit. XOR-ing the number with that mask flips precisely the meaningful bits while leaving the higher bits untouched.",
    approach: [
      "Start a mask at 1.",
      "Shift the mask left and OR in a 1 until it covers all bits of num.",
      "XOR num with the mask to flip its bits.",
      "Return the result.",
    ],
    complexity: { time: "O(log num)", space: "O(1)", note: "One bit per loop." },
    solutions: [
      {
        language: "python",
        label: "Mask and XOR",
        code: `def find_complement(num: int) -> int:
    mask = 1
    while mask < num:
        mask = (mask << 1) | 1
    return num ^ mask`,
      },
      {
        language: "typescript",
        label: "Mask and XOR",
        code: `function findComplement(num: number): number {
  let mask = 1;
  while (mask < num) mask = (mask << 1) | 1;
  return num ^ mask;
}`,
      },
    ],
    runner: {
      entry: "findComplement",
      comparison: "deep",
      jsStarter: `function findComplement(num) {
  // Flip the bits within num's bit length.
  // TODO: implement
}`,
      jsReference: `function findComplement(num) {
  let mask = 1;
  while (mask < num) mask = (mask << 1) | 1;
  return num ^ mask;
}`,
    },
    tests: [
      { name: "five", args: [5], expected: 2 },
      { name: "one", args: [1], expected: 0 },
      { name: "ten", args: [10], expected: 5 },
      { name: "all ones", args: [7], expected: 0 },
    ],
  },
  {
    id: 389,
    slug: "find-the-difference",
    title: "Find the Difference",
    difficulty: "Easy",
    category: "bit-manipulation",
    patterns: ["Bit Manipulation", "XOR"],
    companies: ["google", "amazon"],
    frequency: 33,
    leetcodeUrl: "https://leetcode.com/problems/find-the-difference/",
    description:
      "String t is string s shuffled with one extra letter added; return that extra letter.",
    examples: [
      { input: 's = "abcd", t = "abcde"', output: '"e"' },
      { input: 's = "", t = "y"', output: '"y"' },
    ],
    intuition:
      "XOR pairs up identical character codes and cancels them to zero. XOR-ing the codes of every character in both strings leaves only the code of the single unmatched extra letter.",
    approach: [
      "Initialize an accumulator to 0.",
      "XOR the char code of every character in s into the accumulator.",
      "XOR the char code of every character in t as well.",
      "Convert the surviving code back to a character.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Single XOR accumulator." },
    solutions: [
      {
        language: "python",
        label: "XOR codes",
        code: `def find_the_difference(s: str, t: str) -> str:
    x = 0
    for c in s:
        x ^= ord(c)
    for c in t:
        x ^= ord(c)
    return chr(x)`,
      },
      {
        language: "typescript",
        label: "XOR codes",
        code: `function findTheDifference(s: string, t: string): string {
  let x = 0;
  for (const c of s) x ^= c.charCodeAt(0);
  for (const c of t) x ^= c.charCodeAt(0);
  return String.fromCharCode(x);
}`,
      },
    ],
    runner: {
      entry: "findTheDifference",
      comparison: "deep",
      jsStarter: `function findTheDifference(s, t) {
  // Return the single extra letter added to s.
  // TODO: implement
}`,
      jsReference: `function findTheDifference(s, t) {
  let x = 0;
  for (const c of s) x ^= c.charCodeAt(0);
  for (const c of t) x ^= c.charCodeAt(0);
  return String.fromCharCode(x);
}`,
    },
    tests: [
      { name: "append e", args: ["abcd", "abcde"], expected: "e" },
      { name: "empty s", args: ["", "y"], expected: "y" },
      { name: "duplicate a", args: ["a", "aa"], expected: "a" },
      { name: "shuffled", args: ["ae", "aea"], expected: "a" },
    ],
  },
  {
    id: 693,
    slug: "binary-number-with-alternating-bits",
    title: "Binary Number with Alternating Bits",
    difficulty: "Easy",
    category: "bit-manipulation",
    patterns: ["Bit Manipulation"],
    companies: ["amazon"],
    frequency: 23,
    leetcodeUrl: "https://leetcode.com/problems/binary-number-with-alternating-bits/",
    description:
      "Check whether a positive integer's binary form has strictly alternating 0s and 1s.",
    examples: [
      { input: "n = 5", output: "true", explanation: "101 alternates." },
      { input: "n = 7", output: "false", explanation: "111 does not." },
    ],
    intuition:
      "XOR-ing the number with itself shifted right by one bit yields all 1s exactly when the bits alternate. A value of all 1s satisfies x & (x+1) == 0, giving a clean two-operation test.",
    approach: [
      "Compute x = n XOR (n >> 1).",
      "If the bits alternate, x is a block of consecutive 1s.",
      "A block of 1s satisfies (x & (x + 1)) == 0.",
      "Return whether that condition holds.",
    ],
    complexity: { time: "O(1)", space: "O(1)", note: "Constant bit operations." },
    solutions: [
      {
        language: "python",
        label: "Shift and XOR",
        code: `def has_alternating_bits(n: int) -> bool:
    x = n ^ (n >> 1)
    return (x & (x + 1)) == 0`,
      },
      {
        language: "typescript",
        label: "Shift and XOR",
        code: `function hasAlternatingBits(n: number): boolean {
  const x = n ^ (n >> 1);
  return (x & (x + 1)) === 0;
}`,
      },
    ],
    runner: {
      entry: "hasAlternatingBits",
      comparison: "deep",
      jsStarter: `function hasAlternatingBits(n) {
  // Return true if n's bits alternate.
  // TODO: implement
}`,
      jsReference: `function hasAlternatingBits(n) {
  const x = n ^ (n >> 1);
  return (x & (x + 1)) === 0;
}`,
    },
    tests: [
      { name: "101", args: [5], expected: true },
      { name: "111", args: [7], expected: false },
      { name: "1011", args: [11], expected: false },
      { name: "1010", args: [10], expected: true },
    ],
  },
  {
    id: 762,
    slug: "prime-number-of-set-bits-in-binary-representation",
    title: "Prime Number of Set Bits in Binary Representation",
    difficulty: "Easy",
    category: "bit-manipulation",
    patterns: ["Bit Manipulation"],
    companies: ["adobe"],
    frequency: 20,
    leetcodeUrl: "https://leetcode.com/problems/prime-number-of-set-bits-in-binary-representation/",
    description:
      "Count integers in an inclusive range whose number of set bits is a prime number.",
    examples: [
      { input: "left = 6, right = 10", output: "4" },
      { input: "left = 10, right = 15", output: "5" },
    ],
    intuition:
      "Within the constraints the popcount never exceeds about 20, so the only candidate primes are a tiny fixed set. For each number in the range, count its set bits and check membership in that small prime set.",
    approach: [
      "Prepare a set of small primes covering possible bit counts (2, 3, 5, 7, 11, 13, 17, 19).",
      "For every value from left to right, count its set bits.",
      "Increment the answer when that count is in the prime set.",
      "Return the total.",
    ],
    complexity: { time: "O((right − left)·log right)", space: "O(1)", note: "Fixed prime set." },
    solutions: [
      {
        language: "python",
        label: "Popcount and check",
        code: `def count_prime_set_bits(left: int, right: int) -> int:
    primes = {2, 3, 5, 7, 11, 13, 17, 19}
    return sum(1 for x in range(left, right + 1) if bin(x).count("1") in primes)`,
      },
      {
        language: "typescript",
        label: "Popcount and check",
        code: `function countPrimeSetBits(left: number, right: number): number {
  const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19]);
  let count = 0;
  for (let x = left; x <= right; x++) {
    let bits = 0, v = x;
    while (v > 0) { bits += v & 1; v >>>= 1; }
    if (primes.has(bits)) count++;
  }
  return count;
}`,
      },
    ],
    runner: {
      entry: "countPrimeSetBits",
      comparison: "deep",
      jsStarter: `function countPrimeSetBits(left, right) {
  // Count numbers whose set-bit count is prime.
  // TODO: implement
}`,
      jsReference: `function countPrimeSetBits(left, right) {
  const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19]);
  let count = 0;
  for (let x = left; x <= right; x++) {
    let bits = 0, v = x;
    while (v > 0) { bits += v & 1; v >>>= 1; }
    if (primes.has(bits)) count++;
  }
  return count;
}`,
    },
    tests: [
      { name: "6 to 10", args: [6, 10], expected: 4 },
      { name: "10 to 15", args: [10, 15], expected: 5 },
      { name: "single one", args: [1, 1], expected: 0 },
      { name: "2 to 3", args: [2, 3], expected: 1 },
    ],
  },
  {
    id: 868,
    slug: "binary-gap",
    title: "Binary Gap",
    difficulty: "Easy",
    category: "bit-manipulation",
    patterns: ["Bit Manipulation"],
    companies: ["google"],
    frequency: 19,
    leetcodeUrl: "https://leetcode.com/problems/binary-gap/",
    description:
      "Return the largest distance between any two adjacent set bits in an integer's binary form.",
    examples: [
      { input: "n = 22", output: "2", explanation: "10110 — the widest 1-to-1 gap is 2." },
      { input: "n = 8", output: "0", explanation: "1000 has only one set bit." },
    ],
    intuition:
      "Scan the bits from least significant upward, remembering the index of the previous 1. Each time a new 1 appears, the distance from the last 1 is a candidate gap; track the maximum seen.",
    approach: [
      "Keep the index of the last set bit (initially none) and a running best.",
      "Walk the bits, incrementing a position counter.",
      "On each set bit, update best with the distance from the previous set bit, then store this index.",
      "Return best, which stays 0 when fewer than two set bits exist.",
    ],
    complexity: { time: "O(log n)", space: "O(1)", note: "One pass over the bits." },
    solutions: [
      {
        language: "python",
        label: "Track last one",
        code: `def binary_gap(n: int) -> int:
    last, i, best = -1, 0, 0
    while n > 0:
        if n & 1:
            if last >= 0:
                best = max(best, i - last)
            last = i
        n >>= 1
        i += 1
    return best`,
      },
      {
        language: "typescript",
        label: "Track last one",
        code: `function binaryGap(n: number): number {
  let last = -1, i = 0, best = 0;
  while (n > 0) {
    if (n & 1) {
      if (last >= 0) best = Math.max(best, i - last);
      last = i;
    }
    n = n >>> 1;
    i++;
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "binaryGap",
      comparison: "deep",
      jsStarter: `function binaryGap(n) {
  // Return the widest distance between adjacent set bits.
  // TODO: implement
}`,
      jsReference: `function binaryGap(n) {
  let last = -1, i = 0, best = 0;
  while (n > 0) {
    if (n & 1) {
      if (last >= 0) best = Math.max(best, i - last);
      last = i;
    }
    n = n >>> 1;
    i++;
  }
  return best;
}`,
    },
    tests: [
      { name: "22", args: [22], expected: 2 },
      { name: "single bit", args: [8], expected: 0 },
      { name: "101", args: [5], expected: 2 },
      { name: "110", args: [6], expected: 1 },
    ],
  },
  {
    id: 318,
    slug: "maximum-product-of-word-lengths",
    title: "Maximum Product of Word Lengths",
    difficulty: "Medium",
    category: "bit-manipulation",
    patterns: ["Bit Manipulation", "Bitmask"],
    companies: ["google", "amazon"],
    frequency: 34,
    leetcodeUrl: "https://leetcode.com/problems/maximum-product-of-word-lengths/",
    description:
      "Find the maximum product of lengths of two words that share no common letters.",
    examples: [
      { input: 'words = ["abcw","baz","foo","bar","xtfn","abcdef"]', output: "16", explanation: '"abcw" and "xtfn".' },
      { input: 'words = ["a","aa","aaa","aaaa"]', output: "0" },
    ],
    intuition:
      "Represent each word's letter set as a 26-bit mask. Two words share a letter exactly when the AND of their masks is non-zero. Compare every pair, and whenever their masks are disjoint, consider the product of their lengths.",
    approach: [
      "Build a bitmask of used letters for each word.",
      "Iterate over all pairs of words.",
      "If two masks AND to zero, they share no letters.",
      "Track the maximum length product across all disjoint pairs.",
    ],
    complexity: { time: "O(n² + total)", space: "O(n)", note: "One mask per word." },
    solutions: [
      {
        language: "python",
        label: "Letter bitmask",
        code: `def max_product(words: list[str]) -> int:
    masks = []
    for w in words:
        m = 0
        for c in w:
            m |= 1 << (ord(c) - 97)
        masks.append(m)
    best = 0
    for i in range(len(words)):
        for j in range(i + 1, len(words)):
            if masks[i] & masks[j] == 0:
                best = max(best, len(words[i]) * len(words[j]))
    return best`,
      },
      {
        language: "typescript",
        label: "Letter bitmask",
        code: `function maxProduct(words: string[]): number {
  const masks = words.map((w) => {
    let m = 0;
    for (const c of w) m |= 1 << (c.charCodeAt(0) - 97);
    return m;
  });
  let best = 0;
  for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j < words.length; j++) {
      if ((masks[i] & masks[j]) === 0) {
        best = Math.max(best, words[i].length * words[j].length);
      }
    }
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "maxProduct",
      comparison: "deep",
      jsStarter: `function maxProduct(words) {
  // Max length product of two words with no shared letters.
  // TODO: implement
}`,
      jsReference: `function maxProduct(words) {
  const masks = words.map((w) => {
    let m = 0;
    for (const c of w) m |= 1 << (c.charCodeAt(0) - 97);
    return m;
  });
  let best = 0;
  for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j < words.length; j++) {
      if ((masks[i] & masks[j]) === 0) {
        best = Math.max(best, words[i].length * words[j].length);
      }
    }
  }
  return best;
}`,
    },
    tests: [
      { name: "mixed words", args: [["abcw", "baz", "foo", "bar", "xtfn", "abcdef"]], expected: 16 },
      { name: "all share a", args: [["a", "aa", "aaa", "aaaa"]], expected: 0 },
      { name: "two letters", args: [["a", "b"]], expected: 1 },
      { name: "three disjoint", args: [["ab", "cd", "ef"]], expected: 4 },
    ],
  },
  {
    id: 1342,
    slug: "number-of-steps-to-reduce-a-number-to-zero",
    title: "Number of Steps to Reduce a Number to Zero",
    difficulty: "Easy",
    category: "bit-manipulation",
    patterns: ["Bit Manipulation", "Simulation"],
    companies: ["amazon", "microsoft"],
    frequency: 29,
    leetcodeUrl: "https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/",
    description:
      "Count the steps to reach zero, halving the value when even and subtracting one when odd.",
    examples: [
      { input: "num = 14", output: "6" },
      { input: "num = 8", output: "4" },
    ],
    intuition:
      "Simulate the rule directly: an even number is halved (a right shift) and an odd number drops by one. Counting each operation until the value hits zero gives the answer; checking the lowest bit decides which move to apply.",
    approach: [
      "Initialize a step counter to zero.",
      "While the number is non-zero, inspect its lowest bit.",
      "Subtract one if it is odd, otherwise divide by two.",
      "Increment the counter each step and return it.",
    ],
    complexity: { time: "O(log num)", space: "O(1)", note: "Halves on even steps." },
    solutions: [
      {
        language: "python",
        label: "Simulate",
        code: `def number_of_steps(num: int) -> int:
    steps = 0
    while num > 0:
        if num & 1:
            num -= 1
        else:
            num //= 2
        steps += 1
    return steps`,
      },
      {
        language: "typescript",
        label: "Simulate",
        code: `function numberOfSteps(num: number): number {
  let steps = 0;
  while (num > 0) {
    if (num & 1) num -= 1;
    else num = Math.floor(num / 2);
    steps++;
  }
  return steps;
}`,
      },
    ],
    runner: {
      entry: "numberOfSteps",
      comparison: "deep",
      jsStarter: `function numberOfSteps(num) {
  // Count steps to reduce num to zero.
  // TODO: implement
}`,
      jsReference: `function numberOfSteps(num) {
  let steps = 0;
  while (num > 0) {
    if (num & 1) num -= 1;
    else num = Math.floor(num / 2);
    steps++;
  }
  return steps;
}`,
    },
    tests: [
      { name: "14", args: [14], expected: 6 },
      { name: "8", args: [8], expected: 4 },
      { name: "123", args: [123], expected: 12 },
      { name: "zero", args: [0], expected: 0 },
    ],
  },
];

export default batchV;
