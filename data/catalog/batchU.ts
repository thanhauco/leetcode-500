import type { Problem } from "../types.ts";

/**
 * Batch U — supplemental easy/medium problems across arrays-hashing,
 * two-pointers, sliding-window, stack, and math-geometry.
 *
 * Every `runner.jsReference` is named exactly `runner.entry` and passes all of
 * its `tests`. All prose is original paraphrasing (no LeetCode statement text).
 */
export const batchU: Problem[] = [
  {
    id: 1346,
    slug: "check-if-n-and-its-double-exist",
    title: "Check If N and Its Double Exist",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Hash Set"],
    companies: ["amazon", "google"],
    frequency: 40,
    leetcodeUrl: "https://leetcode.com/problems/check-if-n-and-its-double-exist/",
    description:
      "Given an integer array, decide whether some element equals exactly twice another element at a different index.",
    examples: [
      { input: "arr = [10,2,5,3]", output: "true", explanation: "10 is twice 5." },
      { input: "arr = [3,1,7,11]", output: "false" },
    ],
    intuition:
      "For each value x, a valid partner is either 2*x or x/2 sitting elsewhere. Scan once and remember every value seen so far in a set; before inserting x, check whether its double or half already appeared. Zero needs care: it only matches another zero.",
    approach: [
      "Create an empty hash set of values already visited.",
      "For each value x, if 2*x is in the set, or x is even and x/2 is in the set, return true.",
      "Otherwise add x to the set and continue.",
      "Return false if no pair is found.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Single pass with a hash set." },
    solutions: [
      {
        language: "python",
        label: "Hash Set",
        code: `def check_if_exist(arr: list[int]) -> bool:
    seen: set[int] = set()
    for x in arr:
        if 2 * x in seen or (x % 2 == 0 and x // 2 in seen):
            return True
        seen.add(x)
    return False`,
      },
      {
        language: "typescript",
        label: "Hash Set",
        code: `function checkIfExist(arr: number[]): boolean {
  const seen = new Set<number>();
  for (const x of arr) {
    if (seen.has(2 * x) || (x % 2 === 0 && seen.has(x / 2))) return true;
    seen.add(x);
  }
  return false;
}`,
      },
    ],
    runner: {
      entry: "checkIfExist",
      comparison: "deep",
      jsStarter: `function checkIfExist(arr) {
  // Return true if some element equals twice another element.
  // TODO: implement
}`,
      jsReference: `function checkIfExist(arr) {
  const seen = new Set();
  for (const x of arr) {
    if (seen.has(2 * x) || (x % 2 === 0 && seen.has(x / 2))) return true;
    seen.add(x);
  }
  return false;
}`,
    },
    tests: [
      { name: "double exists", args: [[10, 2, 5, 3]], expected: true },
      { name: "none", args: [[3, 1, 7, 11]], expected: false },
      { name: "two zeros", args: [[0, 0]], expected: true },
      { name: "single zero", args: [[0, 1, 4]], expected: false },
    ],
  },
  {
    id: 1832,
    slug: "check-if-the-sentence-is-pangram",
    title: "Check if the Sentence Is Pangram",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Hash Set"],
    companies: ["amazon"],
    frequency: 35,
    leetcodeUrl: "https://leetcode.com/problems/check-if-the-sentence-is-pangram/",
    description:
      "Return whether a lowercase string contains every letter of the English alphabet at least once.",
    examples: [
      { input: 's = "thequickbrownfoxjumpsoverthelazydog"', output: "true" },
      { input: 's = "leetcode"', output: "false" },
    ],
    intuition:
      "A pangram uses all 26 distinct letters. Collect the unique characters into a set and simply check whether its size reaches 26 — there is nothing else to verify.",
    approach: [
      "Insert every character of the string into a hash set.",
      "Count the distinct characters.",
      "Return true exactly when that count equals 26.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Set holds at most 26 letters." },
    solutions: [
      {
        language: "python",
        label: "Hash Set",
        code: `def check_if_pangram(sentence: str) -> bool:
    return len(set(sentence)) == 26`,
      },
      {
        language: "typescript",
        label: "Hash Set",
        code: `function checkIfPangram(sentence: string): boolean {
  return new Set(sentence).size === 26;
}`,
      },
    ],
    runner: {
      entry: "checkIfPangram",
      comparison: "deep",
      jsStarter: `function checkIfPangram(sentence) {
  // Return true if the string uses all 26 letters.
  // TODO: implement
}`,
      jsReference: `function checkIfPangram(sentence) {
  return new Set(sentence).size === 26;
}`,
    },
    tests: [
      { name: "pangram", args: ["thequickbrownfoxjumpsoverthelazydog"], expected: true },
      { name: "not pangram", args: ["leetcode"], expected: false },
      { name: "missing one", args: ["abcdefghijklmnopqrstuvwxy"], expected: false },
      { name: "exact alphabet", args: ["abcdefghijklmnopqrstuvwxyz"], expected: true },
    ],
  },
  {
    id: 1207,
    slug: "unique-number-of-occurrences",
    title: "Unique Number of Occurrences",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Hash Map", "Hash Set"],
    companies: ["amazon", "google"],
    frequency: 38,
    leetcodeUrl: "https://leetcode.com/problems/unique-number-of-occurrences/",
    description:
      "Return whether every value in the array has a distinct frequency from all the other values.",
    examples: [
      { input: "arr = [1,2,2,1,1,3]", output: "true", explanation: "Counts 3,2,1 are all different." },
      { input: "arr = [1,2]", output: "false" },
    ],
    intuition:
      "Count how many times each value appears, then ask whether those counts collide. Drop the counts into a set; if the set is smaller than the number of distinct values, two values shared a count.",
    approach: [
      "Tally occurrences of each value in a frequency map.",
      "Collect the frequency values into a set.",
      "Return true when the set size equals the number of map entries.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Map plus a set of counts." },
    solutions: [
      {
        language: "python",
        label: "Counter",
        code: `from collections import Counter

def unique_occurrences(arr: list[int]) -> bool:
    counts = Counter(arr).values()
    return len(set(counts)) == len(counts)`,
      },
      {
        language: "typescript",
        label: "Hash Map",
        code: `function uniqueOccurrences(arr: number[]): boolean {
  const counts = new Map<number, number>();
  for (const x of arr) counts.set(x, (counts.get(x) ?? 0) + 1);
  const freqs = [...counts.values()];
  return new Set(freqs).size === freqs.length;
}`,
      },
    ],
    runner: {
      entry: "uniqueOccurrences",
      comparison: "deep",
      jsStarter: `function uniqueOccurrences(arr) {
  // Return true if all occurrence counts are distinct.
  // TODO: implement
}`,
      jsReference: `function uniqueOccurrences(arr) {
  const counts = new Map();
  for (const x of arr) counts.set(x, (counts.get(x) ?? 0) + 1);
  const freqs = [...counts.values()];
  return new Set(freqs).size === freqs.length;
}`,
    },
    tests: [
      { name: "distinct counts", args: [[1, 2, 2, 1, 1, 3]], expected: true },
      { name: "collision", args: [[1, 2]], expected: false },
      { name: "negatives", args: [[-3, 0, 1, -3, 1, 1, 0, 0, 0]], expected: true },
      { name: "single", args: [[5]], expected: true },
    ],
  },
  {
    id: 575,
    slug: "distribute-candies",
    title: "Distribute Candies",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Hash Set"],
    companies: ["amazon"],
    frequency: 33,
    leetcodeUrl: "https://leetcode.com/problems/distribute-candies/",
    description:
      "Half the candies go to one sibling; return the maximum number of distinct candy types that sibling can hold.",
    examples: [
      { input: "candyType = [1,1,2,2,3,3]", output: "3", explanation: "Three types, can take 3." },
      { input: "candyType = [6,6,6,6]", output: "1" },
    ],
    intuition:
      "The sibling may keep n/2 candies. Variety is capped both by how many they can carry (n/2) and by how many distinct types exist, so the answer is the smaller of those two numbers.",
    approach: [
      "Count the distinct candy types with a hash set.",
      "Compute the half allotment n/2.",
      "Return the minimum of the distinct-type count and n/2.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Set of unique types." },
    solutions: [
      {
        language: "python",
        label: "Hash Set",
        code: `def distribute_candies(candy_type: list[int]) -> int:
    return min(len(set(candy_type)), len(candy_type) // 2)`,
      },
      {
        language: "typescript",
        label: "Hash Set",
        code: `function distributeCandies(candyType: number[]): number {
  const kinds = new Set(candyType).size;
  return Math.min(kinds, candyType.length / 2);
}`,
      },
    ],
    runner: {
      entry: "distributeCandies",
      comparison: "deep",
      jsStarter: `function distributeCandies(candyType) {
  // Return the max distinct types within the n/2 limit.
  // TODO: implement
}`,
      jsReference: `function distributeCandies(candyType) {
  const kinds = new Set(candyType).size;
  return Math.min(kinds, candyType.length / 2);
}`,
    },
    tests: [
      { name: "three types", args: [[1, 1, 2, 2, 3, 3]], expected: 3 },
      { name: "one type", args: [[6, 6, 6, 6]], expected: 1 },
      { name: "limited by half", args: [[1, 1, 2, 3]], expected: 2 },
      { name: "all distinct", args: [[1, 2, 3, 4, 5, 6]], expected: 3 },
    ],
  },
  {
    id: 645,
    slug: "set-mismatch",
    title: "Set Mismatch",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Hash Map", "Counting"],
    companies: ["amazon", "microsoft"],
    frequency: 36,
    leetcodeUrl: "https://leetcode.com/problems/set-mismatch/",
    description:
      "An array meant to hold 1..n has one number duplicated in place of a missing one; return the duplicated value and the missing value.",
    examples: [
      { input: "nums = [1,2,2,4]", output: "[2,3]", explanation: "2 is duplicated, 3 is missing." },
      { input: "nums = [1,1]", output: "[1,2]" },
    ],
    intuition:
      "Count how many times each of 1..n shows up. Exactly one value appears twice (the duplicate) and exactly one never appears (the missing). Walk 1..n and read off both.",
    approach: [
      "Tally occurrences of every value with a frequency map.",
      "Scan v from 1 to n.",
      "Record v as the duplicate when its count is 2, and as missing when its count is 0.",
      "Return [duplicate, missing].",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Frequency map over 1..n." },
    solutions: [
      {
        language: "python",
        label: "Counting",
        code: `from collections import Counter

def find_error_nums(nums: list[int]) -> list[int]:
    n = len(nums)
    counts = Counter(nums)
    dup = miss = -1
    for v in range(1, n + 1):
        if counts[v] == 2:
            dup = v
        elif counts[v] == 0:
            miss = v
    return [dup, miss]`,
      },
      {
        language: "typescript",
        label: "Counting",
        code: `function findErrorNums(nums: number[]): number[] {
  const n = nums.length;
  const counts = new Array<number>(n + 1).fill(0);
  for (const x of nums) counts[x]++;
  let dup = -1, miss = -1;
  for (let v = 1; v <= n; v++) {
    if (counts[v] === 2) dup = v;
    else if (counts[v] === 0) miss = v;
  }
  return [dup, miss];
}`,
      },
    ],
    runner: {
      entry: "findErrorNums",
      comparison: "deep",
      jsStarter: `function findErrorNums(nums) {
  // Return [duplicatedValue, missingValue].
  // TODO: implement
}`,
      jsReference: `function findErrorNums(nums) {
  const n = nums.length;
  const counts = new Array(n + 1).fill(0);
  for (const x of nums) counts[x]++;
  let dup = -1, miss = -1;
  for (let v = 1; v <= n; v++) {
    if (counts[v] === 2) dup = v;
    else if (counts[v] === 0) miss = v;
  }
  return [dup, miss];
}`,
    },
    tests: [
      { name: "dup 2 miss 3", args: [[1, 2, 2, 4]], expected: [2, 3] },
      { name: "two ones", args: [[1, 1]], expected: [1, 2] },
      { name: "dup 3 miss 4", args: [[3, 2, 3, 1]], expected: [3, 4] },
      { name: "miss one", args: [[2, 2]], expected: [2, 1] },
    ],
  },
  {
    id: 414,
    slug: "third-maximum-number",
    title: "Third Maximum Number",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Hash Set", "Tracking"],
    companies: ["amazon", "google"],
    frequency: 34,
    leetcodeUrl: "https://leetcode.com/problems/third-maximum-number/",
    description:
      "Return the third largest distinct value; if fewer than three distinct values exist, return the maximum.",
    examples: [
      { input: "nums = [3,2,1]", output: "1", explanation: "Third distinct max is 1." },
      { input: "nums = [1,2]", output: "2", explanation: "No third distinct value, so return max." },
    ],
    intuition:
      "Track the top three distinct values with three running placeholders. For each number, slot it in if it beats one of them and is not already represented. If the third slot was never filled, fall back to the largest.",
    approach: [
      "Keep three nullable trackers first, second, third.",
      "For each value, skip if it already equals one of the trackers.",
      "Cascade it into place when it exceeds first, second, or third.",
      "Return third if it was set, otherwise first.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Constant trackers." },
    solutions: [
      {
        language: "python",
        label: "Trackers",
        code: `def third_max(nums: list[int]) -> int:
    first = second = third = None
    for x in nums:
        if x in (first, second, third):
            continue
        if first is None or x > first:
            first, second, third = x, first, second
        elif second is None or x > second:
            second, third = x, second
        elif third is None or x > third:
            third = x
    return third if third is not None else first`,
      },
      {
        language: "typescript",
        label: "Trackers",
        code: `function thirdMax(nums: number[]): number {
  let first: number | null = null, second: number | null = null, third: number | null = null;
  for (const x of nums) {
    if (x === first || x === second || x === third) continue;
    if (first === null || x > first) { third = second; second = first; first = x; }
    else if (second === null || x > second) { third = second; second = x; }
    else if (third === null || x > third) { third = x; }
  }
  return third !== null ? third : (first as number);
}`,
      },
    ],
    runner: {
      entry: "thirdMax",
      comparison: "deep",
      jsStarter: `function thirdMax(nums) {
  // Return the third distinct maximum, else the maximum.
  // TODO: implement
}`,
      jsReference: `function thirdMax(nums) {
  let first = null, second = null, third = null;
  for (const x of nums) {
    if (x === first || x === second || x === third) continue;
    if (first === null || x > first) { third = second; second = first; first = x; }
    else if (second === null || x > second) { third = second; second = x; }
    else if (third === null || x > third) { third = x; }
  }
  return third !== null ? third : first;
}`,
    },
    tests: [
      { name: "exactly three", args: [[3, 2, 1]], expected: 1 },
      { name: "fewer distinct", args: [[1, 2]], expected: 2 },
      { name: "with duplicates", args: [[2, 2, 3, 1]], expected: 1 },
      { name: "negatives", args: [[1, 2, -2147483648]], expected: -2147483648 },
    ],
  },
  {
    id: 599,
    slug: "minimum-index-sum-of-two-lists",
    title: "Minimum Index Sum of Two Lists",
    difficulty: "Medium",
    category: "arrays-hashing",
    patterns: ["Hash Map"],
    companies: ["amazon", "google"],
    frequency: 32,
    leetcodeUrl: "https://leetcode.com/problems/minimum-index-sum-of-two-lists/",
    description:
      "Given two lists of strings, return every common string whose combined index in both lists is the smallest possible.",
    examples: [
      {
        input: 'list1 = ["a","b","c"], list2 = ["c","a"]',
        output: '["a"]',
        explanation: '"a" has index sum 0+1=1, "c" has 2+0=2.',
      },
      {
        input: 'list1 = ["x","y"], list2 = ["y","x"]',
        output: '["x","y"]',
        explanation: "Both share an index sum of 1.",
      },
    ],
    intuition:
      "Map each string in the first list to its index. Walk the second list and, for shared strings, compute the index sum. Keep only the strings tied for the smallest sum seen so far.",
    approach: [
      "Store list1 values with their indices in a map.",
      "For each (j, word) in list2 that exists in the map, compute i + j.",
      "Reset the result when a smaller sum appears; append on a tie.",
      "Return the collected strings.",
    ],
    complexity: { time: "O(n + m)", space: "O(n)", note: "Map over the first list." },
    solutions: [
      {
        language: "python",
        label: "Hash Map",
        code: `def find_restaurant(list1: list[str], list2: list[str]) -> list[str]:
    index = {w: i for i, w in enumerate(list1)}
    best = float("inf")
    result: list[str] = []
    for j, w in enumerate(list2):
        if w in index:
            s = index[w] + j
            if s < best:
                best, result = s, [w]
            elif s == best:
                result.append(w)
    return result`,
      },
      {
        language: "typescript",
        label: "Hash Map",
        code: `function findRestaurant(list1: string[], list2: string[]): string[] {
  const index = new Map<string, number>();
  list1.forEach((w, i) => index.set(w, i));
  let best = Infinity;
  let result: string[] = [];
  list2.forEach((w, j) => {
    if (index.has(w)) {
      const s = index.get(w)! + j;
      if (s < best) { best = s; result = [w]; }
      else if (s === best) result.push(w);
    }
  });
  return result;
}`,
      },
    ],
    runner: {
      entry: "findRestaurant",
      comparison: "canonical",
      jsStarter: `function findRestaurant(list1, list2) {
  // Return common strings with the minimum index sum.
  // TODO: implement
}`,
      jsReference: `function findRestaurant(list1, list2) {
  const index = new Map();
  list1.forEach((w, i) => index.set(w, i));
  let best = Infinity;
  let result = [];
  list2.forEach((w, j) => {
    if (index.has(w)) {
      const s = index.get(w) + j;
      if (s < best) { best = s; result = [w]; }
      else if (s === best) result.push(w);
    }
  });
  return result;
}`,
    },
    tests: [
      { name: "single min", args: [["a", "b", "c"], ["c", "a"]], expected: ["a"] },
      { name: "tie", args: [["x", "y"], ["y", "x"]], expected: ["x", "y"] },
      {
        name: "first match",
        args: [["Shogun", "Tapioca", "Burger", "KFC"], ["KFC", "Shogun", "Burger"]],
        expected: ["Shogun"],
      },
      { name: "no overlap", args: [["a"], ["b"]], expected: [] },
    ],
  },
  {
    id: 520,
    slug: "detect-capital",
    title: "Detect Capital",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["String"],
    companies: ["google"],
    frequency: 30,
    leetcodeUrl: "https://leetcode.com/problems/detect-capital/",
    description:
      "Decide whether a word's capitalization is valid: all uppercase, all lowercase, or only the first letter uppercase.",
    examples: [
      { input: 'word = "USA"', output: "true" },
      { input: 'word = "FlaG"', output: "false" },
    ],
    intuition:
      "Only three layouts are acceptable. Either the whole word is uppercase, the whole word is lowercase, or the first character is uppercase while the rest are lowercase. Test those three patterns directly.",
    approach: [
      "Check if the word equals its uppercase form.",
      "Check if the word equals its lowercase form.",
      "Check if the first letter is uppercase and the remainder is lowercase.",
      "Return true if any condition holds.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Builds transformed copies." },
    solutions: [
      {
        language: "python",
        label: "Pattern Check",
        code: `def detect_capital_use(word: str) -> bool:
    return word.isupper() or word.islower() or word.istitle()`,
      },
      {
        language: "typescript",
        label: "Pattern Check",
        code: `function detectCapitalUse(word: string): boolean {
  if (word === word.toUpperCase()) return true;
  if (word === word.toLowerCase()) return true;
  return (
    word[0] === word[0].toUpperCase() &&
    word.slice(1) === word.slice(1).toLowerCase()
  );
}`,
      },
    ],
    runner: {
      entry: "detectCapitalUse",
      comparison: "deep",
      jsStarter: `function detectCapitalUse(word) {
  // Return true if the capitalization is valid.
  // TODO: implement
}`,
      jsReference: `function detectCapitalUse(word) {
  if (word === word.toUpperCase()) return true;
  if (word === word.toLowerCase()) return true;
  return (
    word[0] === word[0].toUpperCase() &&
    word.slice(1) === word.slice(1).toLowerCase()
  );
}`,
    },
    tests: [
      { name: "all upper", args: ["USA"], expected: true },
      { name: "mixed", args: ["FlaG"], expected: false },
      { name: "title case", args: ["Google"], expected: true },
      { name: "all lower", args: ["leetcode"], expected: true },
    ],
  },
  {
    id: 771,
    slug: "jewels-and-stones",
    title: "Jewels and Stones",
    difficulty: "Easy",
    category: "arrays-hashing",
    patterns: ["Hash Set"],
    companies: ["amazon", "microsoft"],
    frequency: 41,
    leetcodeUrl: "https://leetcode.com/problems/jewels-and-stones/",
    description:
      "Given which characters count as jewels, count how many characters in a stones string are jewels.",
    examples: [
      { input: 'jewels = "aA", stones = "aAAbbbb"', output: "3" },
      { input: 'jewels = "z", stones = "ZZ"', output: "0" },
    ],
    intuition:
      "Put the jewel characters into a set for O(1) membership tests, then sweep the stones once and tally each stone whose character is a jewel.",
    approach: [
      "Build a set from the jewels string.",
      "Iterate over the stones string.",
      "Increment a counter whenever the stone is in the jewel set.",
      "Return the counter.",
    ],
    complexity: { time: "O(j + s)", space: "O(j)", note: "Set of jewel characters." },
    solutions: [
      {
        language: "python",
        label: "Hash Set",
        code: `def num_jewels_in_stones(jewels: str, stones: str) -> int:
    jewel_set = set(jewels)
    return sum(1 for s in stones if s in jewel_set)`,
      },
      {
        language: "typescript",
        label: "Hash Set",
        code: `function numJewelsInStones(jewels: string, stones: string): number {
  const jewelSet = new Set(jewels);
  let count = 0;
  for (const s of stones) if (jewelSet.has(s)) count++;
  return count;
}`,
      },
    ],
    runner: {
      entry: "numJewelsInStones",
      comparison: "deep",
      jsStarter: `function numJewelsInStones(jewels, stones) {
  // Count stones that are jewels.
  // TODO: implement
}`,
      jsReference: `function numJewelsInStones(jewels, stones) {
  const jewelSet = new Set(jewels);
  let count = 0;
  for (const s of stones) if (jewelSet.has(s)) count++;
  return count;
}`,
    },
    tests: [
      { name: "mixed case", args: ["aA", "aAAbbbb"], expected: 3 },
      { name: "none", args: ["z", "ZZ"], expected: 0 },
      { name: "all jewels", args: ["abc", "aabbcc"], expected: 6 },
      { name: "empty stones", args: ["a", ""], expected: 0 },
    ],
  },
  {
    id: 929,
    slug: "unique-email-addresses",
    title: "Unique Email Addresses",
    difficulty: "Medium",
    category: "arrays-hashing",
    patterns: ["Hash Set", "String"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 39,
    leetcodeUrl: "https://leetcode.com/problems/unique-email-addresses/",
    description:
      "Normalize each email by ignoring dots and anything after a plus in the local part, then count the distinct delivery addresses.",
    examples: [
      {
        input: 'emails = ["test.email+alex@leet.com","test.e.mail+bob@leet.com"]',
        output: "1",
        explanation: "Both normalize to testemail@leet.com.",
      },
      {
        input: 'emails = ["a@x.com","b@x.com"]',
        output: "2",
      },
    ],
    intuition:
      "Split each address at the '@'. In the local part drop everything from the first '+' and remove every '.'; keep the domain untouched. Insert the rebuilt address into a set and report its size.",
    approach: [
      "For each email, split into local and domain at '@'.",
      "Truncate the local part at the first '+', then strip out '.' characters.",
      "Join the cleaned local part with '@' and the domain.",
      "Add to a set and return the set size.",
    ],
    complexity: { time: "O(n * k)", space: "O(n * k)", note: "n emails of length up to k." },
    solutions: [
      {
        language: "python",
        label: "Normalize",
        code: `def num_unique_emails(emails: list[str]) -> int:
    seen: set[str] = set()
    for email in emails:
        local, domain = email.split("@")
        local = local.split("+")[0].replace(".", "")
        seen.add(local + "@" + domain)
    return len(seen)`,
      },
      {
        language: "typescript",
        label: "Normalize",
        code: `function numUniqueEmails(emails: string[]): number {
  const seen = new Set<string>();
  for (const email of emails) {
    const [rawLocal, domain] = email.split("@");
    const local = rawLocal.split("+")[0].replace(/\\./g, "");
    seen.add(local + "@" + domain);
  }
  return seen.size;
}`,
      },
    ],
    runner: {
      entry: "numUniqueEmails",
      comparison: "deep",
      jsStarter: `function numUniqueEmails(emails) {
  // Count distinct normalized email addresses.
  // TODO: implement
}`,
      jsReference: `function numUniqueEmails(emails) {
  const seen = new Set();
  for (const email of emails) {
    const [rawLocal, domain] = email.split("@");
    const local = rawLocal.split("+")[0].replace(/\\./g, "");
    seen.add(local + "@" + domain);
  }
  return seen.size;
}`,
    },
    tests: [
      {
        name: "collapse to one",
        args: [["test.email+alex@leet.com", "test.e.mail+bob@leet.com", "testemail+david@lee.tcode.com"]],
        expected: 2,
      },
      { name: "distinct", args: [["a@x.com", "b@x.com"]], expected: 2 },
      { name: "dots ignored", args: [["a.b@x.com", "ab@x.com"]], expected: 1 },
      { name: "plus ignored", args: [["a+1@x.com", "a+2@x.com"]], expected: 1 },
    ],
  },
  {
    id: 557,
    slug: "reverse-words-in-a-string-iii",
    title: "Reverse Words in a String III",
    difficulty: "Easy",
    category: "two-pointers",
    patterns: ["String", "Two Pointers"],
    companies: ["amazon"],
    frequency: 37,
    leetcodeUrl: "https://leetcode.com/problems/reverse-words-in-a-string-iii/",
    description:
      "Reverse the characters of each word in a sentence while keeping the words in their original order and spacing.",
    examples: [
      { input: 's = "Let\'s code"', output: '"s\'teL edoc"' },
      { input: 's = "abc"', output: '"cba"' },
    ],
    intuition:
      "Word boundaries never move, only the letters inside a word flip. Split on single spaces, reverse each token, and stitch them back together with spaces.",
    approach: [
      "Split the sentence on spaces into words.",
      "Reverse the character order within each word.",
      "Join the reversed words back with single spaces.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Builds the output string." },
    solutions: [
      {
        language: "python",
        label: "Split & Reverse",
        code: `def reverse_words(s: str) -> str:
    return " ".join(word[::-1] for word in s.split(" "))`,
      },
      {
        language: "typescript",
        label: "Split & Reverse",
        code: `function reverseWords(s: string): string {
  return s
    .split(" ")
    .map((w) => w.split("").reverse().join(""))
    .join(" ");
}`,
      },
    ],
    runner: {
      entry: "reverseWords",
      comparison: "deep",
      jsStarter: `function reverseWords(s) {
  // Reverse each word but keep word order.
  // TODO: implement
}`,
      jsReference: `function reverseWords(s) {
  return s
    .split(" ")
    .map((w) => w.split("").reverse().join(""))
    .join(" ");
}`,
    },
    tests: [
      { name: "two words", args: ["Let's code"], expected: "s'teL edoc" },
      { name: "single word", args: ["abc"], expected: "cba" },
      { name: "sentence", args: ["God Ding"], expected: "doG gniD" },
      { name: "palindrome word", args: ["aba cdc"], expected: "aba cdc" },
    ],
  },
  {
    id: 38,
    slug: "count-and-say",
    title: "Count and Say",
    difficulty: "Medium",
    category: "math-geometry",
    patterns: ["String", "Simulation"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 31,
    leetcodeUrl: "https://leetcode.com/problems/count-and-say/",
    description:
      "Build the nth term of the look-and-say sequence by repeatedly describing the previous term as runs of (count, digit).",
    examples: [
      { input: "n = 1", output: '"1"' },
      { input: "n = 4", output: '"1211"', explanation: '1 → 11 → 21 → 1211.' },
    ],
    intuition:
      "Each term is read aloud as consecutive runs of the same digit. Starting from \"1\", scan the current term, count each maximal run, and emit the count followed by the digit. Repeat until you reach term n.",
    approach: [
      "Start with the string \"1\".",
      "Repeat n-1 times: scan the current string grouping equal adjacent digits.",
      "For each run append its length and the digit to the next string.",
      "Return the final string.",
    ],
    complexity: { time: "O(n * m)", space: "O(m)", note: "m is the length of the longest term." },
    solutions: [
      {
        language: "python",
        label: "Simulation",
        code: `def count_and_say(n: int) -> str:
    s = "1"
    for _ in range(n - 1):
        out: list[str] = []
        i = 0
        while i < len(s):
            j = i
            while j < len(s) and s[j] == s[i]:
                j += 1
            out.append(str(j - i))
            out.append(s[i])
            i = j
        s = "".join(out)
    return s`,
      },
      {
        language: "typescript",
        label: "Simulation",
        code: `function countAndSay(n: number): string {
  let s = "1";
  for (let k = 1; k < n; k++) {
    let out = "";
    let i = 0;
    while (i < s.length) {
      let j = i;
      while (j < s.length && s[j] === s[i]) j++;
      out += String(j - i) + s[i];
      i = j;
    }
    s = out;
  }
  return s;
}`,
      },
    ],
    runner: {
      entry: "countAndSay",
      comparison: "deep",
      jsStarter: `function countAndSay(n) {
  // Return the nth look-and-say term.
  // TODO: implement
}`,
      jsReference: `function countAndSay(n) {
  let s = "1";
  for (let k = 1; k < n; k++) {
    let out = "";
    let i = 0;
    while (i < s.length) {
      let j = i;
      while (j < s.length && s[j] === s[i]) j++;
      out += String(j - i) + s[i];
      i = j;
    }
    s = out;
  }
  return s;
}`,
    },
    tests: [
      { name: "first", args: [1], expected: "1" },
      { name: "fourth", args: [4], expected: "1211" },
      { name: "fifth", args: [5], expected: "111221" },
      { name: "sixth", args: [6], expected: "312211" },
    ],
  },
  {
    id: 6,
    slug: "zigzag-conversion",
    title: "Zigzag Conversion",
    difficulty: "Medium",
    category: "math-geometry",
    patterns: ["String", "Simulation"],
    companies: ["amazon", "apple", "adobe"],
    frequency: 33,
    leetcodeUrl: "https://leetcode.com/problems/zigzag-conversion/",
    description:
      "Write the string in a zigzag across the given number of rows, then read it back row by row.",
    examples: [
      { input: 's = "PAYPALISHIRING", numRows = 3', output: '"PAHNAPLSIIGYIR"' },
      { input: 's = "AB", numRows = 1', output: '"AB"' },
    ],
    intuition:
      "Picture the characters placed downward then diagonally up, bouncing between the top and bottom rows. Track which row each character lands on by toggling direction at the boundaries, append into per-row buckets, and concatenate the rows.",
    approach: [
      "If numRows is 1, return the string unchanged.",
      "Maintain a list of row buffers and a current row index.",
      "Append each character to its row, flipping direction at the top and bottom rows.",
      "Concatenate all rows in order.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Buckets hold every character once." },
    solutions: [
      {
        language: "python",
        label: "Row Simulation",
        code: `def convert(s: str, num_rows: int) -> str:
    if num_rows == 1:
        return s
    rows = [""] * num_rows
    row, step = 0, 1
    for c in s:
        rows[row] += c
        if row == 0:
            step = 1
        elif row == num_rows - 1:
            step = -1
        row += step
    return "".join(rows)`,
      },
      {
        language: "typescript",
        label: "Row Simulation",
        code: `function convert(s: string, numRows: number): string {
  if (numRows === 1) return s;
  const rows = new Array<string>(numRows).fill("");
  let row = 0, step = 1;
  for (const c of s) {
    rows[row] += c;
    if (row === 0) step = 1;
    else if (row === numRows - 1) step = -1;
    row += step;
  }
  return rows.join("");
}`,
      },
    ],
    runner: {
      entry: "convert",
      comparison: "deep",
      jsStarter: `function convert(s, numRows) {
  // Return the zigzag-then-row-read string.
  // TODO: implement
}`,
      jsReference: `function convert(s, numRows) {
  if (numRows === 1) return s;
  const rows = new Array(numRows).fill("");
  let row = 0, step = 1;
  for (const c of s) {
    rows[row] += c;
    if (row === 0) step = 1;
    else if (row === numRows - 1) step = -1;
    row += step;
  }
  return rows.join("");
}`,
    },
    tests: [
      { name: "three rows", args: ["PAYPALISHIRING", 3], expected: "PAHNAPLSIIGYIR" },
      { name: "four rows", args: ["PAYPALISHIRING", 4], expected: "PINALSIGYAHRPI" },
      { name: "one row", args: ["AB", 1], expected: "AB" },
      { name: "rows exceed length", args: ["ABC", 5], expected: "ABC" },
    ],
  },
  {
    id: 633,
    slug: "sum-of-square-numbers",
    title: "Sum of Square Numbers",
    difficulty: "Medium",
    category: "two-pointers",
    patterns: ["Two Pointers", "Math"],
    companies: ["amazon", "google"],
    frequency: 30,
    leetcodeUrl: "https://leetcode.com/problems/sum-of-square-numbers/",
    description:
      "Decide whether a non-negative integer can be written as the sum of two perfect squares a² + b².",
    examples: [
      { input: "c = 5", output: "true", explanation: "1² + 2² = 5." },
      { input: "c = 3", output: "false" },
    ],
    intuition:
      "Let one square root start at 0 and the other at floor(sqrt(c)). Their squares sum either too low (raise the left) or too high (lower the right), so move two pointers inward until they meet or hit the target exactly.",
    approach: [
      "Set left = 0 and right = floor(sqrt(c)).",
      "Compute s = left² + right² while left ≤ right.",
      "Return true if s equals c; increase left if s is too small, decrease right if too large.",
      "Return false if the pointers cross without a match.",
    ],
    complexity: { time: "O(√c)", space: "O(1)", note: "Two pointers over square roots." },
    solutions: [
      {
        language: "python",
        label: "Two Pointers",
        code: `import math

def judge_square_sum(c: int) -> bool:
    left, right = 0, int(math.isqrt(c))
    while left <= right:
        s = left * left + right * right
        if s == c:
            return True
        if s < c:
            left += 1
        else:
            right -= 1
    return False`,
      },
      {
        language: "typescript",
        label: "Two Pointers",
        code: `function judgeSquareSum(c: number): boolean {
  let left = 0;
  let right = Math.floor(Math.sqrt(c));
  while (left <= right) {
    const s = left * left + right * right;
    if (s === c) return true;
    if (s < c) left++;
    else right--;
  }
  return false;
}`,
      },
    ],
    runner: {
      entry: "judgeSquareSum",
      comparison: "deep",
      jsStarter: `function judgeSquareSum(c) {
  // Return true if c = a^2 + b^2 for some integers.
  // TODO: implement
}`,
      jsReference: `function judgeSquareSum(c) {
  let left = 0;
  let right = Math.floor(Math.sqrt(c));
  while (left <= right) {
    const s = left * left + right * right;
    if (s === c) return true;
    if (s < c) left++;
    else right--;
  }
  return false;
}`,
    },
    tests: [
      { name: "five", args: [5], expected: true },
      { name: "three", args: [3], expected: false },
      { name: "zero", args: [0], expected: true },
      { name: "four", args: [4], expected: true },
    ],
  },
  {
    id: 845,
    slug: "longest-mountain-in-array",
    title: "Longest Mountain in Array",
    difficulty: "Medium",
    category: "two-pointers",
    patterns: ["Two Pointers", "Array"],
    companies: ["amazon", "google"],
    frequency: 32,
    leetcodeUrl: "https://leetcode.com/problems/longest-mountain-in-array/",
    description:
      "Find the length of the longest contiguous run that strictly increases to a peak and then strictly decreases.",
    examples: [
      { input: "arr = [2,1,4,7,3,2,5]", output: "5", explanation: "1,4,7,3,2 forms a mountain." },
      { input: "arr = [2,2,2]", output: "0" },
    ],
    intuition:
      "A mountain needs an up-slope, a single peak, then a down-slope. Find each peak (greater than both neighbors), then expand outward while the values keep strictly rising on the left and strictly falling on the right, measuring that width.",
    approach: [
      "Scan indices that are strict local peaks (arr[i-1] < arr[i] > arr[i+1]).",
      "From each peak, walk left while strictly increasing and right while strictly decreasing.",
      "Compute the width right - left + 1 and track the maximum.",
      "Return the best width, or 0 if no mountain exists.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Each element visited a constant number of times." },
    solutions: [
      {
        language: "python",
        label: "Expand From Peaks",
        code: `def longest_mountain(arr: list[int]) -> int:
    n = len(arr)
    best = 0
    i = 1
    while i < n - 1:
        if arr[i - 1] < arr[i] > arr[i + 1]:
            left = i - 1
            while left > 0 and arr[left - 1] < arr[left]:
                left -= 1
            right = i + 1
            while right < n - 1 and arr[right] > arr[right + 1]:
                right += 1
            best = max(best, right - left + 1)
            i = right + 1
        else:
            i += 1
    return best`,
      },
      {
        language: "typescript",
        label: "Expand From Peaks",
        code: `function longestMountain(arr: number[]): number {
  const n = arr.length;
  let best = 0;
  let i = 1;
  while (i < n - 1) {
    if (arr[i - 1] < arr[i] && arr[i] > arr[i + 1]) {
      let left = i - 1;
      while (left > 0 && arr[left - 1] < arr[left]) left--;
      let right = i + 1;
      while (right < n - 1 && arr[right] > arr[right + 1]) right++;
      best = Math.max(best, right - left + 1);
      i = right + 1;
    } else {
      i++;
    }
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "longestMountain",
      comparison: "deep",
      jsStarter: `function longestMountain(arr) {
  // Return the length of the longest mountain.
  // TODO: implement
}`,
      jsReference: `function longestMountain(arr) {
  const n = arr.length;
  let best = 0;
  let i = 1;
  while (i < n - 1) {
    if (arr[i - 1] < arr[i] && arr[i] > arr[i + 1]) {
      let left = i - 1;
      while (left > 0 && arr[left - 1] < arr[left]) left--;
      let right = i + 1;
      while (right < n - 1 && arr[right] > arr[right + 1]) right++;
      best = Math.max(best, right - left + 1);
      i = right + 1;
    } else {
      i++;
    }
  }
  return best;
}`,
    },
    tests: [
      { name: "mountain of 5", args: [[2, 1, 4, 7, 3, 2, 5]], expected: 5 },
      { name: "flat", args: [[2, 2, 2]], expected: 0 },
      { name: "no down slope", args: [[0, 1, 2, 3, 4]], expected: 0 },
      { name: "simple peak", args: [[0, 2, 0]], expected: 3 },
    ],
  },
  {
    id: 1493,
    slug: "longest-subarray-of-1s-after-deleting-one-element",
    title: "Longest Subarray of 1's After Deleting One Element",
    difficulty: "Medium",
    category: "sliding-window",
    patterns: ["Sliding Window"],
    companies: ["amazon", "google"],
    frequency: 34,
    leetcodeUrl: "https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/",
    description:
      "After removing exactly one element, return the length of the longest run of consecutive 1's that remains.",
    examples: [
      { input: "nums = [1,1,0,1]", output: "3", explanation: "Delete the 0 to get three 1's." },
      { input: "nums = [1,1,1]", output: "2", explanation: "One element must be deleted." },
    ],
    intuition:
      "Slide a window that may contain at most one zero (the element we delete). Whenever a second zero enters, shrink from the left past the first zero. The answer is the largest window minus one, since one element is always removed.",
    approach: [
      "Expand a window with a right pointer, counting zeros inside it.",
      "While the window holds more than one zero, advance the left pointer.",
      "Track the maximum window size seen.",
      "Return that maximum minus one.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Each index enters and leaves the window once." },
    solutions: [
      {
        language: "python",
        label: "Sliding Window",
        code: `def longest_subarray(nums: list[int]) -> int:
    left = zeros = best = 0
    for right, x in enumerate(nums):
        if x == 0:
            zeros += 1
        while zeros > 1:
            if nums[left] == 0:
                zeros -= 1
            left += 1
        best = max(best, right - left)
    return best`,
      },
      {
        language: "typescript",
        label: "Sliding Window",
        code: `function longestSubarray(nums: number[]): number {
  let left = 0, zeros = 0, best = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;
    while (zeros > 1) {
      if (nums[left] === 0) zeros--;
      left++;
    }
    best = Math.max(best, right - left);
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "longestSubarray",
      comparison: "deep",
      jsStarter: `function longestSubarray(nums) {
  // Return the longest run of 1's after deleting one element.
  // TODO: implement
}`,
      jsReference: `function longestSubarray(nums) {
  let left = 0, zeros = 0, best = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;
    while (zeros > 1) {
      if (nums[left] === 0) zeros--;
      left++;
    }
    best = Math.max(best, right - left);
  }
  return best;
}`,
    },
    tests: [
      { name: "delete the zero", args: [[1, 1, 0, 1]], expected: 3 },
      { name: "all ones", args: [[1, 1, 1]], expected: 2 },
      { name: "all zeros", args: [[0, 0, 0]], expected: 0 },
      { name: "mixed", args: [[0, 1, 1, 1, 0, 1, 1, 0, 1]], expected: 5 },
    ],
  },
  {
    id: 1208,
    slug: "get-equal-substrings-within-budget",
    title: "Get Equal Substrings Within Budget",
    difficulty: "Medium",
    category: "sliding-window",
    patterns: ["Sliding Window"],
    companies: ["amazon"],
    frequency: 31,
    leetcodeUrl: "https://leetcode.com/problems/get-equal-substrings-within-budget/",
    description:
      "Given a budget for the total per-character ASCII difference between two equal-length strings, return the longest substring you can convert within it.",
    examples: [
      { input: 's = "abcd", t = "bcdf", maxCost = 3', output: "3", explanation: "Convert any three positions." },
      { input: 's = "abcd", t = "cdef", maxCost = 3', output: "1" },
    ],
    intuition:
      "Each position costs the absolute difference of its two characters. Slide a window whose accumulated cost never exceeds the budget; when it does, shrink from the left. The widest valid window is the answer.",
    approach: [
      "Precompute cost at each index as |s[i] - t[i]|.",
      "Grow a window adding costs on the right.",
      "Shrink from the left while the running cost exceeds maxCost.",
      "Track and return the largest window width.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Two-pointer sweep." },
    solutions: [
      {
        language: "python",
        label: "Sliding Window",
        code: `def equal_substring(s: str, t: str, max_cost: int) -> int:
    left = cost = best = 0
    for right in range(len(s)):
        cost += abs(ord(s[right]) - ord(t[right]))
        while cost > max_cost:
            cost -= abs(ord(s[left]) - ord(t[left]))
            left += 1
        best = max(best, right - left + 1)
    return best`,
      },
      {
        language: "typescript",
        label: "Sliding Window",
        code: `function equalSubstring(s: string, t: string, maxCost: number): number {
  let left = 0, cost = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    cost += Math.abs(s.charCodeAt(right) - t.charCodeAt(right));
    while (cost > maxCost) {
      cost -= Math.abs(s.charCodeAt(left) - t.charCodeAt(left));
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "equalSubstring",
      comparison: "deep",
      jsStarter: `function equalSubstring(s, t, maxCost) {
  // Return the longest convertible substring within budget.
  // TODO: implement
}`,
      jsReference: `function equalSubstring(s, t, maxCost) {
  let left = 0, cost = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    cost += Math.abs(s.charCodeAt(right) - t.charCodeAt(right));
    while (cost > maxCost) {
      cost -= Math.abs(s.charCodeAt(left) - t.charCodeAt(left));
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
    },
    tests: [
      { name: "budget 3", args: ["abcd", "bcdf", 3], expected: 3 },
      { name: "tight budget", args: ["abcd", "cdef", 3], expected: 1 },
      { name: "no budget", args: ["abcd", "acde", 0], expected: 1 },
      { name: "identical", args: ["abc", "abc", 5], expected: 3 },
    ],
  },
  {
    id: 2024,
    slug: "maximize-the-confusion-of-an-exam",
    title: "Maximize the Confusion of an Exam",
    difficulty: "Medium",
    category: "sliding-window",
    patterns: ["Sliding Window"],
    companies: ["amazon", "google"],
    frequency: 30,
    leetcodeUrl: "https://leetcode.com/problems/maximize-the-confusion-of-an-exam/",
    description:
      "With at most k allowed flips, return the longest run of identical answers ('T' or 'F') achievable in the answer key.",
    examples: [
      { input: 'answerKey = "TTFF", k = 2', output: "4", explanation: "Flip both F's to T." },
      { input: 'answerKey = "TFFT", k = 1', output: "3" },
    ],
    intuition:
      "Solve two windows: the longest run achievable by flipping up to k 'F's into 'T's, and symmetrically for flipping 'T's into 'F's. Each window allows at most k of the minority character; the larger result wins.",
    approach: [
      "Write a helper that finds the longest window with at most k of a target character.",
      "Slide the window, counting the target character, shrinking when the count exceeds k.",
      "Run the helper once treating 'T' as flippable and once for 'F'.",
      "Return the maximum of the two.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Two linear passes." },
    solutions: [
      {
        language: "python",
        label: "Sliding Window",
        code: `def max_consecutive_answers(answer_key: str, k: int) -> int:
    def longest(target: str) -> int:
        left = count = best = 0
        for right, ch in enumerate(answer_key):
            if ch == target:
                count += 1
            while count > k:
                if answer_key[left] == target:
                    count -= 1
                left += 1
            best = max(best, right - left + 1)
        return best

    return max(longest("T"), longest("F"))`,
      },
      {
        language: "typescript",
        label: "Sliding Window",
        code: `function maxConsecutiveAnswers(answerKey: string, k: number): number {
  const longest = (target: string): number => {
    let left = 0, count = 0, best = 0;
    for (let right = 0; right < answerKey.length; right++) {
      if (answerKey[right] === target) count++;
      while (count > k) {
        if (answerKey[left] === target) count--;
        left++;
      }
      best = Math.max(best, right - left + 1);
    }
    return best;
  };
  return Math.max(longest("T"), longest("F"));
}`,
      },
    ],
    runner: {
      entry: "maxConsecutiveAnswers",
      comparison: "deep",
      jsStarter: `function maxConsecutiveAnswers(answerKey, k) {
  // Return the longest equal run with at most k flips.
  // TODO: implement
}`,
      jsReference: `function maxConsecutiveAnswers(answerKey, k) {
  const longest = (target) => {
    let left = 0, count = 0, best = 0;
    for (let right = 0; right < answerKey.length; right++) {
      if (answerKey[right] === target) count++;
      while (count > k) {
        if (answerKey[left] === target) count--;
        left++;
      }
      best = Math.max(best, right - left + 1);
    }
    return best;
  };
  return Math.max(longest("T"), longest("F"));
}`,
    },
    tests: [
      { name: "flip both", args: ["TTFF", 2], expected: 4 },
      { name: "one flip", args: ["TFFT", 1], expected: 3 },
      { name: "spread", args: ["TTFTTFTT", 1], expected: 5 },
      { name: "no flips", args: ["TF", 0], expected: 1 },
    ],
  },
  {
    id: 1598,
    slug: "crawler-log-folder",
    title: "Crawler Log Folder",
    difficulty: "Easy",
    category: "stack",
    patterns: ["Stack", "Counter"],
    companies: ["amazon"],
    frequency: 29,
    leetcodeUrl: "https://leetcode.com/problems/crawler-log-folder/",
    description:
      "Process folder navigation operations and return how many steps remain to return to the main folder.",
    examples: [
      { input: 'logs = ["d1/","d2/","../","d21/","./"]', output: "2" },
      { input: 'logs = ["d1/","d1/","./","d1/"]', output: "3" },
    ],
    intuition:
      "Depth alone matters, so track a single counter. Entering a child folder increases depth, \"../\" decreases it but never below the root, and \"./\" does nothing. The final depth is the distance back to the start.",
    approach: [
      "Initialize depth to 0.",
      'For "../" decrease depth but not below 0.',
      'For "./" do nothing; for any other entry increase depth.',
      "Return the final depth.",
    ],
    complexity: { time: "O(n)", space: "O(1)", note: "Constant-size counter." },
    solutions: [
      {
        language: "python",
        label: "Depth Counter",
        code: `def min_operations(logs: list[str]) -> int:
    depth = 0
    for op in logs:
        if op == "../":
            depth = max(0, depth - 1)
        elif op != "./":
            depth += 1
    return depth`,
      },
      {
        language: "typescript",
        label: "Depth Counter",
        code: `function minOperations(logs: string[]): number {
  let depth = 0;
  for (const op of logs) {
    if (op === "../") depth = Math.max(0, depth - 1);
    else if (op !== "./") depth++;
  }
  return depth;
}`,
      },
    ],
    runner: {
      entry: "minOperations",
      comparison: "deep",
      jsStarter: `function minOperations(logs) {
  // Return steps needed to return to the main folder.
  // TODO: implement
}`,
      jsReference: `function minOperations(logs) {
  let depth = 0;
  for (const op of logs) {
    if (op === "../") depth = Math.max(0, depth - 1);
    else if (op !== "./") depth++;
  }
  return depth;
}`,
    },
    tests: [
      { name: "ends at depth 2", args: [["d1/", "d2/", "../", "d21/", "./"]], expected: 2 },
      { name: "depth 3", args: [["d1/", "d1/", "./", "d1/"]], expected: 3 },
      { name: "back to root", args: [["d1/", "../", "../", "../"]], expected: 0 },
      { name: "only stay", args: [["./", "./"]], expected: 0 },
    ],
  },
  {
    id: 844,
    slug: "backspace-string-compare",
    title: "Backspace String Compare",
    difficulty: "Easy",
    category: "stack",
    patterns: ["Stack", "Two Pointers"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 42,
    leetcodeUrl: "https://leetcode.com/problems/backspace-string-compare/",
    description:
      "Treating '#' as a backspace key, decide whether two typed strings produce the same final text.",
    examples: [
      { input: 's = "ab#c", t = "ad#c"', output: "true", explanation: 'Both become "ac".' },
      { input: 's = "a#c", t = "b"', output: "false" },
    ],
    intuition:
      "Replay each string with a stack: push real characters and pop on '#'. Whatever remains on each stack is the actual typed text, so the strings match exactly when their stacks are equal.",
    approach: [
      "Define a helper that builds the final text using a stack.",
      "Push each non-'#' character; pop on '#' when the stack is non-empty.",
      "Run the helper on both inputs.",
      "Return whether the two resulting texts are equal.",
    ],
    complexity: { time: "O(n + m)", space: "O(n + m)", note: "Stacks hold the surviving characters." },
    solutions: [
      {
        language: "python",
        label: "Stack",
        code: `def backspace_compare(s: str, t: str) -> bool:
    def build(text: str) -> str:
        stack: list[str] = []
        for c in text:
            if c == "#":
                if stack:
                    stack.pop()
            else:
                stack.append(c)
        return "".join(stack)

    return build(s) == build(t)`,
      },
      {
        language: "typescript",
        label: "Stack",
        code: `function backspaceCompare(s: string, t: string): boolean {
  const build = (text: string): string => {
    const stack: string[] = [];
    for (const c of text) {
      if (c === "#") stack.pop();
      else stack.push(c);
    }
    return stack.join("");
  };
  return build(s) === build(t);
}`,
      },
    ],
    runner: {
      entry: "backspaceCompare",
      comparison: "deep",
      jsStarter: `function backspaceCompare(s, t) {
  // Return true if both strings type to the same text.
  // TODO: implement
}`,
      jsReference: `function backspaceCompare(s, t) {
  const build = (text) => {
    const stack = [];
    for (const c of text) {
      if (c === "#") stack.pop();
      else stack.push(c);
    }
    return stack.join("");
  };
  return build(s) === build(t);
}`,
    },
    tests: [
      { name: "equal", args: ["ab#c", "ad#c"], expected: true },
      { name: "not equal", args: ["a#c", "b"], expected: false },
      { name: "both empty", args: ["ab##", "c#d#"], expected: true },
      { name: "leading backspace", args: ["#a#c", "ac"], expected: false },
    ],
  },
];

export default batchU;
