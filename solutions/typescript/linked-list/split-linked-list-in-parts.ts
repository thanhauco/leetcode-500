// LeetCode 725 — Split Linked List in Parts (Medium)
// Category: Linked List · Approach: Compute sizes
// Time: O(n + k) | Space: O(n)
// Source: https://leetcode.com/problems/split-linked-list-in-parts/

function splitListToParts(head: number[], k: number): number[][] {
  const n = head.length;
  const base = Math.floor(n / k);
  const rem = n % k;
  const result: number[][] = [];
  let idx = 0;
  for (let i = 0; i < k; i++) {
    const size = base + (i < rem ? 1 : 0);
    result.push(head.slice(idx, idx + size));
    idx += size;
  }
  return result;
}
