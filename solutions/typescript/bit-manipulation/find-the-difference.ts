// LeetCode 389 — Find the Difference (Easy)
// Category: Bit Manipulation · Approach: XOR codes
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/find-the-difference/

function findTheDifference(s: string, t: string): string {
  let x = 0;
  for (const c of s) x ^= c.charCodeAt(0);
  for (const c of t) x ^= c.charCodeAt(0);
  return String.fromCharCode(x);
}
