// LeetCode 134 — Gas Station (Medium)
// Category: Greedy · Approach: Greedy One Pass
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/gas-station/

function canCompleteCircuit(gas: number[], cost: number[]): number {
  let total = 0, tank = 0, start = 0;
  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    total += diff;
    tank += diff;
    if (tank < 0) {
      start = i + 1;
      tank = 0;
    }
  }
  return total >= 0 ? start : -1;
}
