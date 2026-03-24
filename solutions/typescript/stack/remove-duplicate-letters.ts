// LeetCode 316 — Remove Duplicate Letters (Medium)
// Category: Stack · Approach: Greedy stack
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/remove-duplicate-letters/

function removeDuplicateLetters(s: string): string {
  const last: Record<string, number> = {};
  for (let i = 0; i < s.length; i++) last[s[i]] = i;
  const stack: string[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (seen.has(c)) continue;
    while (stack.length && stack[stack.length - 1] > c && last[stack[stack.length - 1]] > i) {
      seen.delete(stack.pop()!);
    }
    stack.push(c);
    seen.add(c);
  }
  return stack.join("");
}
