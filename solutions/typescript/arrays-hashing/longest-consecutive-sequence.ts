// LeetCode 128 — Longest Consecutive Sequence (Medium)
// Category: Arrays & Hashing · Approach: Hash Set
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/longest-consecutive-sequence/

function longestConsecutive(nums: number[]): number {
  const set = new Set(nums);
  let best = 0;
  for (const x of set) {
    if (!set.has(x - 1)) {
      let length = 1;
      while (set.has(x + length)) length++;
      best = Math.max(best, length);
    }
  }
  return best;
}
