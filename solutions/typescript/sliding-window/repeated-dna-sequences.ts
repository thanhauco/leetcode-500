// LeetCode 187 — Repeated DNA Sequences (Medium)
// Category: Sliding Window · Approach: Hash Set
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/repeated-dna-sequences/

function findRepeatedDnaSequences(s: string): string[] {
  const seen = new Set<string>();
  const res = new Set<string>();
  for (let i = 0; i + 10 <= s.length; i++) {
    const sub = s.substring(i, i + 10);
    if (seen.has(sub)) res.add(sub);
    else seen.add(sub);
  }
  return [...res];
}
