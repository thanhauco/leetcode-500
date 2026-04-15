// LeetCode 947 — Most Stones Removed with Same Row or Column (Medium)
// Category: Advanced Graphs · Approach: Union-Find
// Time: O(n·α(n)) | Space: O(n)
// Source: https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/

function removeStones(stones: number[][]): number {
  const parent: Record<string, string> = {};
  const find = (x: string): string => {
    if (parent[x] === undefined) parent[x] = x;
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
  };
  for (const [r, c] of stones) parent[find("r" + r)] = find("c" + c);
  const roots = new Set<string>();
  for (const [r] of stones) roots.add(find("r" + r));
  return stones.length - roots.size;
}
