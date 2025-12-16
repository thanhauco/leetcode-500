// LeetCode 3 — Longest Substring Without Repeating Characters (Medium)
// Category: Sliding Window · Approach: Sliding Window
// Time: O(n) | Space: O(min(n, alphabet))
// Source: https://leetcode.com/problems/longest-substring-without-repeating-characters/

function lengthOfLongestSubstring(s: string): number {
  const seen = new Set<string>();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    best = Math.max(best, right - left + 1);
  }
  return best;
}
