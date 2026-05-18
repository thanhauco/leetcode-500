// LeetCode 744 — Find Smallest Letter Greater Than Target (Easy)
// Category: Binary Search · Approach: Upper Bound
// Time: O(log n) | Space: O(1)
// Source: https://leetcode.com/problems/find-smallest-letter-greater-than-target/

function nextGreatestLetter(letters: string[], target: string): string {
  let lo = 0, hi = letters.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (letters[mid] > target) hi = mid;
    else lo = mid + 1;
  }
  return lo < letters.length ? letters[lo] : letters[0];
}
