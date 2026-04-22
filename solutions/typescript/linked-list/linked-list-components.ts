// LeetCode 817 — Linked List Components (Medium)
// Category: Linked List · Approach: Run counting
// Time: O(n + m) | Space: O(m)
// Source: https://leetcode.com/problems/linked-list-components/

function numComponents(values: number[], nums: number[]): number {
  const inSet = new Set(nums);
  let count = 0;
  let inRun = false;
  for (const v of values) {
    if (inSet.has(v)) {
      if (!inRun) {
        count += 1;
        inRun = true;
      }
    } else {
      inRun = false;
    }
  }
  return count;
}
