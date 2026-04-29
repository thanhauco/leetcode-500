// LeetCode 1268 — Search Suggestions System (Medium)
// Category: Tries · Approach: Sort + prefix filter
// Time: O(p log p + p·L) | Space: O(1)
// Source: https://leetcode.com/problems/search-suggestions-system/

function suggestedProducts(products: string[], searchWord: string): string[][] {
  const sorted = [...products].sort();
  const res: string[][] = [];
  let prefix = "";
  for (const ch of searchWord) {
    prefix += ch;
    const matches: string[] = [];
    for (const p of sorted) {
      if (p.startsWith(prefix)) {
        matches.push(p);
        if (matches.length === 3) break;
      }
    }
    res.push(matches);
  }
  return res;
}
