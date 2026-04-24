// LeetCode 921 — Minimum Add to Make Parentheses Valid (Medium)
// Category: Stack · Approach: Balance counter
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/

function minAddToMakeValid(s: string): number {
  let open = 0;
  let adds = 0;
  for (const ch of s) {
    if (ch === "(") open += 1;
    else if (open > 0) open -= 1;
    else adds += 1;
  }
  return adds + open;
}
