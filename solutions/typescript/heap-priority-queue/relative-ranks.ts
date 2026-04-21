// LeetCode 506 — Relative Ranks (Easy)
// Category: Heap / Priority Queue · Approach: Indirect sort
// Time: O(n log n) | Space: O(n)
// Source: https://leetcode.com/problems/relative-ranks/

function findRelativeRanks(score: number[]): string[] {
  const n = score.length;
  const order = [...Array(n).keys()].sort((a, b) => score[b] - score[a]);
  const medals = ["Gold Medal", "Silver Medal", "Bronze Medal"];
  const res: string[] = new Array(n);
  for (let r = 0; r < n; r++) {
    res[order[r]] = r < 3 ? medals[r] : String(r + 1);
  }
  return res;
}
