// LeetCode 846 — Hand of Straights (Medium)
// Category: Greedy · Approach: Greedy from smallest
// Time: O(n log n) | Space: O(n)
// Source: https://leetcode.com/problems/hand-of-straights/

function isNStraightHand(hand: number[], groupSize: number): boolean {
  if (hand.length % groupSize !== 0) return false;
  const count = new Map<number, number>();
  for (const card of hand) count.set(card, (count.get(card) ?? 0) + 1);
  const keys = [...count.keys()].sort((a, b) => a - b);
  for (const key of keys) {
    const c = count.get(key)!;
    if (c > 0) {
      for (let v = key; v < key + groupSize; v++) {
        const cur = count.get(v) ?? 0;
        if (cur < c) return false;
        count.set(v, cur - c);
      }
    }
  }
  return true;
}
