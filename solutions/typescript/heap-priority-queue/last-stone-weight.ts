// LeetCode 1046 — Last Stone Weight (Easy)
// Category: Heap / Priority Queue · Approach: Sort each round (clear)
// Time: O(n log n) | Space: O(n)
// Source: https://leetcode.com/problems/last-stone-weight/

function lastStoneWeight(stones: number[]): number {
  const arr = [...stones];
  while (arr.length > 1) {
    arr.sort((a, b) => a - b);
    const y = arr.pop()!;
    const x = arr.pop()!;
    if (y !== x) arr.push(y - x);
  }
  return arr.length ? arr[0] : 0;
}
