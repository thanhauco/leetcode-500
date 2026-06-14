// LeetCode 229 — Majority Element II (Medium)
// Category: Arrays & Hashing · Approach: Boyer-Moore
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/majority-element-ii/

function majorityElement(nums: number[]): number[] {
  let c1: number | null = null, c2: number | null = null;
  let n1 = 0, n2 = 0;
  for (const x of nums) {
    if (c1 === x) n1++;
    else if (c2 === x) n2++;
    else if (n1 === 0) { c1 = x; n1 = 1; }
    else if (n2 === 0) { c2 = x; n2 = 1; }
    else { n1--; n2--; }
  }
  const res: number[] = [];
  for (const c of [c1, c2]) {
    if (c === null) continue;
    let cnt = 0;
    for (const x of nums) if (x === c) cnt++;
    if (cnt > Math.floor(nums.length / 3)) res.push(c);
  }
  return res;
}
