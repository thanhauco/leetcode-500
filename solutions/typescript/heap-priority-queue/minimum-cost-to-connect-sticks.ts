// LeetCode 1167 — Minimum Cost to Connect Sticks (Medium)
// Category: Heap / Priority Queue · Approach: Min-heap
// Time: O(n log n) | Space: O(n)
// Source: https://leetcode.com/problems/minimum-cost-to-connect-sticks/

function connectSticks(sticks: number[]): number {
  const heap = sticks.slice();
  let total = 0;
  while (heap.length > 1) {
    heap.sort((a, b) => a - b);
    const a = heap.shift()!;
    const b = heap.shift()!;
    total += a + b;
    heap.push(a + b);
  }
  return total;
}
