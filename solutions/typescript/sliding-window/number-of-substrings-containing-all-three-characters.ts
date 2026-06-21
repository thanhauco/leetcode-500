// LeetCode 1358 — Number of Substrings Containing All Three Characters (Medium)
// Category: Sliding Window · Approach: Sliding Window
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/

function numberOfSubstrings(s: string): number {
  const count: Record<string, number> = { a: 0, b: 0, c: 0 };
  let left = 0;
  let res = 0;
  for (let right = 0; right < s.length; right++) {
    count[s[right]]++;
    while (count.a > 0 && count.b > 0 && count.c > 0) {
      count[s[left]]--;
      left++;
    }
    res += left;
  }
  return res;
}
