// LeetCode 692 — Top K Frequent Words (Medium)
// Category: Heap / Priority Queue · Approach: Sort by key
// Time: O(u log u) | Space: O(u)
// Source: https://leetcode.com/problems/top-k-frequent-words/

function topKFrequent(words: string[], k: number): string[] {
  const counts = new Map<string, number>();
  for (const w of words) counts.set(w, (counts.get(w) ?? 0) + 1);
  return [...counts.keys()]
    .sort((a, b) => {
      const fa = counts.get(a)!, fb = counts.get(b)!;
      return fa !== fb ? fb - fa : a < b ? -1 : a > b ? 1 : 0;
    })
    .slice(0, k);
}
