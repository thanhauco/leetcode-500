// LeetCode 853 — Car Fleet (Medium)
// Category: Stack · Approach: Sort + sweep
// Time: O(n log n) | Space: O(n)
// Source: https://leetcode.com/problems/car-fleet/

function carFleet(target: number, position: number[], speed: number[]): number {
  const idx = position.map((_, i) => i).sort((a, b) => position[b] - position[a]);
  let fleets = 0;
  let cur = 0;
  for (const i of idx) {
    const t = (target - position[i]) / speed[i];
    if (t > cur) {
      fleets++;
      cur = t;
    }
  }
  return fleets;
}
