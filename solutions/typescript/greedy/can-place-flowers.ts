// LeetCode 605 — Can Place Flowers (Easy)
// Category: Greedy · Approach: Greedy scan
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/can-place-flowers/

function canPlaceFlowers(flowerbed: number[], n: number): boolean {
  const bed = [...flowerbed];
  for (let i = 0; i < bed.length; i++) {
    if (n <= 0) break;
    if (bed[i] === 0) {
      const left = i === 0 || bed[i - 1] === 0;
      const right = i === bed.length - 1 || bed[i + 1] === 0;
      if (left && right) {
        bed[i] = 1;
        n -= 1;
      }
    }
  }
  return n <= 0;
}
