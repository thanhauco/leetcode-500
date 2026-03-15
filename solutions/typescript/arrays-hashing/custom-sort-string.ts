// LeetCode 791 — Custom Sort String (Medium)
// Category: Arrays & Hashing · Approach: Counting
// Time: O(n + m) | Space: O(n)
// Source: https://leetcode.com/problems/custom-sort-string/

function customSortString(order: string, s: string): string {
  const counts = new Map<string, number>();
  for (const ch of s) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  let res = "";
  for (const ch of order) {
    if (counts.has(ch)) {
      res += ch.repeat(counts.get(ch)!);
      counts.delete(ch);
    }
  }
  for (const [ch, cnt] of counts) res += ch.repeat(cnt);
  return res;
}
