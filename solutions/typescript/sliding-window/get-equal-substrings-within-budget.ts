// LeetCode 1208 — Get Equal Substrings Within Budget (Medium)
// Category: Sliding Window · Approach: Sliding Window
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/get-equal-substrings-within-budget/

function equalSubstring(s: string, t: string, maxCost: number): number {
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
}
