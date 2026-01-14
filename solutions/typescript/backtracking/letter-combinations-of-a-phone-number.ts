// LeetCode 17 — Letter Combinations of a Phone Number (Medium)
// Category: Backtracking · Approach: Backtracking
// Time: O(4^n · n) | Space: O(n)
// Source: https://leetcode.com/problems/letter-combinations-of-a-phone-number/

function letterCombinations(digits: string): string[] {
  if (digits.length === 0) return [];
  const map: Record<string, string> = {
    "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
    "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz",
  };
  const res: string[] = [];
  const dfs = (i: number, cur: string): void => {
    if (i === digits.length) { res.push(cur); return; }
    for (const ch of map[digits[i]]) dfs(i + 1, cur + ch);
  };
  dfs(0, "");
  return res;
}
