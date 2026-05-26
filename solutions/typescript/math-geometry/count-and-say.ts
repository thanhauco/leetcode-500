// LeetCode 38 — Count and Say (Medium)
// Category: Math & Geometry · Approach: Simulation
// Time: O(n * m) | Space: O(m)
// Source: https://leetcode.com/problems/count-and-say/

function countAndSay(n: number): string {
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
}
