// LeetCode 2389 — Longest Subsequence With Limited Sum (Easy)
// Category: Binary Search · Approach: Prefix + Binary Search
// Time: O(n log n + q log n) | Space: O(n)
// Source: https://leetcode.com/problems/longest-subsequence-with-limited-sum/

function answerQueries(nums: number[], queries: number[]): number[] {
  const sorted = [...nums].sort((a, b) => a - b);
  const prefix: number[] = [];
  let run = 0;
  for (const x of sorted) { run += x; prefix.push(run); }
  return queries.map((q) => {
    let lo = 0, hi = prefix.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (prefix[mid] <= q) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  });
}
