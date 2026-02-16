// LeetCode 91 — Decode Ways (Medium)
// Category: 1-D Dynamic Programming · Approach: Rolling DP
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/decode-ways/

function numDecodings(s: string): number {
  if (s.length === 0 || s[0] === "0") return 0;
  let prev2 = 1, prev1 = 1;
  for (let i = 1; i < s.length; i++) {
    let cur = 0;
    if (s[i] !== "0") cur += prev1;
    const two = parseInt(s.slice(i - 1, i + 1), 10);
    if (two >= 10 && two <= 26) cur += prev2;
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}
