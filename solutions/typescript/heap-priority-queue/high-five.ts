// LeetCode 1086 — High Five (Easy)
// Category: Heap / Priority Queue · Approach: Group + top 5
// Time: O(n log n) | Space: O(n)
// Source: https://leetcode.com/problems/high-five/

function highFive(items: number[][]): number[][] {
  const map = new Map<number, number[]>();
  for (const [id, score] of items) {
    if (!map.has(id)) map.set(id, []);
    map.get(id)!.push(score);
  }
  const ids = [...map.keys()].sort((a, b) => a - b);
  return ids.map((id) => {
    const top = map.get(id)!.sort((a, b) => b - a).slice(0, 5);
    const avg = Math.floor(top.reduce((a, b) => a + b, 0) / top.length);
    return [id, avg];
  });
}
